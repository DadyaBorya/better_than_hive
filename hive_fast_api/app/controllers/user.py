# app/controllers/user.py

from fastapi import APIRouter, Depends

from app.dependencies import get_hive_api
from app.services.hive_api import HiveApi

router = APIRouter(
    prefix="/api/v1",
)


@router.get("/user/current")
async def user_current(api: HiveApi = Depends(get_hive_api)):
    return api.get_current_user()
