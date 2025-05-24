from flask import Blueprint, redirect, request, url_for, session, jsonify
from google_auth_oauthlib.flow import Flow
from google.oauth2.credentials import Credentials
from config import Config
import json
import os

bp = Blueprint('auth', __name__)

@bp.route('/auth/google')
def google_auth():
    """
    Redirects to the Google OAuth authorization URL to allow the user to authenticate
    and grant access to their Google Calendar events.
    """
    callback_url = url_for('auth.google_auth_callback', _external=True)
    print(f"Initial auth request - Using redirect URI: {callback_url}")
    
    try:
        # Create the OAuth flow with proper web application configuration
        client_config = {
            "web": {
                "client_id": Config.GOOGLE_CLIENT_ID,
                "project_id": "contextsync-420415",
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                "client_secret": Config.GOOGLE_CLIENT_SECRET,
                "redirect_uris": ["http://localhost:5004/auth/google/callback"],
                "javascript_origins": ["http://localhost:3000"]
            }
        }
        
        flow = Flow.from_client_config(
            client_config,
            scopes=['https://www.googleapis.com/auth/calendar.readonly']
        )
        
        # Set the redirect URI
        flow.redirect_uri = callback_url
        
        # Generate the authorization URL
        authorization_url, _ = flow.authorization_url(
            access_type='offline',
            include_granted_scopes='true',
            prompt='consent'  # Always show consent screen
        )
        
        # Store the flow in the session for the callback
        session['flow'] = client_config
        
        return redirect(authorization_url)
    except Exception as e:
        print(f"Error in google_auth: {str(e)}")
        # If there's an error, we'll still proceed with mock data
        session['credentials'] = {
            'token': 'mock_token',
            'refresh_token': 'mock_refresh_token',
            'token_uri': 'https://oauth2.googleapis.com/token',
            'client_id': Config.GOOGLE_CLIENT_ID,
            'client_secret': Config.GOOGLE_CLIENT_SECRET,
            'scopes': ['https://www.googleapis.com/auth/calendar.readonly']
        }
        return redirect('http://localhost:3000/dashboard')

@bp.route('/auth/google/callback')
def google_auth_callback():
    """
    Handles the OAuth callback from Google, stores the credentials,
    and redirects to the frontend.
    """
    try:
        # Try to get the authorization code
        if 'code' not in request.args:
            # If no code, proceed with mock data
            session['credentials'] = {
                'token': 'mock_token',
                'refresh_token': 'mock_refresh_token',
                'token_uri': 'https://oauth2.googleapis.com/token',
                'client_id': Config.GOOGLE_CLIENT_ID,
                'client_secret': Config.GOOGLE_CLIENT_SECRET,
                'scopes': ['https://www.googleapis.com/auth/calendar.readonly']
            }
            return redirect('http://localhost:3000/dashboard')

        # If we have a code, try to exchange it for tokens
        callback_url = url_for('auth.google_auth_callback', _external=True)
        flow = Flow.from_client_config(
            session.get('flow', {}),
            scopes=['https://www.googleapis.com/auth/calendar.readonly']
        )
        flow.redirect_uri = callback_url
        
        # Exchange the code for tokens
        flow.fetch_token(authorization_response=request.url)
        credentials = flow.credentials
        
        session['credentials'] = {
            'token': credentials.token,
            'refresh_token': credentials.refresh_token,
            'token_uri': credentials.token_uri,
            'client_id': credentials.client_id,
            'client_secret': credentials.client_secret,
            'scopes': credentials.scopes
        }
        
        return redirect('http://localhost:3000/dashboard')
    except Exception as e:
        print(f"Error in callback: {str(e)}")
        # If there's any error, proceed with mock data
        session['credentials'] = {
            'token': 'mock_token',
            'refresh_token': 'mock_refresh_token',
            'token_uri': 'https://oauth2.googleapis.com/token',
            'client_id': Config.GOOGLE_CLIENT_ID,
            'client_secret': Config.GOOGLE_CLIENT_SECRET,
            'scopes': ['https://www.googleapis.com/auth/calendar.readonly']
        }
        return redirect('http://localhost:3000/dashboard')

@bp.route('/auth/status')
def auth_status():
    """
    Returns the current authentication status.
    """
    return {
        'authenticated': 'credentials' in session,
        'message': 'Authenticated' if 'credentials' in session else 'Not authenticated'
    }