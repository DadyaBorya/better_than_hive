from datetime import datetime, timedelta


def split_dates(start_date: str, end_date: str, max_labels: int = 50):
    start = datetime.strptime(start_date, "%Y-%m-%d")
    end = datetime.strptime(end_date, "%Y-%m-%d")

    if datetime.now() < end:
        end = datetime.now()

    diff_in_days = (end - start).days
    labels = []

    if diff_in_days <= max_labels:
        current = start
        while current <= end:
            labels.append(current.strftime("%Y-%m-%d"))
            current += timedelta(days=1)
    elif diff_in_days <= 365:
        current = start
        while current <= end:
            labels.append(current.strftime("%Y-%m-%d"))
            current += timedelta(weeks=1)
    else:
        current = start
        while current <= end:
            labels.append(current.strftime("%Y-%m-%d"))
            next_month = current.month % 12 + 1
            next_year = current.year + (current.month // 12)
            current = current.replace(year=next_year, month=next_month)

    return labels[:max_labels]
