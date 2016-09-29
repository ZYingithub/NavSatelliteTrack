# -*- coding: utf-8 -*-
# Import the library
from czml import czml

# Initialize a document
doc = czml.CZML()

# Create and append the document packet
packet1 = czml.CZMLPacket(id='document',version='1.0')
doc.packets.append(packet1)

# Create and append a billboard packet
packet2 = czml.CZMLPacket(id='billboard')
bb = czml.Billboard(scale=0.7, show=True)
bb.image = 'http://localhost:8080/Apps/CZML_python/startpoint.png'
bb.color = {'rgba': [255, 0, 0, 55]}
packet2.billboard = bb
# 最方便的是，对json格式的最大支持，CZML的任何属性都可以只是一个json字符串
packet2.position = {'cartesian': [1216469.9357990976, -4736121.71856379, 4081386.8856866374]}
# 添加Label
# 小灯泡能将粘贴的字符串 变成字典型，识别其格式
lb = czml.Label()
lb.color = {'rgba': [255, 255, 0, 255]}
lb.scale = 1.0
lb.font = "bold 10pt Segoe UI Semibold"
lb.outlineColor = {"rgba": [0, 0, 0, 255]}
lb.show = "true"
lb.style = "FILL"
lb.text = "标签"
lb.verticalOrigin = "CENTER"
lb.horizontalOrigin = "LEFT"
packet2.label = lb




"""
packet2.label= dict(fillColor={"rgba": [255, 255, 0, 255]}, font="bold 10pt Segoe UI Semibold", horizontalOrigin="LEFT",
                    outlineColor={
                        "rgba": [
                            0, 0, 0, 255
                        ]
                    }, pixelOffset={
        "cartesian2": [
            10.0, 0.0
        ]
    }, scale=1.0, show='true', style="FILL", text="Vehicle", verticalOrigin="CENTER")
"""



doc.packets.append(packet2)

# Write the CZML document to a file
filename = "best_example.czml"
doc.write(filename)