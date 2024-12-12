import axios from "axios";
import { appConfig } from "../Utils/AppConfig";


axios.interceptors.response.use(
    // If the response if a success do nothing and just run it
    response => response, 
    async error => {
      // get our original request
      const originalRequest = error.config; 
      if (error.response.status === 401 && !originalRequest._retry) {
        // Mark the request as retried to avoid infinite loops.
        originalRequest._retry = true; 
        try {
          // Retrieve the stored refresh token.
          const refreshToken = localStorage.getItem('refresh_token'); 
          // Make a request to your auth server to refresh the token.
          const response = await axios.post(appConfig.refreshTokenUrl,
                    {
                        refresh: refreshToken
                    },
                    {
                        headers: {
                          'Content-Type': 'application/json',
                        }
                    }
            );
          const { access, refresh } = response.data;
          // Store the new access and refresh tokens.
          localStorage.setItem('access_token', access);
          localStorage.setItem('refresh_token', refresh);
          // Update the authorization header with the new access token.
          // Also update our original request with the correct authorization and token data
          axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
          originalRequest.data = `{"refresh_token": "${refresh}"}`;
          originalRequest.headers.Authorization = `Bearer ${access}`;
          // Retry the original request with the new data
          return axios(originalRequest);
        }
        catch (refreshError) {
          // Handle refresh token errors by clearing stored tokens
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('first_name');
          localStorage.removeItem('last_name');
          console.clear();
          return Promise.reject(refreshError);
        }
      }
      // For all other errors, return the error as is.
      return Promise.reject(error); 
    }
  );