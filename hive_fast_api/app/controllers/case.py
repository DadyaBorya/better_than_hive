# app/controllers/user.py
import json
from pathlib import Path
from fastapi.responses import FileResponse

from fastapi import APIRouter, Depends
from datetime import date as _date

from app.dependencies import get_hive_api
from app.requests.case_eset_query import CaseEsetQueryRequest
from app.requests.case_query import CaseQueryRequest
from app.requests.create_pterodo_case import CreatePterodoCaseRequest
from app.responses.create_case import CreateCaseResponse
from app.services.hive_api import HiveApi
from app.requests.create_eset_case import CreateEsetCaseRequest
from app.utils.date_format import date_to_timestamp_ms_min, date_to_timestamp_ms_max

router = APIRouter(
    prefix="/api/v1",
)


@router.post("/case/eset")
async def eset_case_create(avc: CreateEsetCaseRequest, api: HiveApi = Depends(get_hive_api)) -> CreateCaseResponse:
    return api.create_eset_case(avc)


@router.post("/case/pterodo")
async def eset_case_create(avc: CreatePterodoCaseRequest, api: HiveApi = Depends(get_hive_api)) -> CreateCaseResponse:
    return api.create_pterodo_case(avc)


@router.post("/case")
async def case(req: CaseQueryRequest, api: HiveApi = Depends(get_hive_api)):
    return api.query_find_cases(query=req.query)


@router.get("/case/all/file")
async def case_all(api: HiveApi = Depends(get_hive_api)):
    cases = api.find_cases(all=True)

    file_path = Path("cases.json")
    with file_path.open("w") as json_file:
        json.dump(cases, json_file, indent=4, ensure_ascii=False)

    return FileResponse(
        path=str(file_path),
        filename="cases.json",
        media_type="application/json"
    )


@router.post("/case/eset/today")
async def cases_eset(req: CaseEsetQueryRequest, api: HiveApi = Depends(get_hive_api)):
    date = (date_to_timestamp_ms_min(req.date), date_to_timestamp_ms_max(req.date))
    return api.find_cases(like_av=True, created_at=date, limited_count=False)
