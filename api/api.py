
import numpy as np
import io
from PIL import Image
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
import matplotlib.pyplot as plt
from flask import Flask,render_template,redirect,url_for,request
import urllib3
from tensorflow.keras.preprocessing import image
import os


app = Flask(__name__)

model = load_model('shape2.h5')

# Image preprocessing/prediction function
def predict_(img_path, show=False):

    img = image.load_img(img_path, target_size=(224, 224))
    img_tensor = image.img_to_array(img)                    # (height, width, channels)
    img_tensor = np.expand_dims(img_tensor, axis=0)         # (1, height, width, channels), add a dimension because the model expects this shape: (batch_size, height, width, channels)
    img_tensor /= 255.                                      # imshow expects values in the range [0, 1]

    prediction = model.predict(img_tensor)

    if show:
        plt.imshow(img_tensor[0])                           
        plt.axis('off')
        plt.show()

    
    return prediction



# Home
@app.route('/', methods=['GET'])
def api():
    return {
        'userid':1,
        'title':'Flask react app',
        'completed': False
    }

@app.route('/predict',methods = ['GET' , 'POST'])
def predictions():
    error = ''
    # Change image dir to fit needs
    target_img = os.path.join(os.getcwd() , 'static/images')
    if request.method == 'POST':
        if (request.files):
            file = request.files['file']
            if file:
                file.save(os.path.join(target_img , file.filename))
                img_path = os.path.join(target_img , file.filename)
                img = file.filename

                predictions = predict_(img_path)
                
                # Change to a switch-case later 
                if round(predictions[0][0]) == 0:
                    pred = 'Circle'
                if round(predictions[0][0]) == 1:
                    pred = 'Rectangle'
                if round(predictions[0][0]) == 2:
                    pred = 'Star'
                if round(predictions[0][0]) == 3:
                    pred = 'Triangle'
                else:
                    pred = 'No existe XD'
                
                predictions = {
                       'Prediction': pred
                }

            else:
                error = "Please draw a shape to predict."

            if(len(error) == 0):
                # No error
                pass
            else:
                # Error
                pass
    
    else:
        # Method no fue POST XD
        pass

if __name__ == '__main__':
    app.run(debug=True)