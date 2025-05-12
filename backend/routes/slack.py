from flask import Blueprint, jsonify
from slack_sdk import WebClient
from config import Config

bp = Blueprint('slack', __name__)

@bp.route('/slack/messages', methods=['GET'])
def get_slack_messages():
    """
    Retrieves recent messages from a Slack channel.

    Returns:
        JSON response containing a list of messages with their 'text' and 'user' fields.
    """
    client = WebClient(token=Config.SLACK_TOKEN)
    # Fetch messages from a channel (e.g., general)
    result = client.conversations_history(channel='C1234567890', limit=10)  # Replace with your channel ID
    messages = [{
        'text': msg.get('text', ''),
        'user': msg.get('user', '')
    } for msg in result['messages']]
    return jsonify(messages)