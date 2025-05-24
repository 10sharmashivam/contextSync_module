from flask import Blueprint, jsonify, request
from datetime import datetime, timedelta
import random

bp = Blueprint('prioritize', __name__)

@bp.route('/api/prioritize', methods=['POST'])
def prioritize_emails():
    """
    Demo version - Returns mock prioritized emails with realistic data
    """
    # Mock emails with realistic data and context-based prioritization
    mock_emails = [
        {
            'id': '1',
            'subject': 'Urgent: Project Deadline Extension Request',
            'sender': 'shivam.sharma@gmail.com',
            'content': 'Hi team, we need to discuss the Q2 project timeline. The client has requested an extension for the dashboard feature. Can we schedule a quick sync today?',
            'priority': 0.95,
            'context': {
                'calendar_events': [
                    {
                        'summary': 'Q2 Project Review',
                        'start': (datetime.now() + timedelta(hours=2)).isoformat(),
                        'end': (datetime.now() + timedelta(hours=3)).isoformat(),
                        'description': 'Review project timeline and deliverables'
                    },
                    {
                        'summary': 'Client Meeting',
                        'start': (datetime.now() + timedelta(days=1)).isoformat(),
                        'end': (datetime.now() + timedelta(days=1, hours=1)).isoformat(),
                        'description': 'Discuss project extension and new requirements'
                    }
                ],
                'slack_messages': [
                    {
                        'channel': 'project-updates',
                        'text': '@channel Project timeline discussion needed. Client requested extension for dashboard feature.',
                        'timestamp': (datetime.now() - timedelta(hours=1)).isoformat()
                    },
                    {
                        'channel': 'team-sync',
                        'text': 'Shivam: Let\'s discuss the extension request in today\'s sync',
                        'timestamp': (datetime.now() - timedelta(minutes=30)).isoformat()
                    }
                ],
                'suggested_actions': [
                    'Schedule project review meeting',
                    'Update project timeline in Jira',
                    'Notify team about extension',
                    'Prepare client update email'
                ],
                'workflow_rules': [
                    'Auto-schedule sync for urgent client requests',
                    'Notify project manager for timeline changes',
                    'Create Jira ticket for extension'
                ]
            }
        },
        {
            'id': '2',
            'subject': 'Weekly Team Sync - Agenda',
            'sender': 'rahul.kumar@gmail.com',
            'content': 'Here\'s the agenda for tomorrow\'s team sync. Please review and add any items you\'d like to discuss. I\'ve included the project updates and timeline adjustments.',
            'priority': 0.85,
            'context': {
                'calendar_events': [
                    {
                        'summary': 'Weekly Team Sync',
                        'start': (datetime.now() + timedelta(days=1)).isoformat(),
                        'end': (datetime.now() + timedelta(days=1, hours=1)).isoformat(),
                        'description': 'Regular team sync to discuss progress and blockers'
                    }
                ],
                'slack_messages': [
                    {
                        'channel': 'team-sync',
                        'text': 'Team sync agenda posted. Please review and add items.',
                        'timestamp': (datetime.now() - timedelta(hours=2)).isoformat()
                    }
                ],
                'suggested_actions': [
                    'Review and update agenda',
                    'Add discussion points',
                    'Prepare project updates',
                    'Share relevant documents'
                ],
                'workflow_rules': [
                    'Auto-add to team sync agenda',
                    'Notify team members 24h before',
                    'Create meeting notes template'
                ]
            }
        },
        {
            'id': '3',
            'subject': 'New Feature Request from Client',
            'sender': 'priya.sharma@gmail.com',
            'content': 'We would like to request a new feature for the dashboard. The client wants to add real-time analytics and custom reporting. Can we discuss this in our next meeting?',
            'priority': 0.75,
            'context': {
                'calendar_events': [
                    {
                        'summary': 'Client Meeting',
                        'start': (datetime.now() + timedelta(days=2)).isoformat(),
                        'end': (datetime.now() + timedelta(days=2, hours=1)).isoformat(),
                        'description': 'Discuss new feature requests and requirements'
                    }
                ],
                'slack_messages': [
                    {
                        'channel': 'feature-requests',
                        'text': 'New feature request: Real-time analytics and custom reporting',
                        'timestamp': (datetime.now() - timedelta(hours=3)).isoformat()
                    }
                ],
                'suggested_actions': [
                    'Create feature specification document',
                    'Schedule technical review',
                    'Estimate development timeline',
                    'Update product roadmap'
                ],
                'workflow_rules': [
                    'Auto-create feature request ticket',
                    'Notify product team',
                    'Schedule technical review'
                ]
            }
        },
        {
            'id': '4',
            'subject': 'Monthly Newsletter',
            'sender': 'amit.patel@gmail.com',
            'content': 'Check out our latest company updates and achievements. We\'ve made significant progress on the ContextSync project and have some exciting features coming up!',
            'priority': 0.45,
            'context': {
                'calendar_events': [
                    {
                        'summary': 'Monthly Review',
                        'start': (datetime.now() + timedelta(days=7)).isoformat(),
                        'end': (datetime.now() + timedelta(days=7, hours=2)).isoformat(),
                        'description': 'Monthly company updates and achievements review'
                    }
                ],
                'slack_messages': [
                    {
                        'channel': 'company-updates',
                        'text': 'Monthly newsletter published with ContextSync updates',
                        'timestamp': (datetime.now() - timedelta(hours=4)).isoformat()
                    }
                ],
                'suggested_actions': [
                    'Read newsletter',
                    'Share with team',
                    'Bookmark for reference',
                    'Add to monthly review agenda'
                ],
                'workflow_rules': [
                    'Auto-add to monthly review',
                    'Share with relevant teams',
                    'Archive after review'
                ]
            }
        },
        {
            'id': '5',
            'subject': 'Office Party Planning',
            'sender': 'neha.gupta@gmail.com',
            'content': 'Let\'s start planning the quarterly office party. We\'re thinking of having it next month. Please share your preferences for the venue and activities.',
            'priority': 0.35,
            'context': {
                'calendar_events': [
                    {
                        'summary': 'Office Party',
                        'start': (datetime.now() + timedelta(days=30)).isoformat(),
                        'end': (datetime.now() + timedelta(days=30, hours=4)).isoformat(),
                        'description': 'Quarterly office party and team building'
                    }
                ],
                'slack_messages': [
                    {
                        'channel': 'team-events',
                        'text': 'Office party planning started. Please share preferences.',
                        'timestamp': (datetime.now() - timedelta(hours=5)).isoformat()
                    }
                ],
                'suggested_actions': [
                    'RSVP for the event',
                    'Suggest activities',
                    'Share venue preferences',
                    'Volunteer for planning'
                ],
                'workflow_rules': [
                    'Auto-add to calendar',
                    'Send reminder before event',
                    'Collect RSVPs'
                ]
            }
        }
    ]

    return jsonify({
        'emails': mock_emails,
        'message': 'Emails prioritized successfully',
        'timestamp': datetime.now().isoformat()
    })