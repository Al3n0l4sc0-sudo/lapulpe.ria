# /app/backend/models/__init__.py
# Exportar todos los modelos

from .schemas import (
    # User
    User,
    SessionRequest,
    UserTypeChange,
    
    # Pulperia
    Pulperia,
    PulperiaCreate,
    ClosePulperiaRequest,
    
    # Product
    Product,
    ProductCreate,
    
    # Order
    Order,
    OrderItem,
    OrderCreate,
    OrderStatusUpdate,
    
    # Review
    Review,
    ReviewCreate,
    
    # Job
    Job,
    JobCreate,
    JobApplication,
    
    # Service
    Service,
    ServiceCreate,
    
    # Advertisement
    Advertisement,
    AdvertisementCreate,
    AdAssignmentLog,
    AdminAdActivation,
    
    # Featured Ads
    FeaturedAd,
    FeaturedAdSlot,
    
    # Achievements
    PulperiaAchievement,
    PulperiaStats,
    
    # Other
    AnnouncementCreate,
)

__all__ = [
    'User', 'SessionRequest', 'UserTypeChange',
    'Pulperia', 'PulperiaCreate', 'ClosePulperiaRequest',
    'Product', 'ProductCreate',
    'Order', 'OrderItem', 'OrderCreate', 'OrderStatusUpdate',
    'Review', 'ReviewCreate',
    'Job', 'JobCreate', 'JobApplication',
    'Service', 'ServiceCreate',
    'Advertisement', 'AdvertisementCreate', 'AdAssignmentLog', 'AdminAdActivation',
    'FeaturedAd', 'FeaturedAdSlot',
    'PulperiaAchievement', 'PulperiaStats',
    'AnnouncementCreate',
]
