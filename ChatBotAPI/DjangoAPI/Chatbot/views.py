from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from django.core.files.storage import default_storage

from Chatbot.utils.ChatAIModel import chatAImodel

# Create your views here.
@csrf_exempt
def mirrorApi(request,id=0):
    if request.method=='GET':
        return JsonResponse({"data":"Test Message from API"},safe=False)
    elif request.method=='POST':
        req_data=JSONParser().parse(request)
        return JsonResponse({"data":req_data["data"]},safe=False)
        # return JsonResponse("Failed to Add",safe=False)

@csrf_exempt
def detailsApi(request,id=0):
    if request.method=='GET':
        resp_data={"status":"Active","assignee":"Bot"}
        return JsonResponse(resp_data,safe=False)
    elif request.method=='POST':
        req_data=JSONParser().parse(request)
        resp_data={"status":"Active","assignee":"Bot", "message_char_size":len(req_data["data"]), "message_word_size":len(req_data["data"].split(' '))}
        return JsonResponse(resp_data,safe=False)

@csrf_exempt
def queryApi(request,id=0):
    if request.method=='GET':
        return JsonResponse({"data":"call post request for valid resoponse"},safe=False)
    elif request.method=='POST':
        req_data=JSONParser().parse(request)
        resp_data={"data": chatAImodel.AIChatResp(req_data["data"], req_data["concise"], req_data["friendly"], req_data["formal"])}
        return JsonResponse(resp_data,safe=False)

@csrf_exempt
def answer_question_view(request):
    if request.method == 'POST':
        req_data=JSONParser().parse(request)
        response = chatAImodel.answer_question(req_data["data"], req_data["concise"], req_data["friendly"], req_data["formal"])
        response_data = {'data': response}
        return JsonResponse(response_data)
    else:
        return JsonResponse({'error': 'Invalid request method'})