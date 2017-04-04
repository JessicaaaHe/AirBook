from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    #url(r'^json/(?P<keyword>-?\d*\.{0,1}\d+)/(?P<roomtype>-?\d*\.{0,1}\d+)/$', search.searchByKeyword)
]
