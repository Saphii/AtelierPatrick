"""
WSGI config for atelier_patrick project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'atelier_patrick.settings')

application = get_wsgi_application()
