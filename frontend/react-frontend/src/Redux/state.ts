import { configureStore, createSlice  } from "@reduxjs/toolkit";
import {  login, logout, getVacationsStatus, getTotalUsers, getTotalLikes, getCountriesByLikes} from "./reducers";
import { UserModel } from "../Models/UserModel";
import { VacationStatusesModel, VacationTotalUsersModel, VacationTotalLikesModel, CountriesByLikesModel } from "../Models/VacationDataModels";

export type AppState = {
    user: UserModel;
    vacationStatusesData: VacationStatusesModel;
    vacationUsersData: VacationTotalUsersModel;
    vacationLikesData: VacationTotalLikesModel;
    vacationCountryLikesData: CountriesByLikesModel[];
}


const userSlice = createSlice({
    name: "users",
    initialState: null,
    reducers: {login, logout}

});

const vacationStatusesSlice = createSlice({
    name: "vacatioStatusesnData",
    initialState: null,
    reducers: {getVacationsStatus}

})

const vacationTotalUsersSlice = createSlice({
    name: "vacationUsersData",
    initialState: null,
    reducers: {getTotalUsers}

})

const vacationTotalLikesSlice = createSlice({
    name: "vacationLikesData",
    initialState: null,
    reducers: {getTotalLikes}

})

const vacationCountryLikesSlice = createSlice({
    name: "vacationCountryLikesData",
    initialState: null,
    reducers: {getCountriesByLikes}

})
 


export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;

export const vacationStatusesActions = vacationStatusesSlice.actions;
export const vacationStatusesDataReducer = vacationStatusesSlice.reducer;

export const vacationUsersActions = vacationTotalUsersSlice.actions;
export const vacationUsersReducer = vacationTotalUsersSlice.reducer;

export const vacationLikesActions = vacationTotalLikesSlice.actions;
export const vacationLikesReducer = vacationTotalLikesSlice.reducer;

export const vacationCountryLikesActions = vacationCountryLikesSlice.actions;
export const vacationCountryLikesReducer = vacationCountryLikesSlice.reducer;


export const store = configureStore<AppState>({
    reducer: { 
        user: userReducer,
        vacationStatusesData: vacationStatusesDataReducer,
        vacationUsersData: vacationUsersReducer,
        vacationLikesData: vacationLikesReducer,
        vacationCountryLikesData: vacationCountryLikesReducer
    },
    // remove warnings about using a store on a non serializable object
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
});