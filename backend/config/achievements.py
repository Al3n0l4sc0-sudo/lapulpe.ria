# /app/backend/config/achievements.py
# Sistema de Meritocracia - Logros basados en métricas reales

ACHIEVEMENT_DEFINITIONS = {
    # Nivel 1 - Principiante (fáciles de conseguir)
    "primera_venta": {
        "name": "Primera Venta",
        "description": "¡Completaste tu primera venta!",
        "icon": "ShoppingBag",
        "criteria": {"sales_count": 1},
        "points": 10
    },
    "catalogo_inicial": {
        "name": "Catálogo Inicial",
        "description": "5 productos en tu tienda",
        "icon": "Package",
        "criteria": {"products_count": 5},
        "points": 10
    },
    
    # Nivel 2 - En Progreso
    "diez_ventas": {
        "name": "10 Ventas",
        "description": "10 ventas completadas",
        "icon": "Star",
        "criteria": {"sales_count": 10},
        "points": 25
    },
    "catalogo_completo": {
        "name": "Catálogo Completo",
        "description": "15+ productos registrados",
        "icon": "Package",
        "criteria": {"products_count": 15},
        "points": 25
    },
    "primeras_visitas": {
        "name": "Ganando Visibilidad",
        "description": "50 visitas a tu perfil",
        "icon": "Eye",
        "criteria": {"profile_views": 50},
        "points": 20
    },
    
    # Nivel 3 - Establecido
    "cliente_feliz": {
        "name": "Clientes Felices",
        "description": "10 reseñas positivas (4+ estrellas)",
        "icon": "Heart",
        "criteria": {"happy_customers": 10},
        "points": 40
    },
    "cincuenta_ventas": {
        "name": "Vendedor Activo",
        "description": "50 ventas completadas",
        "icon": "TrendingUp",
        "criteria": {"sales_count": 50},
        "points": 50
    },
    "popular": {
        "name": "Pulpería Popular",
        "description": "200+ visitas a tu perfil",
        "icon": "Users",
        "criteria": {"profile_views": 200},
        "points": 40
    },
    
    # Nivel 4 - Experto
    "cien_ventas": {
        "name": "Vendedor Estrella",
        "description": "100 ventas completadas",
        "icon": "Star",
        "criteria": {"sales_count": 100},
        "points": 75
    },
    "super_catalogo": {
        "name": "Super Catálogo",
        "description": "30+ productos en tu tienda",
        "icon": "Layers",
        "criteria": {"products_count": 30},
        "points": 50
    },
    "muy_popular": {
        "name": "Muy Popular",
        "description": "500+ visitas a tu perfil",
        "icon": "Flame",
        "criteria": {"profile_views": 500},
        "points": 60
    },
    
    # Nivel 5 - Maestro (Legendarios)
    "verificado": {
        "name": "Verificado",
        "description": "Negocio verificado por admin",
        "icon": "BadgeCheck",
        "criteria": {"is_verified": True},
        "points": 100,
        "tier": "legendary"
    },
    "top_vendedor": {
        "name": "Top Vendedor",
        "description": "250+ ventas totales",
        "icon": "Trophy",
        "criteria": {"sales_count": 250},
        "points": 150,
        "tier": "legendary"
    },
    "leyenda": {
        "name": "Leyenda Local",
        "description": "1000+ visitas y 50+ reseñas positivas",
        "icon": "Crown",
        "criteria": {"profile_views": 1000, "happy_customers": 50},
        "points": 200,
        "tier": "legendary"
    }
}

# Precios de planes de publicidad
AD_PLANS = {
    "basico": {"price": 100, "duration_days": 7, "description": "Aparece en búsquedas"},
    "destacado": {"price": 250, "duration_days": 7, "description": "Destacado en resultados"},
    "premium": {"price": 500, "duration_days": 14, "description": "Banner superior + destacado"},
    "recomendado": {"price": 1000, "duration_days": 30, "description": "Anuncio en página de inicio"}
}
