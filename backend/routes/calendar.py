from flask import Blueprint, jsonify
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from datetime import datetime, timedelta

bp = Blueprint('calendar', __name__)

@bp.route('/calendar/events', methods=['GET'])
def get_calendar_events():
    # Mock credentials for MVP (replace with OAuth tokens in production)
    """
    Retrieves upcoming calendar events for the next 7 days from the user's primary calendar.

    Returns:
        JSON response containing a list of events with their summaries and start times.
        Each event is represented as a dictionary with 'summary' and 'start' keys.
    """

    creds = None  # Implement OAuth token retrieval
    service = build('calendar', 'v3', credentials=creds)
    
    # Fetch events for the next 7 days
    now = datetime.utcnow().isoformat() + 'Z'
    end_time = (datetime.utcnow() + timedelta(days=7)).isoformat() + 'Z'
    events_result = service.events().list(
        calendarId='primary', timeMin=now, timeMax=end_time,
        maxResults=10, singleEvents=True, orderBy='startTime'
    ).execute()
    
    events = events_result.get('items', [])
    return jsonify([{
        'summary': event.get('summary', ''),
        'start': event.get('start', {}).get('dateTime', '')
    } for event in events])