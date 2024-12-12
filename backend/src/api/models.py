from django.db import models
from django.core import validators
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from utils.role_model import RoleValuesModel
from utils.cyber import Cyber

# Custom user creation
class UserManager(BaseUserManager):

    # Creates a basic user specified from our model
    # Extra fields are present so we can set different permissions to different users
    def create_user(self, email, password, **extra_fields):

        if not email:
            raise ValueError('email is required')
        
        user = self.model(email = email, **extra_fields)
        user.password = Cyber.hash(password)
        user.save()

        return user

    # Create an admin user
    # Only possible from Djangos "create superuser" command and not from normal registration
    def create_superuser(self, email, password, **extra_fields):

        # Set admin fields
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', RolesModel(RoleValuesModel.Admin.value, RoleValuesModel.Admin.name))

        # Make sure our Admin fields are set correctly
        if extra_fields.get('is_staff') is not True:
            raise ValueError('is_staff = True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('is_superuser = True')

        return self.create_user(email, password, **extra_fields)

class CountriesModel(models.Model):
    country_id = models.AutoField(db_column = 'id', primary_key = True)
    country_name = models.CharField(db_column = 'countryName', max_length = 100, validators = (validators.MinLengthValidator(2, "Country name must have at least 2 character"), validators.MaxLengthValidator(100, "Country cannot have a name longer than 100 characters")))  

    class Meta:
        # The managed attribute asks if we allow django to modify our db
        # Because we want to set and change it ourselves we write False
        managed = False
        db_table = 'countries'

class RolesModel(models.Model):
    role_id = models.AutoField(db_column = 'id', primary_key = True)
    role_name = models.CharField(db_column = 'roleName', max_length = 45, validators = (validators.MinLengthValidator(1, "Role name can't be empty"), validators.MaxLengthValidator(45, "Role name can't be empty")))  

    class Meta:
        # The managed attribute asks if we allow django to modify our db
        # Because we want to set and change it ourselves we write False
        managed = False
        db_table = 'roles'

class VacationsModel(models.Model):
    vacations_id = models.AutoField(db_column = 'id', primary_key = True)
    country = models.ForeignKey(CountriesModel, db_column = 'country_id' , on_delete = models.RESTRICT)
    vacation_description = models.CharField(db_column = 'vacationDescription', max_length = 800, validators = (validators.MinLengthValidator(1, "Vacation description can't be empty"), validators.MaxLengthValidator(800, "Vacation description can't be over 800 characters"))) 
    vacation_start_date = models.DateField(db_column = 'vacationStartDate') 
    vacation_end_date = models.DateField(db_column = 'vacationEndDate')  
    vacation_price = models.IntegerField(db_column = 'vacationPrice', validators = (validators.MinValueValidator(0, "Vacation price can't be lower than 0"), validators.MaxLengthValidator(10000, "Vacation price can't be higher than 10,000")))  
    photo_file_name = models.CharField(db_column = 'photoFileName', max_length = 255 , validators = (validators.MinLengthValidator(0, "Photo name can't be empty"), validators.MaxLengthValidator(255, "Photo name can't be more than 255 characters")))  

    class Meta:
        # The managed attribute asks if we allow django to modify our db
        # Because we want to set and change it ourselves we write False
        managed = False
        db_table = 'vacations'

# Our custom user model that our user manager builds from
# Has PermissionsMixin to use the django permission methods and db fields
class UsersModel(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(db_column = 'id', primary_key = True)
    first_name = models.CharField(db_column='firstName', max_length = 45, validators = (validators.MinLengthValidator(1, "First name can't be empty"), validators.MaxLengthValidator(45, "First name can't be over 45 characters")))  
    last_name = models.CharField(db_column='lastName', max_length = 45, validators = (validators.MinLengthValidator(1, "First name can't be empty"), validators.MaxLengthValidator(45, "First name can't be over 45 characters")))  
    email = models.CharField(db_column='email', max_length = 100, validators = (validators.EmailValidator(), ), unique = True)
    password = models.CharField(db_column='password', max_length = 150, validators = (validators.MinLengthValidator(1, "password can't be empty"), validators.MaxLengthValidator(150, "password can't be over 150 characters")))
    # The role is auto set to a user for every form registration
    role = models.ForeignKey(RolesModel, db_column = 'role_id', default = RoleValuesModel.User.value, on_delete = models.RESTRICT)

    # Extra required default fields for the db
    last_login = models.DateTimeField(null = True, blank = True)
    is_active = models.BooleanField(default = True)
    is_admin = models.BooleanField(default = False)
    is_staff = models.BooleanField(default = False)
    is_superuser = models.BooleanField(default = False)

    # By default Django requires a username field
    # We can manually change it here to email to fit our db
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    # Let it use our UserManager to create it
    objects = UserManager()

    class Meta:
        # We want managed=True here to change our database according to Djangos required fields
        # Also for creating superusers
        managed = True
        db_table = 'users'


class LikedVacationsModel(models.Model):
    user_id = models.ForeignKey(UsersModel, db_column = 'user_id', on_delete = models.RESTRICT)
    # If we don't have a primary key in our table Django still requires one
    # We set the vacation_id column as our "primary key" for convenience in one of our views
    vacation_id = models.ForeignKey(VacationsModel, db_column = 'vacation_id', on_delete = models.CASCADE, primary_key = True)

    class Meta:
        # The managed attribute asks if we allow django to modify our db
        # Because we want to set and change it ourselves we write False
        managed = False
        db_table = 'likedvacations'
