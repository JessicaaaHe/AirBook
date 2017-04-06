from django.shortcuts import render, HttpResponse, render_to_response


def index(request):
    return render(request, 'listings/index.html')
