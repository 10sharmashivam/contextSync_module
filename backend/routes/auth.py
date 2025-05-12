from flask import Blueprint, redirect, request, url_for
from google_auth_oauthlib.flow import Flow
from config import Config

bp = Blueprint('auth', __name__)

# Google OAuth flow configuration
@bp.route('/auth/google')
def google_auth():
    """
    Redirects to the Google OAuth authorization URL to allow the user to authenticate
    and grant access to their Google Calendar events.

    After the user grants access, the callback will be made to
    `/auth/google/callback` (defined in `google_auth_callback`).
    """
    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": Config.GOOGLE_CLIENT_ID,
                "client_secret": Config.GOOGLE_CLIENT_SECRET,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "redirect_uris": ["http://localhost:5000/auth/google/callback"]
            }
        },
        scopes=['https://www.googleapis.com/auth/calendar.readonly']
    )
    authorization_url, _ = flow.authorization_url()
    return redirect(authorization_url)

@bp.route('/auth/google/callback')
def google_auth_callback():
    # In MVP, just return success (implement token storage later)
    return {"message": "Google auth successful"}, 200