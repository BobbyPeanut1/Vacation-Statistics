import axios from "axios";
import { CredentialsModel } from "../Models/CredentialsModel";
import { appConfig } from "../Utils/AppConfig";
import { UserModel } from "../Models/UserModel";
import { store, userActions } from "../Redux/state";

class UserService {

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post(appConfig.loginUrl, credentials);

        // clear our previous tokens
        localStorage.clear();

        const token = response.data;

        // setting our tokens and information in our local storage
        localStorage.setItem('access_token', token.access);
        localStorage.setItem('refresh_token', token.refresh);
        localStorage.setItem('first_name', token.first_name);
        localStorage.setItem('last_name', token.last_name);

        // saving data to our store
        const dbUsername = new UserModel(token.first_name, token.last_name);
        const action = userActions.login(dbUsername);
        store.dispatch(action);
        // sends our access token to any request that needs it
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.access}`;
    }

    public async logout(): Promise<void> {

        const refresh_token = localStorage.getItem('refresh_token');
        // Blacklist our refresh token
        // We send it with headers to convert it to a format that the backend can read
        await axios.post(appConfig.logoutUrl,
        {
            refresh_token : refresh_token
        },
        {   
            headers: {
              'Content-Type': 'application/json'
            }
        });
        
        const action = userActions.logout();
        store.dispatch(action);
        // remove our tokens
        localStorage.clear();
        // Remove all authorization from our requests
        axios.defaults.headers.common['Authorization'] = null;

    }


}

export const userService = new UserService();
