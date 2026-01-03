"""
Script para limpiar datos de prueba del sistema
Elimina pulperías de demo y datos relacionados
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os

async def cleanup_demo_data():
    """Remove demo/test data from database"""
    MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    DB_NAME = os.environ.get('DB_NAME', 'la_pulperia_db')
    
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    print("🧹 Limpiando datos de prueba...")
    
    # Find and delete demo pulperias
    demo_pulperias = await db.pulperias.find(
        {"owner_user_id": {"$regex": "^demo_owner"}}
    ).to_list(100)
    
    if demo_pulperias:
        for pulperia in demo_pulperias:
            pulperia_id = pulperia.get('pulperia_id')
            name = pulperia.get('name', 'Sin nombre')
            print(f"  Eliminando: {name} ({pulperia_id})")
            
            # Delete related data
            await db.products.delete_many({"pulperia_id": pulperia_id})
            await db.orders.delete_many({"pulperia_id": pulperia_id})
            await db.reviews.delete_many({"pulperia_id": pulperia_id})
            await db.announcements.delete_many({"pulperia_id": pulperia_id})
            await db.achievements.delete_many({"pulperia_id": pulperia_id})
            await db.jobs.delete_many({"pulperia_id": pulperia_id})
            await db.pulperias.delete_one({"pulperia_id": pulperia_id})
        
        print(f"✓ {len(demo_pulperias)} pulperías de prueba eliminadas")
    else:
        print("✓ No se encontraron pulperías de prueba")
    
    # Clean up any orphaned demo users
    demo_users = await db.users.find(
        {"email": {"$regex": "demo|test", "$options": "i"}}
    ).to_list(100)
    
    if demo_users:
        result = await db.users.delete_many(
            {"email": {"$regex": "demo|test", "$options": "i"}}
        )
        print(f"✓ {result.deleted_count} usuarios de prueba eliminados")
    
    print("\n✅ Limpieza completada")

if __name__ == "__main__":
    asyncio.run(cleanup_demo_data())
