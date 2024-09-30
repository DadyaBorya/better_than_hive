from pydantic import BaseModel, conint
from typing import Literal


class AVCaseRequest(BaseModel):
    content: str
    critical: conint(ge=1, le=3)
    internet: Literal["Internet", "Dnipro"]
    ip: str
    hostname: str
    responsible: str
    responsible_is: str
    unit: str
