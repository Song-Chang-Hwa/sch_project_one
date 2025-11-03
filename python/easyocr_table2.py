#!/usr/bin/env python
# coding: utf-8

# In[0]:

#pip install easyocr
#conda install -c anaconda 
#conda install -c conda-forge matplotlib
'''
gpu True
1 https://developer.nvidia.com/cuda-downloads 설치
2 conda install pytorch torchvision torchaudio cudatoolkit -c pytorch

Initializing libiomp5md.dll, but found libiomp5md.dll already initialized 발생시 아래 코드 실행
import os
os.environ['KMP_DUPLICATE_LIB_OK']='True'
'''

# In[1]:


import easyocr
import cv2
import random
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from PIL import ImageFont, ImageDraw, Image

# In[2]:


font_dir = 'C:/Windows/Fonts'
#reader = easyocr.Reader(['ko','en'], recog_network='english_g2')
#reader = easyocr.Reader(['ko','en'], gpu=True,
#                        model_storage_directory='..\\easyocr\\model',
#                        user_network_directory='..\\easyocr\\user_network',
#                        recog_network='custom')
reader = easyocr.Reader(['ko','en'], gpu=True)


# In[3]:


result = reader.readtext(r'test3.jpg'
                         , detail='wordbeamsearch' # 'wordbeamsearch' # coord beamsearch greedy wordbeamsearch
                         , paragraph=False
                         , min_size=5)


# In[4]:


img = cv2.imread(r'test0.jpg')
img = Image.fromarray(img)
font = ImageFont.truetype(font_dir + '/malgun.ttf', 15)
draw = ImageDraw.Draw(img)


# In[5]:


COLORS = np.random.randint(0, 255, size=(255, 3), dtype='uint8')

df = pd.DataFrame(columns = ['x','y','w','h','text','score'])
for i, rst in enumerate(result):
    x = rst[0][0][0]
    y = rst[0][0][1]
    w = rst[0][1][0] - rst[0][0][0]
    h = rst[0][2][1] - rst[0][1][1]
    text  = rst[1]
    score = rst[2]

    rst_list = [x, y, w, h, text, score]
    df = df.append(pd.Series(rst_list, index=df.columns), ignore_index=True)

    color_idx = random.randint(0, 254)
    color = [int(c) for c in COLORS[color_idx]]

    #draw.rectangle(((x, y), (x+w, y+h)), outline=tuple(color), width=2)
    
    
    #draw.rectangle(((x, y), (x+w, y+h)), outline=tuple(color))
    
    draw.text((int((x + x) / 2) , y - 2),str(rst[1]), font=font, fill=tuple(color), )


# In[6]:


plt.figure(figsize=(100, 100))
plt.imshow(img)
plt.show()


# In[8]:


from IPython.core.interactiveshell import InteractiveShell
InteractiveShell.ast_node_interactivity = "all"

pd.set_option("display.max_rows", None, "display.max_columns", None)

print(df)


# In[7]:


df['x'] = df['x'].astype(int)
df['y'] = round(df['y'].astype(int), -1)
df['round_x'] = df['x'].round(decimals=-1)
df['round_y'] = df['y'].round(decimals=-1)

df.sort_values(['round_y', 'round_x'])

df['rank_y'] = df['round_y'].rank(method='max')
df['rank_x'] = df['round_x'].rank(method='max')

pd.pivot_table(df, index=['rank_x','rank_y']).head()

reconstruct = df.pivot(index='rank_y', columns='rank_x', values='text')
reconstruct


# In[ ]:




