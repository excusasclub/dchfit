from fastapi import APIRouter, Depends
from app.services.daily_log_service import daily_log_service
from app.schemas.daily_log import DailyLogUpdate
from app.auth.dependencies import get_current_user

router = APIRouter(prefix="/daily-logs", tags=["daily-logs"])


@router.get("/week")
async def get_week(start: str, end: str, current_user=Depends(get_current_user)):
    user_id = str(current_user["_id"])
    return await daily_log_service.get_week(user_id, start, end)


@router.get("/{date}")
async def get_day(date: str, current_user=Depends(get_current_user)):
    user_id = str(current_user["_id"])
    return await daily_log_service.get_or_create(user_id, date)


@router.patch("/{date}")
async def update_day(date: str, data: DailyLogUpdate, current_user=Depends(get_current_user)):
    user_id = str(current_user["_id"])
    return await daily_log_service.update(user_id, date, data)