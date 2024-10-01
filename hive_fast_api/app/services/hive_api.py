# app/hive_api.py
from datetime import datetime
import json
from pathlib import Path
from typing import List, Optional

from thehive4py import TheHiveApi

import urllib3
from thehive4py.types.case import InputCase, OutputCase
from thehive4py.types.share import InputShare, OutputShare

from app.requests.av_case import AVCaseRequest
from app.responses.create_av_case import CreateAVCaseResponse
from app.utils.case_query import create_case_query

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

AVC_TEMPLATE_PATH = Path("app/templates/avc_template.txt")


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

    def query_find_cases(self, query:str):
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

    def create_case_av(self, avc: AVCaseRequest) -> CreateAVCaseResponse:
        with AVC_TEMPLATE_PATH.open('r', encoding='utf-8') as f:
            template = f.read()

        description = template.format(
            ip=avc.ip.strip(),
            hostname=avc.hostname.lower().strip(),
            responsible=avc.responsible.strip(),
            responsible_is=avc.responsible_is.strip(),
            unit=avc.unit.strip(),
            critical=avc.critical,
            date=datetime.now().strftime("%d.%m.%y"),
            content=avc.content.strip()
        )

        case = InputCase(
            title="Vulnerability",
            description=description,
            assignee=self.assignee,
            severity=1,
            tags=["Manually", avc.ip, avc.hostname.lower(), avc.internet]
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

        return CreateAVCaseResponse(case_id=case_id, case_number=case_number)
