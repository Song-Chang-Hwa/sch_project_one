#!/usr/bin/env python
# coding: utf-8


import subprocess, os
import pymysql 
import shutil

import easyocr
from numpy import random

def getDbConnection() :
    conn = pymysql.connect(host="211.192.49.156", user="belltechsoft", password="qpfxprthvmxm213#@!", db="aiblue_ocr")
    return conn

        
def save_mst_to_db(prj_id, doc_sn, stat_cd):
    
    conn = getDbConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)
    
    try:
        
        tu = (stat_cd, prj_id, doc_sn) 
        curs.execute("""UPDATE TB_OCR_DOC_MST
                           SET STAT_CD   = %s
                              ,UPDT_DTTM = now()
                         WHERE PRJ_ID    = %s
                           AND DOC_SN    = %s""",tu)
            
        conn.commit()

    finally:
        conn.close() 


def select_train_text_from_db():
    
    conn = getDbConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)
    
    with conn:
        s_sql = "SELECT * FROM TB_OCR_TRAIN_TEXT WHERE DEL_YN = 'N' AND TYPE IN ('주소','상장법인')"
        curs.execute(s_sql)
        result = curs.fetchall()

    return result

def save_doc_mst_to_db(doc_mst_list):
    
    conn = getDbConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)
    
    try:

        for index, data in enumerate(doc_mst_list):       
                    
            tu = (data['PRJ_ID'],data['DOC_SN']) 
            curs.execute("""UPDATE TB_OCR_DOC_MST
                               SET STAT_CD   = '30'
                                  ,UPDT_DTTM = now()
                             WHERE STAT_CD   != '30'
                               AND PRJ_ID    = %s
                               AND DOC_SN    = %s""",tu)
        
        conn.commit()

    finally:
        conn.close() 
        
def save_train_score_to_db(training_score_list):
    
    conn = getDbConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)
    
    try:

        for index, data in enumerate(training_score_list):       
                    
            tu = (data['TEXT_TRAINING_NM'], data['TEXT_TRAINING_SCORE'], data['PRJ_ID'],
                  data['DOC_SN'], data['PAGE_SN'], data['TEXT_SN']) 
            curs.execute("""UPDATE TB_OCR_DOC_TEXT
                               SET TEXT_TRAINING_YN    = 'N' 
                                  ,TEXT_TRAINING_NM    = %s
                                  ,TEXT_TRAINING_SCORE = %s
                                  ,TEXT_TRAINING_CNT   = ifnull(TEXT_TRAINING_CNT,0) + 1
                                  ,TEXT_TRAINING_DTTM  = now()
                             WHERE PRJ_ID    = %s
                               AND DOC_SN    = %s
                               AND PAGE_SN   = %s
                               AND TEXT_SN   = %s""",tu)
        
        conn.commit()

    finally:
        conn.close() 

def select_text_training_from_db():
    
    conn = getDbConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)
    
    with conn:
        s_sql = "SELECT * FROM TB_OCR_DOC_TEXT WHERE TEXT_TRAINING_YN = 'Y' AND TEXT_TRAINING_NM IS NULL "
        curs.execute(s_sql)
        result = curs.fetchall()
	
    return result

def select_doc_text_from_db():
    
    conn = getDbConnection()
    curs = conn.cursor(pymysql.cursors.DictCursor)
    
    with conn:
        s_sql = "SELECT * FROM TB_OCR_DOC_TEXT WHERE (TEXT_TRAINING_YN = 'Y' OR TEXT_TRAINING_SCORE > 0)"
        curs.execute(s_sql)
        result = curs.fetchall()
	
    return result


