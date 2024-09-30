from collections import defaultdict, Counter
from datetime import timedelta, date

from app.services.hive_api import HiveApi
from app.utils.date_format import timestamp_to_date


class GeneralService:
    @staticmethod
    def general(start_date, end_date, assignee, api: HiveApi):
        db_cases = api.find_cases(all=True, assignee=assignee)

        cases, eset_cases = GeneralService.split_cases(db_cases, start_date, end_date)
        cases = GeneralService.fill_missing_dates(cases, start_date, end_date)
        eset_cases = GeneralService.fill_missing_dates(eset_cases, start_date, end_date)

        avg_cases_per_day = GeneralService.calculate_average_cases_per_day(cases)

        closed_cases, closed_eset_cases = GeneralService.split_cases(db_cases, start_date, end_date, "endDate")
        closed_cases = GeneralService.fill_missing_dates(closed_cases, start_date, end_date)
        closed_eset_cases = GeneralService.fill_missing_dates(closed_eset_cases, start_date, end_date)

        closed_avg_cases_per_day = GeneralService.calculate_average_cases_per_day(closed_cases)
        closed_avg_eset_cases_per_day = GeneralService.calculate_average_cases_per_day(closed_eset_cases)

        cases_chart = GeneralService.cases_chart(cases)
        closed_cases_chart = GeneralService.cases_chart(closed_cases)
        closed_eset_cases_chart = GeneralService.cases_chart(closed_eset_cases)

        cases_pie_chart = GeneralService.cases_pie_chart(cases)

        return {
            "total_cases": GeneralService.count_splited_cases(cases),
            "total_cases_eset": GeneralService.count_splited_cases(eset_cases),
            "avg_cases": avg_cases_per_day,
            "closed_avg_cases": closed_avg_cases_per_day,
            "closed_avg_eset_cases": closed_avg_eset_cases_per_day,
            "cases_chart": cases_chart,
            "closed_cases_chart": closed_cases_chart,
            "closed_eset_cases_chart": closed_eset_cases_chart,
            "cases_pie_chart": cases_pie_chart
        }

    @staticmethod
    def cases_pie_chart(case_dict):
        cases = [case for cases in case_dict.values() for case in cases]

        title_counts = Counter(case["title"] for case in cases)

        mapped_cases = [
            {"name": title, "count": count}
            for title, count in sorted(title_counts.items(), key=lambda x: x[1], reverse=True)
        ]

        return mapped_cases

    @staticmethod
    def cases_chart(case_dict):
        return {
            "labels": [key.strftime('%Y-%m-%d') if isinstance(key, date) else str(key) for key in case_dict.keys()],
            "datasets": [
                {
                    "label": "Cases",
                    "data": [len(value) for value in case_dict.values()]
                }
            ]
        }

    @staticmethod
    def count_splited_cases(case_dict):
        return sum(len(cases) for cases in case_dict.values())

    @staticmethod
    def split_cases(db_cases, start_date, end_date, date_filed="_createdAt", ):
        eset_cases = defaultdict(list)
        cases = defaultdict(list)

        for case in db_cases:
            case_date = case.get(date_filed)

            if not case_date:
                continue

            date = timestamp_to_date(case_date)

            if date and GeneralService.is_date_in_range(date, start_date, end_date):
                if "Функціонування АРМ з порушенням вимог Інструкції з організації антивірусного захисту в ІТС МО України та ЗСУ" in case.get(
                        "description", ""):
                    eset_cases[date].append(case)
                else:
                    cases[date].append(case)

        return cases, eset_cases

    @staticmethod
    def calculate_average_cases_per_day(case_dict):
        if not case_dict:
            return 0
        total_cases = GeneralService.count_splited_cases(case_dict)
        return round(total_cases / len(case_dict), 1)

    @staticmethod
    def is_date_in_range(date_to_check, start_date, end_date):
        if end_date and start_date:
            return start_date <= date_to_check <= end_date

        if start_date:
            return start_date <= date_to_check

        if end_date:
            return date_to_check <= end_date

        return True

    @staticmethod
    def fill_missing_dates(case_dict, start_date, end_date):
        if not case_dict:
            return case_dict

        dates = sorted(case_dict.keys())

        if not start_date:
            start_date = dates[0]

        if not end_date:
            end_date = dates[-1]

        filled_dict = defaultdict(list)

        current_date = start_date
        while current_date <= end_date:
            if current_date in case_dict:
                filled_dict[current_date] = case_dict[current_date]
            else:
                filled_dict[current_date] = []
            current_date += timedelta(days=1)
        return filled_dict
