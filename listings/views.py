from django.shortcuts import render, HttpResponse, render_to_response


def index(request):
    return render(request, 'listings/index.html')


def login(request):
    return render(request, 'listings/login.html')


def signup(request):
    return render(request, 'listings/signup.html')
