from typing import Optional
from pydantic import BaseModel
from datetime import date


class CaseEsetQueryRequest(BaseModel):
    date: date
