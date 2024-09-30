from collections import Counter
from datetime import date as _date

from app.services.hive_api import HiveApi
from app.utils.date_format import date_to_timestamp_ms_max, date_to_timestamp_ms_min


class DailyService:

    @staticmethod
    def daily(date: _date, assignee: str, api: HiveApi):
        opened = api.find_cases(status="Open", assignee=assignee)
        cases_opened = DailyService.opened_cases(assignee, api)
        total = DailyService.total(date, assignee, api)
        closed = DailyService.closed(date, assignee, api)
        total_av = DailyService.total_av(date, assignee, api)
        cases = DailyService.total_cases(date, assignee, api)
        cases_closed = DailyService.closed_case(date, assignee, api)

        return {
            "opened": opened,
            "cases_opened": cases_opened,
            "total": total,
            "closed": closed,
            "total_av": total_av,
            "cases": cases,
            "cases_closed": cases_closed
        }

    @staticmethod
    def opened_cases(assignee: str, api: HiveApi):
        cases = api.find_cases(status="Open", limited_count=False, assignee=assignee)

        mapped_cases = [
            {"name": title, "count": count}
            for title, count in Counter(case["title"] for case in cases).items()
        ]

        return mapped_cases

    @staticmethod
    def total(date: _date, assignee: str, api: HiveApi):
        date = (date_to_timestamp_ms_min(date), date_to_timestamp_ms_max(date))
        return api.find_cases(created_at=date, assignee=assignee)

    @staticmethod
    def closed(date: _date, assignee: str, api: HiveApi):
        date = (date_to_timestamp_ms_min(date), date_to_timestamp_ms_max(date))

        return api.find_cases(end_at=date, assignee=assignee)

    @staticmethod
    def total_av(date: _date, assignee: str, api: HiveApi):
        date = (date_to_timestamp_ms_min(date), date_to_timestamp_ms_max(date))

        return api.find_cases(end_at=date, like_av=True, assignee=assignee)

    @staticmethod
    def total_cases(date: _date, assignee: str, api: HiveApi):
        date = (date_to_timestamp_ms_min(date), date_to_timestamp_ms_max(date))

        cases = api.find_cases(created_at=date, limited_count=False, assignee=assignee)
        mapped_cases = [
            {"name": title, "count": count}
            for title, count in Counter(case["title"] for case in cases if
                                        "Функціонування АРМ з порушенням вимог Інструкції з організації антивірусного захисту в ІТС МО України та ЗСУ" not in
                                        case["description"]).items()
        ]

        return mapped_cases

    @staticmethod
    def closed_case(date: _date, assignee: str, api: HiveApi):
        date = (date_to_timestamp_ms_min(date), date_to_timestamp_ms_max(date))

        cases = api.find_cases(end_at=date, limited_count=False, assignee=assignee)

        for case in cases:
            if "Функціонування АРМ з порушенням вимог Інструкції з організації антивірусного захисту в ІТС МО України та ЗСУ" in \
                    case["description"]:
                case["title"] += " (ESET)"

        mapped_cases = [
            {"name": title, "count": count}
            for title, count in Counter(case["title"] for case in cases).items()
        ]

        return mapped_cases
