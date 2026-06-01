from app.database.mongodb import get_db
from bson import ObjectId


class UserRepository:
    def get_collection(self):
        return get_db()["users"]

    async def find_by_email(self, email: str):
        return await self.get_collection().find_one({"email": email})

    async def find_by_username(self, username: str):
        return await self.get_collection().find_one({"username": username})

    async def find_by_id(self, user_id: str):
        return await self.get_collection().find_one({"_id": ObjectId(user_id)})

    async def create(self, user_data: dict):
        result = await self.get_collection().insert_one(user_data)
        return str(result.inserted_id)


user_repository = UserRepository()