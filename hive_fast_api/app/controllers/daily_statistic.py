# app/controllers/daily_statistic.py
from fastapi import APIRouter, Depends

from app.dependencies import get_hive_api
from app.requests.daily import DailyRequest
from app.services.daily import DailyService
from app.services.hive_api import HiveApi

router = APIRouter(
    prefix="/api/v1/statistic/daily",
)


@router.post("/")
async def daily(request: DailyRequest, api: HiveApi = Depends(get_hive_api)):
    return DailyService.daily(request.date, request.assignee, api)


@router.post("/opened")
async def opened(api: HiveApi = Depends(get_hive_api)):
    total = api.find_cases(status="Open")
    return {"opened": total}


@router.post("/opened/cases")
async def opened_cases(api: HiveApi = Depends(get_hive_api)):
    cases = DailyService.opened_cases(api)

    return {"cases_opened": cases}


@router.post("/total")
async def daily(request: DailyRequest, api: HiveApi = Depends(get_hive_api)):
    total = DailyService.total(request.date, api)

    return {"total": total}


@router.post("/closed")
async def daily(request: DailyRequest, api: HiveApi = Depends(get_hive_api)):
    closed = DailyService.closed(request.date, api)

    return {"closed": closed}


@router.post("/total_av")
async def daily(request: DailyRequest, api: HiveApi = Depends(get_hive_api)):
    total_av = DailyService.total_av(request.date, api)

    return {"total_av": total_av}


@router.post("/total/cases")
async def daily(request: DailyRequest, api: HiveApi = Depends(get_hive_api)):
    cases = DailyService.total_cases(request.date, api)

    return {"cases": cases}


@router.post("/closed/cases")
async def daily(request: DailyRequest, api: HiveApi = Depends(get_hive_api)):
    cases = DailyService.closed_case(request.date, api)

    return {"cases_closed": cases}
