// All our urls for requests
class DevelopmentConfig {
    public readonly loginUrl = "http://127.0.0.1:8000/api/login/";
    public readonly logoutUrl = "http://127.0.0.1:8000/api/logout/";
    public readonly refreshTokenUrl = "http://127.0.0.1:8000/api/token/refresh/";
    public readonly vacationStatusUrl = "http://127.0.0.1:8000/api/vacation_statuses/";
    public readonly totalUsersUrl = "http://127.0.0.1:8000/api/total_users/";
    public readonly totalLikesUrl = "http://127.0.0.1:8000/api/total_likes";
    public readonly likesByCountryUrl = "http://127.0.0.1:8000/api/likes_by_country/";
}

class ProductionConfig {
    public readonly loginUrl = "http://<Cloud-Url>:8000/api/login/";
    public readonly logoutUrl = "http://<Cloud-Url>:8000/api/logout/";
    public readonly refreshTokenUrl = "http://<Cloud-Url>/api/token/refresh/";
    public readonly vacationStatusUrl = "http://<Cloud-Url>:8000/api/vacation_statuses/";
    public readonly totalUsersUrl = "http://<Cloud-Url>:8000/api/total_users/";
    public readonly totalLikesUrl = "http://<Cloud-Url>:8000/api/total_likes";
    public readonly likesByCountryUrl = "http://<Cloud-Url>:8000/api/likes_by_country/";
}

export const appConfig = new DevelopmentConfig();
// export const appConfig = new ProductionConfig();

