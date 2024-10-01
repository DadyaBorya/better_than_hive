# app/hive_api.py
from datetime import datetime
import json
from pathlib import Path
from typing import List, Optional

from thehive4py import TheHiveApi

import urllib3
from thehive4py.types.case import InputCase, OutputCase
from thehive4py.types.share import InputShare, OutputShare

from app.requests.create_eset_case import CreateEsetCaseRequest
from app.requests.create_pterodo_case import CreatePterodoCaseRequest
from app.responses.create_case import CreateCaseResponse
from app.utils.case_query import create_case_query

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

ESET_TEMPLATE_PATH = Path("app/templates/eset_template.txt")
PTERODO_TEMPLATE_PATH = Path("app/templates/pterodo_template.txt")


class HiveApi:
    def __init__(self, api_key, url, assignee):
        self.hive = TheHiveApi(
            url=url,
            apikey=api_key,
        )
        self.assignee = assignee

    def get_current_user(self):
        return self.hive.user.get_current()

    def create_case(self, case: InputCase) -> OutputCase:
        return self.hive.case.create(case=case)

    def share_case(self, case_id: str, shares: List[InputShare]) -> List[OutputShare]:
        return self.hive.case.share(case_id=case_id, shares=shares)

    def update_case(self, case_id: str, fields=None, **kwargs) -> None:
        if fields is None:
            fields = {}
        self.hive.case.update(case_id=case_id, fields=fields, **kwargs)

    def query_find_cases(self, query: str):
        return self.hive.session.make_request(
            method="POST",
            path="/api/v1/query?name=cases.count",
            json=json.loads(query)
        )

    def find_cases(self,
                   created_at: (Optional[int], Optional[int]) = None,
                   end_at: (Optional[int], Optional[int]) = None,
                   like_av: bool = False,
                   limited_count: bool = True,
                   status: str = None,
                   all: bool = False,
                   like_title: str = None,
                   assignee: str = "6czi@cyber.ua"
                   ):
        query = create_case_query(
            limited_count=limited_count,
            created_at=created_at,
            end_date=end_at,
            assignee=assignee,
            like_av=like_av,
            status=status,
            all=all,
            like_title=like_title
        )
        return self.hive.session.make_request(
            method="POST",
            path="/api/v1/query?name=cases.count",
            json=query
        )

    def create_pterodo_case(self, pterodo: CreatePterodoCaseRequest):
        with PTERODO_TEMPLATE_PATH.open('r', encoding='utf-8') as f:
            template = f.read()

        description = template.format(
            ip=pterodo.ip.strip(),
            hostname=pterodo.hostname.lower().strip(),
            responsible=pterodo.responsible.strip(),
            responsible_is=pterodo.responsible_is.strip(),
            unit=pterodo.unit.strip(),
            critical=pterodo.critical,
            date=datetime.now().strftime("%d.%m.%y"),
            edr=pterodo.edr,
            av=pterodo.av,
            threat_actor=pterodo.threat_actor,
            malware_type=pterodo.malware_type,
            delivery=pterodo.delivery,
            flash_drive_number=pterodo.flash_drive_number,
            date_detection=pterodo.date_detection.strftime("%d.%m.%y %H:%M:%S"),
            infected_files=pterodo.infected_files,
            infected_disk=pterodo.infected_disk,
            creator=pterodo.creator
        )

        case = InputCase(
            title="Malicious Code",
            description=description,
            assignee=self.assignee,
            severity=1,
            tags=["Manually", pterodo.ip, pterodo.hostname.lower(), pterodo.internet, pterodo.threat_actor]
        )

        case = self.create_case(case=case)

        case_id = case.get("_id")
        case_number = case.get("number")

        return CreateCaseResponse(case_id=case_id, case_number=case_number)

    def create_eset_case(self, eset: CreateEsetCaseRequest) -> CreateCaseResponse:
        with ESET_TEMPLATE_PATH.open('r', encoding='utf-8') as f:
            template = f.read()

        description = template.format(
            ip=eset.ip.strip(),
            hostname=eset.hostname.lower().strip(),
            responsible=eset.responsible.strip(),
            responsible_is=eset.responsible_is.strip(),
            unit=eset.unit.strip(),
            critical=eset.critical,
            date=datetime.now().strftime("%d.%m.%y"),
            content=eset.content.strip()
        )

        case = InputCase(
            title="Vulnerability",
            description=description,
            assignee=self.assignee,
            severity=1,
            tags=["Manually", eset.ip, eset.hostname.lower(), eset.internet]
        )

        case = self.create_case(case=case)

        case_id = case.get("_id")
        case_number = case.get("number")

        shares = [
            {
                "organisationName": "Cybersecurity Department",
                "observables": "all",
                "profile": "read-only",
                "tasks": "all"
            }
        ]

        self.share_case(case_id=case_id, shares=shares)

        updated_case = {
            "status": "Resolved",
            "impactStatus": "NoImpact",
            "summary": "АВПЗ встановлено",
            "resolutionStatus": "TruePositive",
        }
        self.update_case(case_id=case_id, case=updated_case)

        return CreateCaseResponse(case_id=case_id, case_number=case_number)
