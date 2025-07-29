import os
import dotenv

dotenv.load_dotenv()

class Settings:
    # Database Configuration
    DATABASE_HOST = os.getenv("DATABASE_HOST", "localhost")
    DATABASE_PORT = os.getenv("DATABASE_PORT", "5432")
    DATABASE_NAME = os.getenv("DATABASE_NAME", "postgres")
    DATABASE_USER = os.getenv("DATABASE_USER", "postgres")
    DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD", "MFakhriAKM1")
    
    # JWT Configuration
    SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here-please-change-in-production")
    JWT_ALGORITHM = "HS256"
    JWT_EXPIRATION_MINUTES = 30
    
    # Redis Configuration (for caching)
    REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
    REDIS_PORT = int(os.getenv("REDIS_PORT", "6379"))
    REDIS_PASSWORD = os.getenv("REDIS_PASSWORD", None)
    
    # File Upload Configuration
    MAX_FILE_SIZE_MB = 50
    ALLOWED_EXTENSIONS = {".csv", ".xlsx", ".xls"}
    UPLOAD_FOLDER = "uploads"
    
    # ML Model Configuration
    MODEL_PATH = "ml/models"
    PREDICTION_CACHE_TTL = 3600  # 1 hour in seconds
    
    # API Configuration
    API_V1_PREFIX = "/api"
    CORS_ORIGINS = ["http://localhost:8080", "http://localhost:3000"]
    
    @property
    def database_url(self) -> str:
        return f"postgresql://{self.DATABASE_USER}:{self.DATABASE_PASSWORD}@{self.DATABASE_HOST}:{self.DATABASE_PORT}/{self.DATABASE_NAME}"

settings = Settings()