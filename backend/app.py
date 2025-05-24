from flask import Flask
from flask_cors import CORS
from routes.auth import bp as auth_bp
from routes.calendar import bp as calendar_bp
from routes.slack import bp as slack_bp
from routes.prioritize import bp as prioritize_bp
from routes.actions import bp as actions_bp
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

# Allow OAuth2 for HTTP (only for local development)
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

app = Flask(__name__)

# Configure CORS with credentials
CORS(app, 
     supports_credentials=True,
     origins=['http://localhost:3000'],
     allow_headers=['Content-Type'],
     methods=['GET', 'POST', 'OPTIONS'])

# Configure session
app.config.update(
    SECRET_KEY=os.getenv('GOOGLE_CLIENT_SECRET', 'dev-secret-key'),
    SESSION_COOKIE_SECURE=False,  # Set to True in production
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE='Lax',
    PERMANENT_SESSION_LIFETIME=3600,  # 1 hour
    SESSION_REFRESH_EACH_REQUEST=True
)

# Register blueprints for routes
app.register_blueprint(auth_bp)
app.register_blueprint(calendar_bp)
app.register_blueprint(slack_bp)
app.register_blueprint(prioritize_bp)
app.register_blueprint(actions_bp)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5004)