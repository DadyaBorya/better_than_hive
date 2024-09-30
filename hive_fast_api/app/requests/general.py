from typing import Optional
from pydantic import BaseModel, Field
from datetime import date


class GeneralRequest(BaseModel):
    start_date: Optional[date] = Field(None)
    end_date: Optional[date] = Field(None)
    assignee: str
