import { PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";
import { VacationStatusesModel,  VacationTotalUsersModel, VacationTotalLikesModel, CountriesByLikesModel } from "../Models/VacationDataModels";

// user states
export function login(currentState: UserModel, action:PayloadAction<UserModel>): UserModel{
    const newState = action.payload;
    return newState;
}

export function logout(currentState: UserModel, action:PayloadAction<null>): null{
    return null;
}

// vacation data states

export function getVacationsStatus(currentState:VacationStatusesModel , action: PayloadAction<VacationStatusesModel>): VacationStatusesModel{
    const data = action.payload;

    return data;
}

export function getTotalUsers(currentState:VacationTotalUsersModel , action: PayloadAction<VacationTotalUsersModel>): VacationTotalUsersModel{
    const data = action.payload;

    return data;
}

export function getTotalLikes(currentState:VacationTotalLikesModel , action: PayloadAction<VacationTotalLikesModel>): VacationTotalLikesModel{
    const data = action.payload;

    return data;
}

export function getCountriesByLikes(currentState:CountriesByLikesModel[] , action: PayloadAction<CountriesByLikesModel[]>): CountriesByLikesModel[]{
    const data = action.payload;

    return data;
}


