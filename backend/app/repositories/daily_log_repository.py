from app.database.mongodb import get_db
from bson import ObjectId


class DailyLogRepository:
    def get_collection(self):
        return get_db()["daily_logs"]

    async def find_by_user_and_date(self, user_id: str, date: str):
        return await self.get_collection().find_one({
            "user_id": user_id,
            "date": date
        })

    async def find_by_user_and_date_range(self, user_id: str, start: str, end: str):
        cursor = self.get_collection().find({
            "user_id": user_id,
            "date": {"$gte": start, "$lte": end}
        })
        return await cursor.to_list(length=100)

    async def create(self, data: dict):
        result = await self.get_collection().insert_one(data)
        return str(result.inserted_id)

    async def update(self, log_id: str, data: dict):
        await self.get_collection().update_one(
            {"_id": ObjectId(log_id)},
            {"$set": data}
        )

    async def find_by_id(self, log_id: str):
        return await self.get_collection().find_one({"_id": ObjectId(log_id)})


daily_log_repository = DailyLogRepository()