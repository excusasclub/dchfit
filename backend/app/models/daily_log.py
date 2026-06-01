from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List


class CustomField(BaseModel):
    label: str
    value: str


class DailyLogModel(BaseModel):
    id: Optional[str] = None
    user_id: str
    date: str
    steps: Optional[int] = None
    weight: Optional[float] = None
    sleep_hours: Optional[float] = None
    notes: Optional[str] = None
    custom_fields: List[CustomField] = []
    created_at: datetime = datetime.utcnow()
    updated_at: datetime = datetime.utcnow()