def main():

    default_path       = 'c:\\dev_project\\aiblue_ocr\\training'

    train_image_path   = 'c:\\dev_project\\aiblue_ocr\\uploadfile'
    default_image_path = default_path + '\\learning_image'
    learn_image_path   = None

    make_image_lib     = default_path + '\\TextRecognitionDataGenerator\\trdg\\run.py'
    convert_image_lib  = default_path + '\\TRDG2DTRB\\convert.py'
    make_lmdb_lib      = default_path + '\\deepTextRecognitionBenchmark\\create_lmdb_dataset.py'
    model_train_lib    = default_path + '\\deepTextRecognitionBenchmark\\train.py'
    pretrained_model   = default_path + '\\EasyOCR\\pre_trained_models\\korean_g2.pth'

    model_storage_dir  = default_path + '\\model'
    user_network_dir   = default_path + '\\user_network'
    recog_network      = 'custom'

    batch_max_length   = 50

    learn_image_path   = default_image_path
    
    doc_text_list = select_doc_text_from_db()

    if len(doc_text_list) == 0:
        print('There is no data for learning')
        return
    
    
    try:
        shutil.rmtree(learn_image_path)
    except:
        pass
    
    os.makedirs(learn_image_path, exist_ok=True)
    
    step1_file_path    = os.path.join(learn_image_path, '1')
    step2_file_path    = os.path.join(learn_image_path, '2')
    step3_file_path    = os.path.join(learn_image_path, '3')


    train_text_list = select_train_text_from_db()
    random.shuffle(train_text_list)

    train_text_path = learn_image_path + '\\train_text.txt'
    with open(train_text_path,'w', encoding="utf-8") as f:
        for idx, data in enumerate(train_text_list):
            if data['TEXT']:
                if idx > 0:
                    f.write('\n')
                f.write(data['TEXT'])

    total_count = 3000
    data_count  = {}
    data_count['train'] = total_count - len(doc_text_list)
    data_count['valid'] = int(total_count * 0.1)
    data_count['test']  = int(total_count * 0.1)
    
    print('len(doc_text_list)', len(doc_text_list))
    
    make_image_train = "python {run} -c {count} -l ko -i {text} --output_dir {output}" \
                        .format(run=make_image_lib,count=data_count['train'], text=train_text_path, output=os.path.join(step1_file_path, 'train'))
    make_image_valid = "python {run} -c {count} -l ko -i {text} --output_dir {output}" \
                        .format(run=make_image_lib,count=data_count['valid'], text=train_text_path, output=os.path.join(step1_file_path, 'valid'))
    make_image_test  = "python {run} -c {count} -l ko -i {text} --output_dir {output}" \
                        .format(run=make_image_lib,count=data_count['test'], text=train_text_path, output=os.path.join(step1_file_path, 'test'))

    subprocess.run(make_image_train, shell=True)
    subprocess.run(make_image_valid, shell=True)
    subprocess.run(make_image_test , shell=True)
    
    for idx, doc in enumerate(doc_text_list):
        train_image_path = doc['TEXT_IMAGE_PATH']
        train_image_nm   = doc['TEXT_IMAGE_PATH'].split('\\')[-1].split('.')
        image_ext  = train_image_nm[-1]
        text_updt_nm = ''
        if doc['TEXT_UPDT_NM'] is not None and doc['TEXT_UPDT_NM'] != '':
            text_updt_nm = doc['TEXT_UPDT_NM']
        else:
            text_updt_nm = doc['TEXT_NM']

        try:
            shutil.copyfile(train_image_path, step1_file_path + '\\train\\' + text_updt_nm + '_' + str(idx) + '.' + image_ext)
        except:
            print('copyfile ',  doc['PRJ_ID'], doc['DOC_SN'], doc['PAGE_SN'], doc['TEXT_SN'])

    convert_image_train = "python {convert} --input_path {input}\\train --output_path {output}\\train" \
                      .format(convert=convert_image_lib, input=step1_file_path, output=step2_file_path)
    convert_image_valid = "python {convert} --input_path {input}\\valid --output_path {output}\\valid" \
                      .format(convert=convert_image_lib, input=step1_file_path, output=step2_file_path)
    convert_image_test  = "python {convert} --input_path {input}\\test  --output_path {output}\\test" \
                      .format(convert=convert_image_lib, input=step1_file_path, output=step2_file_path)
                      
    subprocess.run(convert_image_train, shell=True)
    subprocess.run(convert_image_valid, shell=True)
    subprocess.run(convert_image_test , shell=True)
    
    make_lmdb_train = "python {lmdb} --inputPath {input}\\train --gtFile {input}\\train\\gt.txt --outputPath {output}\\train" \
                  .format(lmdb=make_lmdb_lib, input=step2_file_path, output=step3_file_path)
    make_lmdb_valid = "python {lmdb} --inputPath {input}\\valid --gtFile {input}\\valid\\gt.txt --outputPath {output}\\valid" \
                  .format(lmdb=make_lmdb_lib, input=step2_file_path, output=step3_file_path)
    make_lmdb_test  = "python {lmdb} --inputPath {input}\\test  --gtFile {input}\\test\\gt.txt  --outputPath {output}\\test" \
                  .format(lmdb=make_lmdb_lib, input=step2_file_path, output=step3_file_path)

    subprocess.run(make_lmdb_train, shell=True)
    subprocess.run(make_lmdb_valid, shell=True)
    subprocess.run(make_lmdb_test , shell=True)
    
    
    exp_name = 'aiblue_ocr'
    res = subprocess.run("cd", shell=True, stdout=subprocess.PIPE, text=True, encoding='utf8')
    learning_model = os.path.join(res.stdout.replace('\n', ''),'saved_models',exp_name)


    number_of_interation = 3000
    interval_for_valid = 100
    batch_size = 32
    model_train  = 'python {train} \
                     --exp_name   {exp_name} \
                     --train_data {input}\\train \
                     --valid_data {input}\\valid \
                     --select_data / \
                     --batch_ratio 1 \
                     --Transformation None \
                     --FeatureExtraction VGG \
                     --SequenceModeling BiLSTM \
                     --Prediction CTC \
                     --input_channel 1 \
                     --output_channel 256 \
                     --hidden_size 256 \
                     --batch_max_length {batch_max_length} \
                     --saved_model {saved_model} \
                     --FT \
                     --workers 0 \
                     --data_filtering_off \
                     --num_iter {num_iter} \
                     --valInterval {valInterval} \
                     --batch_size {batch_size} '.format(train=model_train_lib, \
                                                      exp_name=exp_name, \
                                                      input=step3_file_path, \
                                                      num_iter=number_of_interation, \
                                                      valInterval=interval_for_valid, \
                                                      batch_size=batch_size, \
                                                      batch_max_length=batch_max_length, \
                                                      saved_model=pretrained_model)   

    res = subprocess.run(model_train, shell=True, stderr=subprocess.PIPE, text=True, encoding='utf8')
    print(res)

    if res.returncode != 0:
        return

    shutil.copyfile(learning_model + '\\best_accuracy.pth', model_storage_dir + '\\' + recog_network +'.pth')
        
    ocr_reader = easyocr.Reader(['en', 'ko'], gpu=True,
                                model_storage_directory=model_storage_dir,
                                user_network_directory=user_network_dir,recog_network=recog_network)
        
    print('reader start')    
    text_training_list = select_text_training_from_db()

    print('select text_training_list', len(text_training_list))
    training_score_list = []
    for idx, doc in enumerate(text_training_list):
        src_image = doc['TEXT_IMAGE_PATH']
        result = ocr_reader.readtext(src_image
                                    , detail='wordbeamsearch' # 'wordbeamsearch' # coord beamsearch greedy wordbeamsearch
                                    , paragraph=False
                                    , min_size=5)

        ftext = ''
        score  = 0.0
        for (bbox, text, prob) in result:
            ftext = ftext + text
            score = score + prob

        if result:    
            score = score / len(result)
            doc['TEXT_TRAINING_NM'] = ftext
            doc['TEXT_TRAINING_SCORE'] = score
            training_score_list.append(doc)

    print('reader end')  
    for text in training_score_list:
        print(text['TEXT_NM']+','+str(text['TEXT_UPDT_NM'])+','+text['TEXT_TRAINING_NM'])
        break

    doc_mst_list = list({(v['PRJ_ID'], v['DOC_SN']):v for v in text_training_list}.values())
    for doc in doc_mst_list:
        print(doc['PRJ_ID'], doc['DOC_SN'], doc['PAGE_SN'], doc['TEXT_SN'])

    save_train_score_to_db(training_score_list)  
    save_doc_mst_to_db(doc_mst_list)  
    
if __name__ == "__main__":
    main()

