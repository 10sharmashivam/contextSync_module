from flask import Blueprint, request, jsonify

bp = Blueprint('actions', __name__)

@bp.route('/actions', methods=['POST'])
def suggest_actions():
    """
    Suggest actions for a given email based on its priority and content.

    Suggested actions are:
        - Draft Reply: if email priority is above 0.7
        - Create Calendar Event: if email priority is above 0.7
        - Post to Slack: if the word "meeting" is in the email content (case-insensitive)

    Request body should contain the email data in the following format:
    {
        "email": {
            "id": <int>,
            "subject": <str>,
            "sender": <str>,
            "content": <str>,
            "priority": <float>
        }
    }

    Returns a JSON response with the following format:
    {
        "email_id": <int>,
        "actions": [
            {"type": <str>, "label": <str>},
            ...
        ]
    }
    """
    data = request.json
    email = data.get('email', {})
    
    actions = []
    if email.get('priority', 0) > 0.7:
        actions.append({'type': 'reply', 'label': 'Draft Reply'})
        actions.append({'type': 'calendar', 'label': 'Create Calendar Event'})
    if 'meeting' in email.get('content', '').lower():
        actions.append({'type': 'slack', 'label': 'Post to Slack'})
    
    return jsonify({'email_id': email.get('id'), 'actions': actions})