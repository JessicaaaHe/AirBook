from django.shortcuts import render


def index(request):
    return render(request, 'listings/index.html')

def login(request):
    return render(request, 'listings/login.html')

def signup(request):
    return render(request, 'listings/signup.html')
