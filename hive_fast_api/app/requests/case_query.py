from typing import Optional

from pydantic import BaseModel, Field


class CaseQueryRequest(BaseModel):
    query: str
