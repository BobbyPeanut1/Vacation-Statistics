import axios from "axios";
import { CredentialsModel } from "../Models/CredentialsModel";
import { appConfig } from "../Utils/AppConfig";
import { CountriesByLikesModel, VacationStatusesModel, VacationTotalLikesModel, VacationTotalUsersModel } from "../Models/VacationDataModels";
import { store, vacationStatusesActions,  vacationUsersActions, vacationLikesActions, vacationCountryLikesActions} from "../Redux/state";



class VacationDataService {

    public async getVacationStatus(): Promise<VacationStatusesModel> {
        
        // If we already got the data no need for an additional request
        if (store.getState().vacationStatusesData){
            return store.getState().vacationStatusesData;
        }

        // temporarily get admin data to get a request from the backend
        const {REACT_APP_ADMIN_EMAIL, REACT_APP_ADMIN_PASSWORD} = process.env;
        const adminUser = new CredentialsModel(REACT_APP_ADMIN_EMAIL, REACT_APP_ADMIN_PASSWORD);
        let response = await axios.post(appConfig.loginUrl, adminUser);
        let token = response.data;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.access}`;

        response = await axios.get(appConfig.vacationStatusUrl);
        token = localStorage.getItem('access_token');
        // return our user authorization
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;



        store.dispatch(vacationStatusesActions.getVacationsStatus(response.data));
        return response.data;
    }

    public async getTotalUsers(): Promise<VacationTotalUsersModel> {

        // If we already got the data no need for an additional request
        if (store.getState().vacationUsersData){
            return store.getState().vacationUsersData;
        }

        // temporarily get admin data to get a request from the backend
        const {REACT_APP_ADMIN_EMAIL, REACT_APP_ADMIN_PASSWORD} = process.env;
        const adminUser = new CredentialsModel(REACT_APP_ADMIN_EMAIL, REACT_APP_ADMIN_PASSWORD);
        let response = await axios.post(appConfig.loginUrl, adminUser);
        let token = response.data;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.access}`;

        
        response = await axios.get(appConfig.totalUsersUrl);
        token = localStorage.getItem('access_token');
        // return our user authorization
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;


        store.dispatch(vacationUsersActions.getTotalUsers(response.data));
        return response.data;
    }

    public async getTotalLikes(): Promise<VacationTotalLikesModel> {

        // If we already got the data no need for an additional request
        if (store.getState().vacationLikesData){
            return store.getState().vacationLikesData;
        }

        // temporarily get admin data to get a request from the backend
        const {REACT_APP_ADMIN_EMAIL, REACT_APP_ADMIN_PASSWORD} = process.env;
        const adminUser = new CredentialsModel(REACT_APP_ADMIN_EMAIL, REACT_APP_ADMIN_PASSWORD);
        let response = await axios.post(appConfig.loginUrl, adminUser);
        let token = response.data;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.access}`;

        
        response = await axios.get(appConfig.totalLikesUrl);
        token = localStorage.getItem('access_token');
        // return our user authorization
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;


        store.dispatch(vacationLikesActions.getTotalLikes(response.data));
        return response.data;
    }

    public async getLikesByCountry(): Promise<CountriesByLikesModel[]> {
        
        // If we already got the data no need for an additional request
        if (store.getState().vacationCountryLikesData){
            return store.getState().vacationCountryLikesData;
        }

        // temporarily get admin data to get a request from the backend
        const {REACT_APP_ADMIN_EMAIL, REACT_APP_ADMIN_PASSWORD} = process.env;
        const adminUser = new CredentialsModel(REACT_APP_ADMIN_EMAIL, REACT_APP_ADMIN_PASSWORD);
        let response = await axios.post(appConfig.loginUrl, adminUser);
        let token = response.data;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.access}`;

        
        response = await axios.get(appConfig.likesByCountryUrl);
        token = localStorage.getItem('access_token');
        // return our user authorization
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        store.dispatch(vacationCountryLikesActions.getCountriesByLikes(response.data));
        return response.data;
    }



}

export const vacationDataService = new VacationDataService();