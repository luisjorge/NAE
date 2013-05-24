# Create your views here.
from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.core import serializers
from django.utils import simplejson

from django.contrib.gis.measure import D

from entidades.models import Protocolo
from entidades.models import Entidades
from entidades.models import Quartos

#from django.contrib.gis.geos import Point

def index(request):
    'Apresenta Mapa'
    return render_to_response('index.html')
    

def listar_protocolos(request):
    lista_protocolo = Protocolo.objects.all()
    data = '{"total": %s, "%s": %s}' % \
    (lista_protocolo.count(), 'data', serializers.serialize('json', lista_protocolo))
    return HttpResponse(data, mimetype='application/json')

def getlonlat(request):
    
    # Ensure variable is defined
    try:
        chave1 = request.POST.get('gid')
    except NameError:
        chave1 = None
# Test whether variable is defined to be None
    if chave1 is None:
        chave1 = ''
    else:
        chave1 = chave1

    if request.POST.get('table') == "habitacoes":   
        campo1 = 'the_geom'
        layer = 'habitacoes'
    else:
        campo1 = 'geom'
        campo2 = 'geom'
        #campo = "%"+campo+"%"       
        layer = 'Entidades'
        #layer = "%"+layer.replace("%","%%")+"%"

    '''Exemplo com raw query
    #dados = Entidades.objects.raw("""SELECT st_x(%s) AS longitude, st_y(%s) AS latitude FROM entidades WHERE gid = %s;""",[campo, campo,gid])
    #query = "Select gid, geom FROM %s WHERE gid = %s" % (layer,chave1)
    #po = Point(dados.geom.x, dados.geom.y)
    #dados = Entidades.objects.raw(query)
    #listadados = list(dados)
    #dadosjson = '{%s, %s}' % dados.geom.x, dados.geom.y
    
    #dadosjson = serializers.serialize('json', dados)
    #return HttpResponse(dadosjson, mimetype='application/json')'''
    dados = Entidades.objects.get(gid = chave1)

    
    return HttpResponse(simplejson.dumps({'long': dados.geom.x, 
                                          'lat': dados.geom.y,
                                          'id': dados.gid}), 
                        mimetype='application/json')
    
    
def getprotocolopopup(request):
    
    # Ensure variable is defined
    try:
        chave1 = request.POST.get('id')
    except NameError:
        chave1 = None
# Test whether variable is defined to be None
    if chave1 is None:
        chave1 = ''
    else:
        chave1 = chave1

    if request.POST.get('table') == "habitacoes":   
        campo1 = 'the_geom'
        layer = 'habitacoes'
    else:
        campo1 = 'geom'
        campo2 = 'geom'
        #campo = "%"+campo+"%"       
        layer = 'Entidades'
        #layer = "%"+layer.replace("%","%%")+"%"

    #Exemplo com raw query
    #dados = Entidades.objects.raw("""SELECT st_x(%s) AS longitude, st_y(%s) AS latitude FROM entidades WHERE gid = %s;""",[campo, campo,gid])
    #query = "Select gid, geom FROM %s WHERE gid = %s" % (layer,chave1)
    #po = Point(dados.geom.x, dados.geom.y)
    #dados = Entidades.objects.raw(query)
    #listadados = list(dados)
    #dadosjson = '{%s, %s}' % dados.geom.x, dados.geom.y
    
    #dadosjson = serializers.serialize('json', dados)
    #return HttpResponse(dadosjson, mimetype='application/json')'''
    dados = Entidades.objects.get(gid = chave1)

    return HttpResponse(simplejson.dumps({'nome': dados.nome}), 
                        mimetype='application/json')
    
def getquarto(request):
    
    # Ensure variable is defined
    try:
        chave1 = request.POST.get('id')
    except NameError:
        chave1 = None
# Test whether variable is defined to be None
    if chave1 is None:
        chave1 = ''
    else:
        chave1 = chave1

 
    dados = Quartos.objects.filter(id = chave1)
    contagem = Quartos.objects.filter(id = chave1).count()
    data = '{"total": %s, "%s": %s}' % \
    (contagem, 'data', serializers.serialize('json', dados))
    return HttpResponse(data, mimetype='application/json')


def getnearentidades(request):
    
    # Ensure variable is defined
    try:
        var_morada = request.POST.get('morada')
    except NameError:
        var_morada = None
# Test whether variable is defined to be None
    if var_morada is None:
        var_morada = ''
    else:
        var_morada = var_morada
        
        # Ensure variable is defined
    try:
        var_raio = request.POST.get('raio')
    except NameError:
        var_raio = None
# Test whether variable is defined to be None
    if var_raio is None:
        var_raio = ''
    else:
        var_raio = var_raio
    
    lista = Entidades.objects.filter(morada = var_morada)
    #dados = Entidades.objects.filter(point__dwithin=(geom, D(m=raio))).orderby('nome')
    contagem = lista.count()
    
    data = '{"total": %s, "%s": %s}' % \
    (contagem, 'data', serializers.serialize('json', lista))
    return HttpResponse(data, mimetype='application/json')