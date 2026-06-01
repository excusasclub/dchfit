from fastapi import HTTPException, status
from datetime import datetime
from app.repositories.user_repository import user_repository
from app.auth.password import hash_password, verify_password
from app.auth.jwt import create_access_token, create_refresh_token
from app.schemas.auth import RegisterRequest, LoginRequest


class AuthService:

    async def register(self, data: RegisterRequest):
        if await user_repository.find_by_email(data.email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email ya registrado",
            )

        if await user_repository.find_by_username(data.username):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username ya registrado",
            )

        user_data = {
            "username": data.username,
            "email": data.email,
            "password_hash": hash_password(data.password),
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "is_active": True,
            "privacy_mode": "private",
        }

        user_id = await user_repository.create(user_data)

        access_token = create_access_token({"sub": user_id})
        refresh_token = create_refresh_token({"sub": user_id})

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
        }

    async def login(self, data: LoginRequest):
        user = await user_repository.find_by_email(data.email)

        if not user or not verify_password(data.password, user["password_hash"]):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Credenciales incorrectas",
            )

        user_id = str(user["_id"])
        access_token = create_access_token({"sub": user_id})
        refresh_token = create_refresh_token({"sub": user_id})

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
        }


auth_service = AuthService()