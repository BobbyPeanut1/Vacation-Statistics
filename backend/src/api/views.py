from django.contrib.auth import get_user_model
from django.http import JsonResponse
from rest_framework import exceptions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import RegisterUserSerializer, VacationSerializer, LikesVacationsSerializer, CountriesSerializer, RolesSerializer
from .models import UsersModel, VacationsModel, CountriesModel, LikedVacationsModel
from utils.cyber import Cyber
from utils.role_model import RoleValuesModel
from utils.helper_functions import vacations_to_statuses_dictionary, countries_by_vacation_likes


class RegisterUserView(CreateAPIView):

    # Register according to our set user model and Registration Serializer
    queryset = get_user_model().objects.all()
    permission_classes = (AllowAny, )
    serializer_class = RegisterUserSerializer

class LoginView(APIView):

    def post(self, request):
        try:
            email = request.data.get('email')
            password = request.data.get('password')


            if email is None:
                raise exceptions.AuthenticationFailed('You must enter an email!')
            if password is None:
                raise exceptions.AuthenticationFailed('You must enter a password!')
            

            user = get_user_model().objects.filter(email = email).first()
            if user is None:
                raise exceptions.AuthenticationFailed('User not found!')
            
            if user.password != Cyber.hash(password):
                raise exceptions.AuthenticationFailed('Incorrect Password!')

            # If all the user data is valid create a refresh token for it
            refresh = RefreshToken.for_user(user)

            # Return a Json we can read with axios in our frontend
            return JsonResponse(
                {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                }
            )
        
        except exceptions.AuthenticationFailed as err:
            json = { "error": str(err) }
            return Response(json, status = err.status_code)
        except Exception as err: 
            json = { "error": str(err) }
            return Response(json, status = status.HTTP_500_INTERNAL_SERVER_ERROR)
    
         

class LogoutView(APIView):
        
        # Must be already logged in to logout
        permission_classes = (IsAuthenticated, )


        # It doesn't seem to be possible to delete the access token on logout
        # We can however blacklist the refresh token so we can't get new access tokens
        # That way we insure that after the access token is expired we can't just get a new one
        def post(self, request):
            try:
                refresh_token = request.data["refresh_token"]
                token = RefreshToken(refresh_token)
                token.blacklist()
                return Response("Successfully logged out", status=status.HTTP_205_RESET_CONTENT)
            except Exception as err: 
                json = { "error": str(err) }
                return Response(json, status = status.HTTP_500_INTERNAL_SERVER_ERROR)


def check_is_not_admin(user):
    user_role_id = RolesSerializer(user.role).data["role_id"]
    if user_role_id != RoleValuesModel.Admin.value:
        raise exceptions.PermissionDenied
    

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_vacations_statuses(request):
    try:

        # Check if the user is an admin else he can't access this data
        user = request.user
        check_is_not_admin(user)

        vacations = VacationsModel.objects.all()
        serializer = VacationSerializer(vacations, many = True)

        vacation_statuses = vacations_to_statuses_dictionary(serializer.data)

        return Response(vacation_statuses)

    except exceptions.PermissionDenied as err:
        json = { "error": str(err) }
        return Response(json, status = err.status_code)
    except Exception as err: 
        json = { "error": str(err) }
        return Response(json, status = status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_total_users(request):
    try:

        # Check if the user is an admin else he can't access this data
        user = request.user
        check_is_not_admin(user)

        sql = "SELECT * FROM third_project_db.users;"
        users = {"total_users": 0}

        for user in UsersModel.objects.raw(sql):
            users["total_users"] += 1

        return Response(users)
    
    except exceptions.PermissionDenied as err:
        json = { "error": str(err) }
        return Response(json, status = err.status_code)
    except Exception as err: 
        json = { "error": str(err) }
        return Response(json, status = status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_total_likes(request):
    try:

        # Check if the user is an admin else he can't access this data
        user = request.user
        check_is_not_admin(user)

        sql = "SELECT user_id as id FROM third_project_db.likedvacations;"
        vacation_likes = {"total_likes": 0}

        for user in UsersModel.objects.raw(sql):
            vacation_likes["total_likes"] += 1

        return Response(vacation_likes)
    
    except exceptions.PermissionDenied as err:
            json = { "error": str(err) }
            return Response(json, status = err.status_code)
    except Exception as err: 
            json = { "error": str(err) }
            return Response(json, status = status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def vacation_like_distribution(request):
    try:

        # Check if the user is an admin else he can't access this data
        user = request.user
        check_is_not_admin(user)

        liked_vacations = LikedVacationsModel.objects.all()
        vacation_list = VacationsModel.objects.all()
        country_list = CountriesModel.objects.all()

        likes_serializer = LikesVacationsSerializer(liked_vacations, many = True)
        vacations_serializer = VacationSerializer(vacation_list, many = True)
        country_serializer = CountriesSerializer(country_list, many = True)

        like_amount_per_country = countries_by_vacation_likes(likes_serializer.data, vacations_serializer.data, country_serializer.data)

        return Response(like_amount_per_country)

    except exceptions.PermissionDenied as err:
            json = { "error": str(err) }
            return Response(json, status = err.status_code)
    except Exception as err: 
            json = { "error": str(err) }
            return Response(json, status = status.HTTP_500_INTERNAL_SERVER_ERROR)

