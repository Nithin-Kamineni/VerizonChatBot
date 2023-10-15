from django.urls import path
from Chatbot import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('mirror', views.mirrorApi),
    path('details', views.detailsApi),
    path('query', views.queryApi),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
