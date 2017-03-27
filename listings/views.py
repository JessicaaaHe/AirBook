from django.shortcuts import render
# Create your views here.


def index(request):
    keyword, roomtype = request.GET.get('keyword'), request.GET.get('roomtype')
    if keyword and roomtype:
        print(keyword, roomtype)
    return render(request, 'listings/index.html')
