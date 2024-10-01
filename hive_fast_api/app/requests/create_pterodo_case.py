from typing import Literal
from pydantic import BaseModel
from datetime import datetime


class CreatePterodoCaseRequest(BaseModel):
    ip: str
    hostname: str
    responsible: str
    responsible_is: str
    unit: str
    critical: Literal[1, 2, 3]
    edr: Literal['-', '+']
    av: Literal['-', '+']
    threat_actor: str
    malware_type: str
    delivery: str
    flash_drive_number: str
    date_detection: datetime
    infected_files: str
    infected_disk: str
    creator: str
    internet: Literal['Dnipro', 'Internet']
