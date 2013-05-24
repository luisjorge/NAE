from django.contrib.gis import admin
from models import Protocolo, Entidades, Arrendatario, Habitacoes, Quartos

class GoogleAdmin(admin.OSMGeoAdmin):
    map_template = 'gis/admin/google.html'
    extra_js = ['https://maps.google.com/maps?file=api&v=3&sensor=false&callback=initialize']

#class HabitacoesAdmin(admin.GoogleAdmin):
#    fields = ['pub_date', 'question']

admin.site.register(Protocolo, GoogleAdmin)
admin.site.register(Entidades, GoogleAdmin)
admin.site.register(Arrendatario, GoogleAdmin)
admin.site.register(Habitacoes, GoogleAdmin)
admin.site.register(Quartos, GoogleAdmin)