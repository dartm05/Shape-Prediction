from flask import Flask
app = Flask(__name__)

@app.route('/', methods=['GET'])
def api():
    return {
        'userid':1,
        'title':'Flask react app',
        'completed': False
    }

if __name__ == '__main__':
    app.run(debug=True)