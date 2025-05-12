from flask import Flask
from flask_cors import CORS
from routes.auth import bp as auth_bp
from routes.calendar import bp as calendar_bp
from routes.slack import bp as slack_bp
from routes.prioritize import bp as prioritize_bp
from routes.actions import bp as actions_bp

app = Flask(__name__)
CORS(app)  # Allow React frontend to access API

# Register blueprints for routes
app.register_blueprint(auth_bp)
app.register_blueprint(calendar_bp)
app.register_blueprint(slack_bp)
app.register_blueprint(prioritize_bp)
app.register_blueprint(actions_bp)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)