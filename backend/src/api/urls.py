from django.urls import path
from .views import RegisterUserView, LoginView, LogoutView
from . import views

urlpatterns = [
    path("register/", RegisterUserView.as_view()),
    path("login/", LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path("vacation_statuses/", views.get_vacations_statuses),
    path("total_users/", views.get_total_users),
    path("total_likes/", views.get_total_likes),
    path("likes_by_country/", views.vacation_like_distribution), 
]
