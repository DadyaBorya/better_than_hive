# app/main.py

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.controllers import user, case, daily_statistic, general_statistic

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(case.router)
app.include_router(daily_statistic.router)
app.include_router(general_statistic.router)
