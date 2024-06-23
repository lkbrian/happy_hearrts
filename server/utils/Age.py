from datetime import  date


def calculate_age( Date_Of_birth):
    if Date_Of_birth < date.today():
        birth_date = Date_Of_birth
        current_date = date.today()
        years = current_date.year - birth_date.year
        months = current_date.month - birth_date.month
        days = current_date.day - birth_date.day

        if months < 0 or (months == 0 and days < 0):
            years -= 1
            if months < 0:
                months += 12
            else:
                months = 11
            if days < 0:
                days += 30

        weeks = days // 7
        days %= 7

        return years, months, weeks, days
    else:
        print("\033[91m Enter a past date \033[0m")
