# /app/backend/services/email_service.py
# Servicio de emails para La Pulpería v1.1

import os
import asyncio
import logging
import resend
from typing import Optional, List

logger = logging.getLogger(__name__)

# Configurar Resend con API key
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# Templates de emails
EMAIL_TEMPLATES = {
    'new_order': {
        'subject': '🛒 Nuevo pedido en {pulperia_name}',
        'html': '''
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1c1917; color: #fff; padding: 20px; border-radius: 12px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #dc2626; margin: 0;">🏪 La Pulpería</h1>
            </div>
            <div style="background: #292524; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #fbbf24; margin: 0 0 10px 0;">¡Nuevo Pedido!</h2>
                <p style="color: #a8a29e; margin: 0;">Tienes un nuevo pedido de <strong style="color: #fff;">{customer_name}</strong></p>
            </div>
            <div style="background: #292524; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <p style="color: #a8a29e; margin: 0 0 5px 0;">Total:</p>
                <p style="color: #22c55e; font-size: 24px; font-weight: bold; margin: 0;">L {total}</p>
            </div>
            <div style="text-align: center;">
                <a href="{app_url}/dashboard" style="display: inline-block; background: #dc2626; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Ver Pedido</a>
            </div>
            <p style="color: #57534e; font-size: 12px; text-align: center; margin-top: 20px;">Este email fue enviado por La Pulpería</p>
        </div>
        '''
    },
    'order_accepted': {
        'subject': '✅ Tu pedido fue aceptado - {pulperia_name}',
        'html': '''
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1c1917; color: #fff; padding: 20px; border-radius: 12px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #dc2626; margin: 0;">🏪 La Pulpería</h1>
            </div>
            <div style="background: #14532d; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #22c55e;">
                <h2 style="color: #22c55e; margin: 0 0 10px 0;">✅ ¡Pedido Aceptado!</h2>
                <p style="color: #a8a29e; margin: 0;"><strong style="color: #fff;">{pulperia_name}</strong> aceptó tu pedido</p>
            </div>
            <p style="color: #a8a29e;">Te avisaremos cuando esté listo para recoger.</p>
            <p style="color: #57534e; font-size: 12px; text-align: center; margin-top: 20px;">Este email fue enviado por La Pulpería</p>
        </div>
        '''
    },
    'order_ready': {
        'subject': '🎉 ¡Tu pedido está listo! - {pulperia_name}',
        'html': '''
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1c1917; color: #fff; padding: 20px; border-radius: 12px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #dc2626; margin: 0;">🏪 La Pulpería</h1>
            </div>
            <div style="background: #422006; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #f59e0b;">
                <h2 style="color: #fbbf24; margin: 0 0 10px 0;">🎉 ¡Pedido Listo!</h2>
                <p style="color: #a8a29e; margin: 0;">Tu pedido en <strong style="color: #fff;">{pulperia_name}</strong> está listo para recoger</p>
            </div>
            <p style="color: #a8a29e;">Dirección: <strong style="color: #fff;">{address}</strong></p>
            <p style="color: #57534e; font-size: 12px; text-align: center; margin-top: 20px;">Este email fue enviado por La Pulpería</p>
        </div>
        '''
    },
    'job_application': {
        'subject': '📋 Nueva aplicación para {job_title}',
        'html': '''
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1c1917; color: #fff; padding: 20px; border-radius: 12px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #dc2626; margin: 0;">🏪 La Pulpería</h1>
            </div>
            <div style="background: #422006; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #f59e0b;">
                <h2 style="color: #fbbf24; margin: 0 0 10px 0;">📋 Nueva Aplicación</h2>
                <p style="color: #a8a29e; margin: 0;">Alguien aplicó al empleo <strong style="color: #fff;">{job_title}</strong></p>
            </div>
            <div style="background: #292524; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <p style="color: #a8a29e; margin: 0 0 5px 0;">Aplicante:</p>
                <p style="color: #fff; font-weight: bold; margin: 0;">{applicant_name}</p>
                <p style="color: #a8a29e; margin: 5px 0 0 0;">{applicant_city} • {applicant_age} años</p>
            </div>
            <div style="text-align: center;">
                <a href="{app_url}/jobs" style="display: inline-block; background: #f59e0b; color: #000; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Ver Aplicación</a>
            </div>
            <p style="color: #57534e; font-size: 12px; text-align: center; margin-top: 20px;">Este email fue enviado por La Pulpería</p>
        </div>
        '''
    },
    'application_accepted': {
        'subject': '🎉 ¡Felicidades! Tu aplicación fue aceptada',
        'html': '''
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1c1917; color: #fff; padding: 20px; border-radius: 12px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #dc2626; margin: 0;">🏪 La Pulpería</h1>
            </div>
            <div style="background: #14532d; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #22c55e;">
                <h2 style="color: #22c55e; margin: 0 0 10px 0;">🎉 ¡Felicidades!</h2>
                <p style="color: #a8a29e; margin: 0;">Tu aplicación para <strong style="color: #fff;">{job_title}</strong> fue <strong style="color: #22c55e;">ACEPTADA</strong></p>
            </div>
            <p style="color: #a8a29e;">La pulpería <strong style="color: #fff;">{pulperia_name}</strong> se pondrá en contacto contigo pronto.</p>
            <p style="color: #57534e; font-size: 12px; text-align: center; margin-top: 20px;">Este email fue enviado por La Pulpería</p>
        </div>
        '''
    },
    'application_rejected': {
        'subject': '📋 Actualización sobre tu aplicación - {job_title}',
        'html': '''
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1c1917; color: #fff; padding: 20px; border-radius: 12px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #dc2626; margin: 0;">🏪 La Pulpería</h1>
            </div>
            <div style="background: #450a0a; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #dc2626;">
                <h2 style="color: #f87171; margin: 0 0 10px 0;">📋 Actualización de tu Aplicación</h2>
                <p style="color: #a8a29e; margin: 0;">Lamentablemente, tu aplicación para <strong style="color: #fff;">{job_title}</strong> no fue seleccionada en esta ocasión.</p>
            </div>
            <p style="color: #a8a29e;">No te desanimes, sigue buscando oportunidades en <strong style="color: #fff;">La Pulpería</strong>. ¡Hay muchas chambas esperándote!</p>
            <div style="text-align: center; margin-top: 20px;">
                <a href="{app_url}/jobs" style="display: inline-block; background: #f59e0b; color: #000; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Ver más Chambas</a>
            </div>
            <p style="color: #57534e; font-size: 12px; text-align: center; margin-top: 20px;">Este email fue enviado por La Pulpería</p>
        </div>
        '''
    }
}


