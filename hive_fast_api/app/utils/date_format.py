from datetime import date, datetime


def date_to_timestamp_ms_min(date_obj: date) -> int:
    datetime_obj_min = datetime.combine(date_obj, datetime.min.time())

    timestamp_ms_min = int(datetime_obj_min.timestamp() * 1000)
    return timestamp_ms_min


def date_to_timestamp_ms_max(date_obj: date) -> int:
    datetime_obj_max = datetime.combine(date_obj, datetime.max.time())

    timestamp_ms_max = int(datetime_obj_max.timestamp() * 1000)
    return timestamp_ms_max


def timestamp_to_date(timestamp):
    return datetime.fromtimestamp(timestamp / 1000).date()
