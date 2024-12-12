
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator
from rest_framework import serializers
from .models import CountriesModel, RolesModel, VacationsModel, UsersModel, LikedVacationsModel
from utils.cyber import Cyber

# Serialize a register form for our user
# We make sure only fields that we want them to have access too can be filled
# Any other field they try to pass as a raw json will not be accepted
class RegisterUserSerializer(serializers.ModelSerializer):

    # Email and password are our 2 default and required fields

    # making sure our email is not already used by someone
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=get_user_model().objects.all())])
    
    # Making sure our password is valid with Django's internal checks
    password = serializers.CharField(write_only = True, required=True, validators = [validate_password])

    class Meta:
        model = get_user_model()
        fields = ('email', 'password', 'first_name', 'last_name')
        extra_kwargs = {
            'password': {'write_only': True, 'min_length': 8},
            'first_name': {'required': True},
            'last_name': {'required': True}
        }
    
    def create(self, validated_data):

        # Create a new user from our form and save it to our db
        # The password is encrypted with our custom hasher
        user = self.Meta.model.objects.create(
            email = validated_data['email'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            password = Cyber.hash(validated_data['password']),
        )
        
        user.save()

        return user


# Serializing our data tables and fields that correspond to vacation data
# Not all are used but if we want to expand to get more information we can easily get it from these serializers
class UserDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = UsersModel
        fields = ("id", "first_name", "last_name", "email", "password", "role")

class CountriesSerializer(serializers.ModelSerializer):

    class Meta:
        model = CountriesModel
        fields = "__all__"

class RolesSerializer(serializers.ModelSerializer):

    class Meta:
        model = RolesModel
        fields = "__all__"

class VacationSerializer(serializers.ModelSerializer):

    class Meta:
        model = VacationsModel
        fields = "__all__"

class LikesVacationsSerializer(serializers.ModelSerializer):

    class Meta:
        model = LikedVacationsModel
        fields = "__all__"
