"""
Script para poblar la base de datos con 3 pulperías de ejemplo y productos
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone
import uuid

# Conectar a MongoDB
client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client["la_pulperia_db"]

async def populate_database():
    print("🏪 Poblando base de datos con pulperías y productos...")
    
    # Limpiar colecciones existentes de pulperías y productos
    await db.pulperias.delete_many({})
    await db.products.delete_many({})
    print("✓ Colecciones limpiadas")
    
    # Crear 3 pulperías de ejemplo
    pulperias = [
        {
            "pulperia_id": f"pulperia_{uuid.uuid4().hex[:12]}",
            "owner_user_id": "demo_owner_1",
            "name": "Pulpería Don José",
            "description": "La pulpería más tradicional del barrio. Llevamos 30 años sirviendo a la comunidad con productos frescos y precios justos.",
            "address": "Barrio El Centro, Tegucigalpa",
            "location": {
                "lat": 14.0723,
                "lng": -87.1921
            },
            "phone": "+504 9876-5432",
            "email": "donjose@lapulperia.hn",
            "hours": "Lun-Sab: 6:00 AM - 8:00 PM, Dom: 7:00 AM - 2:00 PM",
            "image_url": "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800",
            "logo_url": "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200",
            "rating": 4.8,
            "review_count": 47,
            "title_font": "default",
            "background_color": "#DC2626",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "pulperia_id": f"pulperia_{uuid.uuid4().hex[:12]}",
            "owner_user_id": "demo_owner_2",
            "name": "Pulpería La Bendición",
            "description": "Tu tienda de confianza para el día a día. Productos de calidad, atención familiar y entrega rápida.",
            "address": "Colonia Kennedy, San Pedro Sula",
            "location": {
                "lat": 15.5047,
                "lng": -88.0251
            },
            "phone": "+504 9123-4567",
            "email": "labendicion@lapulperia.hn",
            "hours": "Todos los días: 5:30 AM - 9:00 PM",
            "image_url": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
            "logo_url": "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=200",
            "rating": 4.9,
            "review_count": 63,
            "title_font": "default",
            "background_color": "#B91C1C",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "pulperia_id": f"pulperia_{uuid.uuid4().hex[:12]}",
            "owner_user_id": "demo_owner_3",
            "name": "Pulpería El Rinconcito",
            "description": "Precios bajos todos los días. Variedad de productos, ofertas especiales y promociones semanales.",
            "address": "Barrio Guacerique, Tegucigalpa",
            "location": {
                "lat": 14.0650,
                "lng": -87.2072
            },
            "phone": "+504 9888-7777",
            "email": "elrinconcito@lapulperia.hn",
            "hours": "Lun-Dom: 6:00 AM - 10:00 PM",
            "image_url": "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800",
            "logo_url": "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=200",
            "rating": 4.7,
            "review_count": 38,
            "title_font": "default",
            "background_color": "#991B1B",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    # Insertar pulperías
    await db.pulperias.insert_many(pulperias)
    print(f"✓ {len(pulperias)} pulperías creadas")
    
    # Productos comunes para todas las pulperías
    productos_base = [
        # Lácteos
        {"name": "Leche Entera", "category": "Lácteos", "price": 45.0, "stock": 50, "description": "Leche fresca entera 1L"},
        {"name": "Queso Fresco", "category": "Lácteos", "price": 55.0, "stock": 30, "description": "Queso fresco artesanal"},
        {"name": "Crema", "category": "Lácteos", "price": 35.0, "stock": 25, "description": "Crema hondureña 250ml"},
        {"name": "Mantequilla", "category": "Lácteos", "price": 48.0, "stock": 40, "description": "Mantequilla 250g"},
        
        # Panadería
        {"name": "Pan Dulce", "category": "Panadería", "price": 8.0, "stock": 100, "description": "Pan dulce tradicional"},
        {"name": "Pan Francés", "category": "Panadería", "price": 5.0, "stock": 80, "description": "Pan francés fresco"},
        {"name": "Tortillas", "category": "Panadería", "price": 15.0, "stock": 60, "description": "Tortillas de maíz (docena)"},
        
        # Bebidas
        {"name": "Coca-Cola 2L", "category": "Bebidas", "price": 35.0, "stock": 45, "description": "Coca-Cola 2 litros"},
        {"name": "Jugo Natural", "category": "Bebidas", "price": 25.0, "stock": 30, "description": "Jugo natural de frutas"},
        {"name": "Agua Mineral", "category": "Bebidas", "price": 15.0, "stock": 70, "description": "Agua mineral 1L"},
        {"name": "Café Soluble", "category": "Bebidas", "price": 65.0, "stock": 35, "description": "Café instantáneo 200g"},
        
        # Granos
        {"name": "Frijoles Rojos", "category": "Granos", "price": 28.0, "stock": 50, "description": "Frijoles rojos por libra"},
        {"name": "Arroz", "category": "Granos", "price": 22.0, "stock": 60, "description": "Arroz blanco por libra"},
        {"name": "Maíz", "category": "Granos", "price": 18.0, "stock": 40, "description": "Maíz amarillo por libra"},
        
        # Carnes
        {"name": "Pollo Fresco", "category": "Carnes", "price": 70.0, "stock": 25, "description": "Pollo fresco por libra"},
        {"name": "Carne de Res", "category": "Carnes", "price": 95.0, "stock": 20, "description": "Carne de res por libra"},
        {"name": "Jamón", "category": "Carnes", "price": 58.0, "stock": 30, "description": "Jamón de cerdo 250g"},
        
        # Productos Básicos
        {"name": "Azúcar Blanca", "category": "Básicos", "price": 20.0, "stock": 55, "description": "Azúcar blanca por libra"},
        {"name": "Sal", "category": "Básicos", "price": 8.0, "stock": 70, "description": "Sal de mesa 500g"},
        {"name": "Aceite Vegetal", "category": "Básicos", "price": 52.0, "stock": 35, "description": "Aceite vegetal 1L"},
        {"name": "Huevos", "category": "Básicos", "price": 48.0, "stock": 40, "description": "Huevos frescos (docena)"},
        
        # Snacks
        {"name": "Papas Fritas", "category": "Snacks", "price": 18.0, "stock": 60, "description": "Papas fritas grandes"},
        {"name": "Galletas", "category": "Snacks", "price": 22.0, "stock": 50, "description": "Galletas surtidas"},
        {"name": "Chocolates", "category": "Snacks", "price": 15.0, "stock": 45, "description": "Barra de chocolate"},
    ]
    
    # Insertar productos para cada pulpería
    total_productos = 0
    for pulperia in pulperias:
        productos = []
        for prod in productos_base:
            producto = {
                "product_id": f"product_{uuid.uuid4().hex[:12]}",
                "pulperia_id": pulperia["pulperia_id"],
                **prod,
                "available": True,
                "image_url": f"https://images.unsplash.com/photo-{1500000000000 + total_productos}?w=400",
                "created_at": datetime.now(timezone.utc).isoformat()
            }
            productos.append(producto)
            total_productos += 1
        
        await db.products.insert_many(productos)
        print(f"  ✓ {len(productos)} productos agregados a {pulperia['name']}")
    
    print(f"\n✅ Base de datos poblada exitosamente!")
    print(f"   📍 {len(pulperias)} pulperías creadas")
    print(f"   📦 {total_productos} productos creados")
    print(f"\n🔐 Para crear usuarios, usa Google OAuth en la app")

if __name__ == "__main__":
    asyncio.run(populate_database())
