#!/usr/bin/env python
# coding: utf-8

# In[0]:


#!pip install easyocr
#!conda install -c conda-forge pdf2image
'''
gpu True
1 https://developer.nvidia.com/cuda-downloads
2 conda install pytorch torchvision torchaudio cudatoolkit -c pytorch
'''

# In[1]:
import os
os.environ['KMP_DUPLICATE_LIB_OK']='True'

import easyocr
import pymysql
import traceback
import cv2
import random
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from PIL import ImageFont, ImageDraw, Image
from sys import argv
from pdf2image import convert_from_path

# In[2]:
class AiblueOcr:
    isLocal = False
    detailFilePath = r"C:\dev_project\aiblue_ocr\detailimagefile"
    textImagePath = r"C:\dev_project\aiblue_ocr\textimagefile"
    fontPath = r"C:/Windows/Fonts/malgun.ttf"
    modelStorageDir = r"C:\dev_project\aiblue_ocr\training\model"
    userNetworkDir = r"C:\dev_project\aiblue_ocr\training\user_network"
    def __init__(self):
        pass

    def getDbConnection(self):
        return pymysql.connect(host="211.192.49.156", user="belltechsoft", password="qpfxprthvmxm213#@!", db="aiblue_ocr")

    def escapeString(self, text):
        return text.replace("'","\\'")
    
    def selectListQuery(self, query):
        resultList = []
        if not self.isLocal:
            conn = self.getDbConnection()
            try:
                curs = conn.cursor(pymysql.cursors.DictCursor)
                curs.execute(query)
                resultList = curs.fetchall()
            finally:
                conn.close()
        return resultList

    #Ocr Recognition
    def recognition(self, parameterList):
        userId = parameterList["USER_ID"]
        
        reader = easyocr.Reader(['ko','en'], gpu=True,
                                model_storage_directory=self.modelStorageDir,
                                user_network_directory=self.userNetworkDir,
                                recog_network='custom')
        
        #reader = easyocr.Reader(['ko','en'], gpu=True)

        selectListString = """SELECT T1.PRJ_ID, CONVERT(T1.DOC_SN, CHAR) DOC_SN, T2.FILE_PATH, T2.FILE_NM
                FROM TB_OCR_DOC_MST T1, TB_OCR_FILE T2
                WHERE 1 =1 AND T1.FILE_ID = T2.FILE_ID AND T1.PRJ_ID = T2.PRJ_ID """
        if "IS_LOCAL" in parameterList:
            self.isLocal = parameterList["IS_LOCAL"]
        if "DOC_SN" in parameterList:
            selectListString +=  "AND T1.DOC_SN = '" + parameterList["DOC_SN"] + "' "
        if "PRJ_ID" in parameterList:
            selectListString +=  "AND T1.PRJ_ID = '" + parameterList["PRJ_ID"] + "' "
        
        targetFileList = []
        if self.isLocal:
            targetFileList.append(self.localTesttargetFile)
        else:
            targetFileList = self.selectListQuery(selectListString)

        for targetFile in targetFileList:
            prjId = targetFile["PRJ_ID"]
            docSn = targetFile["DOC_SN"]
            pageCnt = 1
            try:
                filePath = targetFile["FILE_PATH"]
                fileName = targetFile["FILE_NM"]
                rootName, ext = os.path.splitext(fileName)
                
                if ext.lower() == '.pdf':
                    pages = convert_from_path(filePath + "\\" + fileName, 500)

                    for i, page in enumerate(pages):
                        page.save(filePath + "\\" + rootName + "_" + str(i+1) + ".png", "PNG")
                        pageCnt = i+1
                
                conn = self.getDbConnection()
                try:
                    curs = conn.cursor()
                    sql = "UPDATE TB_OCR_DOC_MST SET STAT_CD = '10', PAGE_CNT = '" + str(pageCnt) + "' WHERE PRJ_ID = '" + prjId + "' AND DOC_SN = " + docSn
                    curs.execute(sql)
                    conn.commit()
                finally:
                    conn.close()
                
                for pNum in range(1, pageCnt+1):
                    targetFileName = fileName
                    if ext.lower() == '.pdf':
                        targetFileName = rootName + "_" + str(pNum) + ".png"
                    ocrResult = reader.readtext(filePath + "\\" + targetFileName
                             , detail='wordbeamsearch' # 'wordbeamsearch' # coord beamsearch greedy wordbeamsearch
                             , paragraph=False
                             , min_size=5)
                    
                    uploadImage = cv2.imread(filePath + "\\" + targetFileName)
                    detailImage = Image.fromarray(uploadImage)
                    textImage = Image.fromarray(uploadImage)
                    font = ImageFont.truetype(self.fontPath, 15)
                    draw = ImageDraw.Draw(detailImage)
                    
                    COLORS = np.random.randint(0, 255, size=(255, 3), dtype='uint8')
    
                    df = pd.DataFrame(columns = ['x','y','w','h','text','score'])
                    
                    docNm = "제목없음"
                    docType = "00"
                    tempArea = 0
                    for i, rst in enumerate(ocrResult):
                        x = rst[0][0][0]
                        y = rst[0][0][1]
                        w = rst[0][1][0] - rst[0][0][0]
                        h = rst[0][2][1] - rst[0][1][1]
                        text  = rst[1]
                        score = rst[2]
                        if w*h > tempArea:
                            docNm = self.escapeString(text)
                            tempArea = w*h
                    
                        rst_list = [x, y, w, h, text, score]
                        df = df.append(pd.Series(rst_list, index=df.columns), ignore_index=True)
                        
                        tempTextImage = textImage.crop((x, y, w+x, h+y))
                        tempTextImage.save(self.textImagePath + "\\" + rootName + "_" + str(pNum) + "_"+str(i+1)+".png")
                    
                        color_idx = random.randint(0, 254)
                        color = [int(c) for c in COLORS[color_idx]]
                    
                        draw.rectangle(((x, y), (x+w, y+h)), outline=tuple(color), width=2)
                        
                        draw.rectangle(((x, y), (x+w, y+h)), outline=tuple(color))
                        
                        draw.text((int((x + x) / 2) , y - 2),str(rst[1]), font=font, fill=tuple(color), )
                    
                    
                    '''
                    plt.figure(figsize=(100, 100))
                    plt.imshow(detailImage)
                    plt.show()
                    '''
                    detailImage.save(self.detailFilePath + "\\" + rootName + "_" + str(pNum) + ".png")
                    
                    #delete data
                    conn = self.getDbConnection()
                    
                    try:
                        curs = conn.cursor()
                        curs.execute("DELETE FROM TB_OCR_DOC_DETAIL WHERE PRJ_ID = %s AND DOC_SN = %s AND PAGE_SN = %s", (prjId, docSn, pNum))
                        curs.execute("DELETE FROM TB_OCR_DOC_TEXT WHERE PRJ_ID = %s AND DOC_SN = %s AND PAGE_SN = %s", (prjId, docSn, pNum))
                        conn.commit()
                    finally:
                        conn.close()
                    
                    pd.set_option("display.max_rows", None, "display.max_columns", None)
                    
                    param = (prjId, docSn, pNum, docNm, docType, rootName + "_" + str(pNum) + ".png", self.detailFilePath.replace("\\", "\\\\"), userId, userId)
                    query = "INSERT INTO TB_OCR_DOC_DETAIL (PRJ_ID, DOC_SN, PAGE_SN, DOC_NM, DOC_TYPE, FILE_NM, FILE_PATH, REGI_ID, REGI_DTTM, UPDT_ID, UPDT_DTTM) VALUES \
                            (%s, %s, %s, '%s', '%s', '%s', '%s', '%s', NOW(), '%s', NOW())" % param
                            
                    conn = self.getDbConnection()
                    try:
                        curs = conn.cursor()
                        curs.execute(query)
                        conn.commit()
                    finally:
                        conn.close()
                        
                    #print(df)
                    
                    for i, row in df.iterrows():
                        param = (prjId, docSn, pNum, i+1, row["x"], row["y"], row["w"], row["h"], (self.textImagePath + "\\" + rootName + "_" + str(pNum) + "_"+str(i+1)+".png").replace("\\", "\\\\"), self.escapeString(row["text"]), row["score"], userId, userId)
                        query = "INSERT INTO TB_OCR_DOC_TEXT (PRJ_ID, DOC_SN, PAGE_SN, TEXT_SN, TEXT_X, TEXT_Y, TEXT_W, TEXT_H, TEXT_IMAGE_PATH, TEXT_NM, SCORE, REGI_ID, REGI_DTTM, UPDT_ID, UPDT_DTTM) VALUES \
                                (%s, %s, %s, %s, %s, %s, %s, %s, '%s', '%s', %s, '%s', NOW(), '%s', NOW())" % param
                                
                        conn = self.getDbConnection()
                        try:
                            curs = conn.cursor()
                            curs.execute(query)
                            conn.commit()
                        finally:
                            conn.close()
                    
                    '''
                    df['x'] = df['x'].astype(int)
                    df['y'] = round(df['y'].astype(int), -1)
                    df['round_x'] = df['x'].round(decimals=-1)
                    df['round_y'] = df['y'].round(decimals=-1)
                    
                    df.sort_values(['round_y', 'round_x'])
                    
                    df['rank_y'] = df['round_y'].rank(method='max')
                    df['rank_x'] = df['round_x'].rank(method='max')
                    
                    pd.pivot_table(df, index=['rank_x','rank_y']).head()
                    
                    reconstruct = df.pivot(index='rank_y', columns='rank_x', values='text')
                    '''
                    
                    
                    conn = self.getDbConnection()
                try:
                    curs = conn.cursor()
                    sql = "UPDATE TB_OCR_DOC_MST SET STAT_CD = '20' WHERE PRJ_ID = '" + prjId + "' AND DOC_SN = " + docSn
                    curs.execute(sql)
                    conn.commit()
                finally:
                    conn.close()
            except Exception:
                print("error")
                print(traceback.format_exc())
                if len(traceback.format_exc().strip()) > 0:
                    conn = self.getDbConnection()
                    try:
                        curs = conn.cursor()
                        param = (traceback.format_exc(), prjId, docSn)
                        curs.execute("UPDATE TB_OCR_DOC_MST SET STAT_CD = '40', ERROR_MSG = %s WHERE PRJ_ID = %s AND DOC_SN = %s", param)
                        conn.commit()
                    finally:
                        conn.close()

# In[8]:
if __name__ == '__main__':
    AiblueOcr = AiblueOcr()
    parameterList = {}
    for user_input in argv[1:]:
        if "=" not in user_input:
            continue
        varname = user_input.split("=")[0]
        varvalue = user_input.split("=")[1]
        parameterList[varname] = varvalue
    if "METHODS" in parameterList:
        if "recognition" in parameterList["METHODS"]:
            AiblueOcr.recognition(parameterList)
    else: 
        AiblueOcr.recognition(parameterList)