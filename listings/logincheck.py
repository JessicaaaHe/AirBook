from django.http import HttpResponse


def checklogin(request,username,password):
    ''' database check'''
    response = HttpResponse(content_type="application/text");
    return response;


def check_user_coantains(request, username):
    """check if current username has been resistered"""
    response = HttpResponse(content_type="application/text");
    return response;

def check_email_contains(request, email):
    response = HttpResponse(content_type="applications/text");
    return response;