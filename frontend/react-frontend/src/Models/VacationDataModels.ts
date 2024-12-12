export interface VacationStatusesModel{
    past_vacations: number;
    on_going_vacations: number;
    future_vacations: number;
}

export interface VacationTotalUsersModel{
    total_users: number;
}

export interface VacationTotalLikesModel{
    total_likes: number;
}

export interface CountriesByLikesModel{
    destination: string;
    likes: number;
}