from collections import defaultdict
from datetime import datetime

from fastapi import APIRouter, Depends

from app.dependencies import get_hive_api
from app.requests.general import GeneralRequest
from app.services.general import GeneralService
from app.services.hive_api import HiveApi

router = APIRouter(
    prefix="/api/v1/statistic/general",
)


@router.post("/")
def general(request: GeneralRequest, api: HiveApi = Depends(get_hive_api)):
    return GeneralService.general(request.start_date, request.end_date, request.assignee, api)
