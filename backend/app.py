from flask import Flask
from flask_cors import CORS
from routes import auth, calendar, slack, prioritize, actions

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth.bp)
app.register_blueprint(calendar.bp)
app.register_blueprint(slack.bp)
app.register_blueprint(prioritize.bp)
app.register_blueprint(actions.bp)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)