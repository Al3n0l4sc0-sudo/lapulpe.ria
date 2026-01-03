#!/usr/bin/env python3
"""
Create minimal test data for testing endpoints
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone
import uuid
import os

async def create_test_data():
    """Create minimal test data for endpoint testing"""
    MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    DB_NAME = os.environ.get('DB_NAME', 'la_pulperia_db')
    
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    print("🏪 Creando datos de prueba mínimos...")
    
    # Create test pulperias with is_online_only field
    test_pulperias = [
        {
            "pulperia_id": f"test_pulperia_{uuid.uuid4().hex[:8]}",
            "owner_user_id": f"test_user_{uuid.uuid4().hex[:8]}",
            "name": "Pulpería Test Física",
            "description": "Pulpería con ubicación física",
            "address": "Calle Principal, Tegucigalpa",
            "location": {"lat": 14.0723, "lng": -87.1921},
            "phone": "+504 1234-5678",
            "email": "test1@lapulperia.hn",
            "hours": "Lun-Sab: 8:00 AM - 6:00 PM",
            "rating": 4.5,
            "review_count": 10,
            "title_font": "default",
            "background_color": "#DC2626",
            "is_online_only": False,  # Physical store
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "pulperia_id": f"test_pulperia_{uuid.uuid4().hex[:8]}",
            "owner_user_id": f"test_user_{uuid.uuid4().hex[:8]}",
            "name": "Pulpería Test Solo en Línea",
            "description": "Pulpería que opera únicamente en línea",
            "address": None,  # No physical address
            "location": None,  # No GPS location
            "phone": "+504 8765-4321",
            "email": "test2@lapulperia.hn",
            "website": "https://tiendaonline.com",
            "hours": "24/7 - Pedidos en línea",
            "rating": 4.8,
            "review_count": 25,
            "title_font": "default",
            "background_color": "#B91C1C",
            "is_online_only": True,  # Online-only store
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    # Insert test pulperias
    await db.pulperias.insert_many(test_pulperias)
    print(f"✓ {len(test_pulperias)} pulperías de prueba creadas")
    
    # Create test jobs
    test_jobs = [
        {
            "job_id": f"test_job_{uuid.uuid4().hex[:8]}",
            "employer_user_id": test_pulperias[0]["owner_user_id"],
            "employer_name": "Test Employer",
            "pulperia_id": test_pulperias[0]["pulperia_id"],
            "pulperia_name": test_pulperias[0]["name"],
            "title": "Vendedor de Mostrador",
            "description": "Se busca vendedor con experiencia en atención al cliente",
            "category": "Ventas",
            "pay_rate": 15000.0,
            "pay_currency": "HNL",
            "location": "Tegucigalpa, Honduras",
            "contact": "test1@lapulperia.hn",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "job_id": f"test_job_{uuid.uuid4().hex[:8]}",
            "employer_user_id": test_pulperias[1]["owner_user_id"],
            "employer_name": "Test Online Employer",
            "pulperia_id": test_pulperias[1]["pulperia_id"],
            "pulperia_name": test_pulperias[1]["name"],
            "title": "Asistente de Ventas Online",
            "description": "Manejo de pedidos en línea y atención al cliente digital",
            "category": "E-commerce",
            "pay_rate": 18000.0,
            "pay_currency": "HNL",
            "location": "Trabajo Remoto",
            "contact": "test2@lapulperia.hn",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    # Insert test jobs
    await db.jobs.insert_many(test_jobs)
    print(f"✓ {len(test_jobs)} empleos de prueba creados")
    
    # Create test featured ads
    test_ads = [
        {
            "ad_id": f"test_ad_{uuid.uuid4().hex[:8]}",
            "pulperia_id": test_pulperias[0]["pulperia_id"],
            "pulperia_name": test_pulperias[0]["name"],
            "title": "¡Ofertas Especiales!",
            "description": "Descuentos en productos seleccionados",
            "image_url": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
            "link_url": f"/p/{test_pulperias[0]['pulperia_id']}",
            "is_active": True,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "expires_at": (datetime.now(timezone.utc).replace(year=2026)).isoformat()
        }
    ]
    
    # Insert test featured ads
    await db.featured_ads.insert_many(test_ads)
    print(f"✓ {len(test_ads)} anuncios destacados de prueba creados")
    
    print("\n✅ Datos de prueba creados exitosamente!")
    print("   📍 2 pulperías (1 física, 1 solo en línea)")
    print("   💼 2 empleos")
    print("   📢 1 anuncio destacado")

if __name__ == "__main__":
    asyncio.run(create_test_data())