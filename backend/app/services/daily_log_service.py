from datetime import datetime
from fastapi import HTTPException, status
from app.repositories.daily_log_repository import daily_log_repository
from app.schemas.daily_log import DailyLogCreate, DailyLogUpdate


class DailyLogService:

    async def get_week(self, user_id: str, start: str, end: str):
        logs = await daily_log_repository.find_by_user_and_date_range(user_id, start, end)
        for log in logs:
            log["id"] = str(log["_id"])
            del log["_id"]
        return logs

    async def get_or_create(self, user_id: str, date: str):
        log = await daily_log_repository.find_by_user_and_date(user_id, date)
        if not log:
            data = {
                "user_id": user_id,
                "date": date,
                "steps": None,
                "weight": None,
                "sleep_hours": None,
                "notes": None,
                "custom_fields": [],
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow(),
            }
            log_id = await daily_log_repository.create(data)
            log = await daily_log_repository.find_by_id(log_id)
        log["id"] = str(log["_id"])
        del log["_id"]
        return log

    async def update(self, user_id: str, date: str, data: DailyLogUpdate):
        log = await daily_log_repository.find_by_user_and_date(user_id, date)
        if not log:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Log no encontrado"
            )
        update_data = {k: v for k, v in data.model_dump().items() if v is not None}
        update_data["updated_at"] = datetime.utcnow()
        await daily_log_repository.update(str(log["_id"]), update_data)
        return await self.get_or_create(user_id, date)


daily_log_service = DailyLogService()