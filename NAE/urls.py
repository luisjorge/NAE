from django.conf.urls import patterns, include, url
from django.conf import settings
from django.contrib import admin

from NAE.views import listar_protocolos
from NAE.views import getlonlat
from NAE.views import getprotocolopopup
from NAE.views import getquarto


# Import custom modules

admin.autodiscover()

urlpatterns = patterns('',                 
    # Examples:
    # url(r'^$', 'Nae.views.home', name='home'),
    # url(r'^Nae/', include('Nae.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
     (r'^admin/', include(admin.site.urls)),
     (r'^$', 'NAE.views.index'),
     (r'^listar_protocolos/$', listar_protocolos),
     (r'^getlonlat/$',getlonlat),
     (r'^getprotocolopopup/$',getprotocolopopup),
     (r'^getnearentidades/$',getprotocolopopup),
     (r'^getquartos/$',getquarto),
     (r'^accounts/', include('registration.urls')),
     (r'^static/admin/(?P<path>.*)$', 'django.views.static.serve'),
     )

ACCOUNT_ACTIVATION_DAYS=7
EMAIL_HOST='localhost'
EMAIL_PORT=1023
EMAIL_HOST_USER='username'
EMAIL_HOST_PASSWORD='password'


urlpatterns += patterns('',
    (r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
)


if settings.DEBUG:
    urlpatterns += patterns('django.contrib.staticfiles.views',
        url(r'^static/(?P<path>.*)$', 'serve'),
    )