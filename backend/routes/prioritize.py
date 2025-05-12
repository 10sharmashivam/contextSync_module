from flask import Blueprint, request, jsonify
from models.prioritizer import prioritize_emails

bp = Blueprint('prioritize', __name__)

@bp.route('/prioritize', methods=['POST'])
def prioritize():
    data = request.json  # {emails: [{subject, sender, content}], context: {calendar, slack}}
    prioritized_emails = prioritize_emails(data['emails'], data['context'])
    return jsonify(prioritized_emails)