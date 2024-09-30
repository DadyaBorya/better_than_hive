# app/dependencies.py
from app.config import API_KEY, URL, ASSIGNEE
from app.services.hive_api import HiveApi


def get_hive_api() -> HiveApi:
    hive_api = HiveApi(
        api_key=API_KEY,
        url=URL,
        assignee=ASSIGNEE
    )
    return hive_api
