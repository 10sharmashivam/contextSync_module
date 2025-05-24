from flask import Blueprint, jsonify, session
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from datetime import datetime, timedelta
import json
import os

bp = Blueprint('calendar', __name__)

def get_mock_events():
    """Returns mock calendar events for demo purposes."""
    mock_file = os.path.join(os.path.dirname(__file__), '../models/data/calendar_events.json')
    try:
        with open(mock_file, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

@bp.route('/calendar/events', methods=['GET'])
def get_calendar_events():
    """
    Retrieves upcoming calendar events for the next 7 days.
    Uses OAuth credentials if available, falls back to mock data if not.
    """
    if 'credentials' not in session:
        # Return mock data if not authenticated
        return jsonify(get_mock_events())

    try:
        # Create credentials from session
        creds = Credentials(
            token=session['credentials']['token'],
            refresh_token=session['credentials']['refresh_token'],
            token_uri=session['credentials']['token_uri'],
            client_id=session['credentials']['client_id'],
            client_secret=session['credentials']['client_secret'],
            scopes=session['credentials']['scopes']
        )

        # Build the service
        service = build('calendar', 'v3', credentials=creds)
        
        # Fetch events for the next 7 days
        now = datetime.utcnow().isoformat() + 'Z'
        end_time = (datetime.utcnow() + timedelta(days=7)).isoformat() + 'Z'
        
        events_result = service.events().list(
            calendarId='primary',
            timeMin=now,
            timeMax=end_time,
            maxResults=10,
            singleEvents=True,
            orderBy='startTime'
        ).execute()
        
        events = events_result.get('items', [])
        return jsonify([{
            'summary': event.get('summary', ''),
            'start': event.get('start', {}).get('dateTime', ''),
            'end': event.get('end', {}).get('dateTime', ''),
            'location': event.get('location', ''),
            'description': event.get('description', ''),
            'attendees': [attendee.get('email') for attendee in event.get('attendees', [])]
        } for event in events])

    except Exception as e:
        # If there's an error with the API, fall back to mock data
        print(f"Error fetching calendar events: {str(e)}")
        return jsonify(get_mock_events())