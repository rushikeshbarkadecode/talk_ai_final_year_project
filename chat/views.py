from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import json
from .model import generate

# Create your views here.

def index(request):
    return render(request, 'index.html')


def ask(request):
    if request.method == 'POST':
        try:
            body = request.body
            data = json.loads(body)
            prompt = data['text']
            output = generate.qa_llm({'query': prompt})  
            return JsonResponse({'result': 'success', 'response': output['result']})
        except Exception as e:
            return JsonResponse({'result': 'error', 'message': str(e)})