# Placeholder for future transformer model
def prioritize_emails(emails, context):
    # Rule-based logic moved to prioritize.py for MVP
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
    return emails