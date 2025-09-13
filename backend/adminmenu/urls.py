from django.contrib import admin
from django.urls import path, include

from rest_framework import routers



urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/generar-menu-ia/', GenerarMenuIAView.as_view(), name='generar_menu_ia'),
    path('', include('rest_framework.urls')), 
    path('api/', include('adminmenu.urls'))
    # path('getCsrf/', get_csrf, name='get_csrf'),
]
