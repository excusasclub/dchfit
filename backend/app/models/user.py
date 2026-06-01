from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


class UserModel(BaseModel):
    id: Optional[str] = None
    username: str
    email: EmailStr
    password_hash: str
    created_at: datetime = datetime.utcnow()
    updated_at: datetime = datetime.utcnow()
    is_active: bool = True
    privacy_mode: str = "private"