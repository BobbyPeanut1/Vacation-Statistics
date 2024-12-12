from dotenv import load_dotenv
from os import environ

load_dotenv()

class AppConfig:
    mysql_host = environ.get("MYSQL_HOST")
    mysql_user = environ.get("MYSQL_USER")
    mysql_password = environ.get("MYSQL_PASSWORD")
    mysql_database = environ.get("MYSQL_DATABASE")
    password_salt = environ.get("PASSWORD_SALT")  