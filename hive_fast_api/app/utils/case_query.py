import copy
from typing import Optional

query = {
    "query": [
        {
            "_name": "listCase"
        },
    ]
}


# ХУЙНЯ ВПАДЛО ДУМАТЬ ПУСТЬ БУДЕТ ТАК
def create_case_query(
        sort=True,
        limited_count=False,
        like_av=True,
        end_date=None,
        assignee=None,
        created_at: (Optional[int], Optional[int]) = None,
        status: str = None,
        all: bool = False,
        like_title: str = None
):
    q = copy.deepcopy(query)

    if all:
        q["query"].append(
            {
                "_name": "filter",
                "_field": "assignee",
                "_value": assignee
            }
        )
        return q

    add_filter(q)

    if sort:
        q = add_sort(q)

    if limited_count:
        q = add_limited_count(q)

    if assignee:
        q = add_assignee(q, assignee)

    if created_at:
        q = add_created_at(q, created_at[0], created_at[1])

    if end_date:
        q = add_end_at(q, end_date[0], end_date[1])

    if like_av:
        q = add_like_av(q)

    if like_title:
        q = add_like_title(q, like_title)

    if status:
        q = add_status(q, status)

    return q


def add_like_title(q, title):
    q["query"][1]["_and"].append(
        {
            "_like": {
                "_field": "title",
                "_value": title
            }
        })

    return q


def add_status(q, status):
    q["query"][1]["_and"].append(
        {
            "_field": "status",
            "_value": status
        })

    return q


def add_like_av(q):
    q["query"][1]["_and"].append({
        "_like": {
            "_field": "summary",
            "_value": "АВПЗ встановлено"
        }
    })

    return q


def add_assignee(q, assignee):
    q["query"][1]["_and"].append({
        "_field": "assignee",
        "_value": assignee
    })

    return q


def add_created_at(q, _from, to):
    q["query"][1]["_and"].append({
        "_between": {
            "_field": "_createdAt",
            "_from": _from,
            "_to": to
        }
    })

    return q


def add_end_at(q, _from, to):
    q["query"][1]["_and"].append({
        "_between": {
            "_field": "endDate",
            "_from": _from,
            "_to": to
        }
    })

    return q


def add_filter(q):
    q["query"].append({
        "_name": "filter",
        "_and": [
        ]
    })

    return q


def add_limited_count(q):
    q["query"].append({
        "_name": "limitedCount"
    })

    return q


def add_sort(q):
    q["query"].append({
        "_name": "sort",
        "_fields": [
            {
                "flag": "desc"
            },
            {
                "startDate": "desc"
            }
        ]
    })

    return q
