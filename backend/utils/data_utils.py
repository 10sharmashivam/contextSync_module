def preprocess_email(email):
    """
    Preprocesses an email by extracting the required fields into a dictionary.

    Args:
        email (dict): The email to preprocess, containing 'id', 'subject', 'sender', 'content', and 'priority' fields.

    Returns:
        dict: The preprocessed email with the required fields.
    """
    return {
        'id': email.get('id'),
        'subject': email.get('subject', ''),
        'sender': email.get('sender', ''),
        'content': email.get('content', ''),
        'priority': email.get('priority', 0.0)
    }