async def send_email(to: str, template: str, data: dict) -> bool:
    """
    Envía un email usando un template predefinido.
    
    Args:
        to: Email del destinatario
        template: Nombre del template (new_order, order_accepted, etc.)
        data: Diccionario con los datos para rellenar el template
    
    Returns:
        True si el email se envió correctamente, False si no
    """
    if not RESEND_API_KEY:
        logger.warning("RESEND_API_KEY not configured, skipping email")
        return False
    
    template_config = EMAIL_TEMPLATES.get(template)
    if not template_config:
        logger.error(f"Unknown email template: {template}")
        return False
    
    # Agregar URL base de la app
    data['app_url'] = os.environ.get('FRONTEND_URL', 'https://lapulperiahn.shop')
    
    try:
        subject = template_config['subject'].format(**data)
        html = template_config['html'].format(**data)
        
        params = {
            "from": SENDER_EMAIL,
            "to": [to],
            "subject": subject,
            "html": html
        }
        
        # Ejecutar en thread para no bloquear
        email = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email sent to {to}: {email.get('id')}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send email to {to}: {str(e)}")
        return False


async def send_order_notification(owner_email: str, pulperia_name: str, customer_name: str, total: float):
    """Envía notificación de nuevo pedido al dueño"""
    return await send_email(owner_email, 'new_order', {
        'pulperia_name': pulperia_name,
        'customer_name': customer_name,
        'total': f"{total:,.2f}"
    })


async def send_order_accepted(customer_email: str, pulperia_name: str):
    """Envía notificación de pedido aceptado al cliente"""
    return await send_email(customer_email, 'order_accepted', {
        'pulperia_name': pulperia_name
    })


async def send_order_ready(customer_email: str, pulperia_name: str, address: str):
    """Envía notificación de pedido listo al cliente"""
    return await send_email(customer_email, 'order_ready', {
        'pulperia_name': pulperia_name,
        'address': address or 'Tienda Online'
    })


async def send_job_application_notification(owner_email: str, job_title: str, applicant_name: str, applicant_city: str, applicant_age: int):
    """Envía notificación de nueva aplicación al empleador"""
    return await send_email(owner_email, 'job_application', {
        'job_title': job_title,
        'applicant_name': applicant_name,
        'applicant_city': applicant_city,
        'applicant_age': applicant_age
    })


async def send_application_accepted(applicant_email: str, job_title: str, pulperia_name: str):
    """Envía notificación de aplicación aceptada al aplicante"""
    return await send_email(applicant_email, 'application_accepted', {
        'job_title': job_title,
        'pulperia_name': pulperia_name
    })
