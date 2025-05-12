from flask import Blueprint, request, jsonify
import json
import os
from datetime import datetime

bp = Blueprint('prioritize', __name__)

@bp.route('/prioritize', methods=['POST'])
def prioritize_emails():
    """
    Prioritizes a list of emails based on context information.

    Args:
        emails (list[dict]): List of emails to prioritize, each containing
            'subject', 'sender', 'content', and 'priority' fields.
        context (dict): Context information, containing 'calendar' and 'slack'
            fields (see prioritize.py for exact structure).

    Returns:
        list[dict]: Same list of emails with updated 'priority' values.
    """
    data = request.json
    emails = data.get('emails', [])
    context = data.get('context', {'calendar': [], 'slack': []})
    
    # Load sample data for MVP
    with open(os.path.join('models/data/emails.json'), 'r') as f:
        emails = json.load(f)
    
    # Simple rule-based prioritization
    for email in emails:
        priority = 0.5  # Default
        # Boost priority if email sender matches calendar event attendee
        for event in context['calendar']:
            if email['sender'].lower() in event.get('summary', '').lower():
                priority += 0.3
        # Boost if email content matches Slack message
        for msg in context['slack']:
            if any(word in email['content'].lower() for word in msg['text'].lower().split()):
                priority += 0.2
        email['priority'] = min(1.0, max(0.0, priority))
    
    return jsonify(emails)