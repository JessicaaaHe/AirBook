from django.conf.urls import url

from .lib import search
from . import views

urlpatterns = [
    url(r'^json/(?P<keyword>\w+\D{0,1}\w*)/(?P<roomtype>\w+\D{0,1}\w+\D{0,1}\w*)/$', search.search),
    url(r'^$', views.index, name='index'),
    url(r'^search', search.search),
    url(r'^login', views.login),
    url(r'^signup', views.signup)
]
