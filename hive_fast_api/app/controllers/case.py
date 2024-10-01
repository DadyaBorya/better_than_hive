# app/controllers/user.py

from fastapi import APIRouter, Depends
from datetime import date as _date

from app.dependencies import get_hive_api
from app.requests.case_eset_query import CaseEsetQueryRequest
from app.requests.case_query import CaseQueryRequest
from app.responses.create_av_case import CreateAVCaseResponse
from app.services.hive_api import HiveApi
from app.requests.av_case import AVCaseRequest
from app.utils.date_format import date_to_timestamp_ms_min, date_to_timestamp_ms_max

router = APIRouter(
    prefix="/api/v1",
)


@router.post("/case/eset")
async def anti_virus_case_create(avc: AVCaseRequest, api: HiveApi = Depends(get_hive_api)) -> CreateAVCaseResponse:
    return api.create_case_av(avc)


@router.post("/case")
async def case(req: CaseQueryRequest, api: HiveApi = Depends(get_hive_api)):
    return api.query_find_cases(query=req.query)


@router.post("/case/eset/today")
async def cases_eset(req: CaseEsetQueryRequest, api: HiveApi = Depends(get_hive_api)):
    date = (date_to_timestamp_ms_min(req.date), date_to_timestamp_ms_max(req.date))
    return api.find_cases(like_av=True, created_at=date, limited_count=False)
