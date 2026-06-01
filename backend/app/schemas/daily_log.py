from pydantic import BaseModel
from typing import Optional, List


class CustomFieldSchema(BaseModel):
    label: str
    value: str


class DailyLogCreate(BaseModel):
    date: str
    steps: Optional[int] = None
    weight: Optional[float] = None
    sleep_hours: Optional[float] = None
    notes: Optional[str] = None
    custom_fields: List[CustomFieldSchema] = []


class DailyLogUpdate(BaseModel):
    steps: Optional[int] = None
    weight: Optional[float] = None
    sleep_hours: Optional[float] = None
    notes: Optional[str] = None
    custom_fields: Optional[List[CustomFieldSchema]] = None