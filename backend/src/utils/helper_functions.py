import datetime

# vacation status functions
def check_vacation_status(vacation_start_date, vacation_end_date):

    todays_date = datetime.datetime.today()
    # convert str to a datetime object for date checking
    vacation_start_date_datetime = datetime.datetime.strptime(vacation_start_date, '%Y-%m-%d')
    vacation_end_date_datetime = datetime.datetime.strptime(vacation_end_date, '%Y-%m-%d')


    if vacation_end_date_datetime < todays_date:
        return "past_vacations"
    if vacation_start_date_datetime <= todays_date and vacation_end_date_datetime >= todays_date:
        return "on_going_vacations"
    
    return "future_vacations"


def vacations_to_statuses_dictionary(vacations):
    vacation_list = vacations

    vacations_status = {"past_vacations": 0, "on_going_vacations": 0, "future_vacations": 0}

    for vacation in vacation_list:
        vacations_status[check_vacation_status(vacation["vacation_start_date"], vacation["vacation_end_date"])] += 1

    return vacations_status

# Country likes functions

# Return a dict with the vacation number as a key and the amount of likes as a value
def liked_vacation_to_like_amount_dict(liked_vacations):
    
    like_amount_per_vacation = {}
    for liked_vacation in liked_vacations:
        if liked_vacation["vacation_id"] not in like_amount_per_vacation.keys():
            like_amount_per_vacation[liked_vacation["vacation_id"]] = 1
        else:
            like_amount_per_vacation[liked_vacation["vacation_id"]] += 1

    return like_amount_per_vacation

# Return a dict with the country id as a key and amount of likes as a value
def like_amount_per_vacation_to_country_id_like_amount_dict(like_amount_per_vacation, vacations):
    country_id_like_amount = {}
    for key in like_amount_per_vacation.keys():
        for vacation in vacations:
            if vacation["vacations_id"] == key:
                # if we haven't seen likes for this country yet
                if vacation["country"] not in country_id_like_amount.keys(): 
                    country_id_like_amount[vacation["country"]] = like_amount_per_vacation[key]
                # if there was already another vacation in that country we add the likes here
                else: 
                    country_id_like_amount[vacation["country"]] += like_amount_per_vacation[key]
                # finish the loop because we found the corresponding vacation to its id
                break

    return country_id_like_amount

# Return a list of dicts where every dict has a destination and amount of likes
def country_id_like_amount_dict_to_country_like_amount_list_of_dicts(country_id_like_amount, countries):
    
    country_like_amount = []
    for key in country_id_like_amount.keys():
        for country in countries:
            if country["country_id"] == key:
                country_likes = {"destination" : country["country_name"], "likes" : country_id_like_amount[key]}
                country_like_amount.append(country_likes)
                # finish the loop because we found the corresponding country to its id
                break

    return country_like_amount

def countries_by_vacation_likes(liked_vacations, vacations, countries):

    like_amount_per_vacation = liked_vacation_to_like_amount_dict(liked_vacations)
    country_id_like_amount = like_amount_per_vacation_to_country_id_like_amount_dict(like_amount_per_vacation, vacations)
    like_amount_per_country = country_id_like_amount_dict_to_country_like_amount_list_of_dicts(country_id_like_amount, countries)

    return like_amount_per_country

        
    
