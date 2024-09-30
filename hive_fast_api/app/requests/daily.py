from pydantic import BaseModel
from datetime import date


class DailyRequest(BaseModel):
    date: date
    assignee: str
