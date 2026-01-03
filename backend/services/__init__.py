# /app/backend/services/__init__.py
from .email_service import (
    send_email,
    send_order_notification,
    send_order_accepted,
    send_order_ready,
    send_job_application_notification,
    send_application_accepted
)
