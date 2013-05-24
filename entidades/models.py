# -*- coding: UTF-8 -*-

from django.contrib.gis.db import models

class Protocolo(models.Model):
    id=models.AutoField(primary_key=True)
    nome = models.CharField(max_length = 20, blank=False)
    objects = models.GeoManager()
    def __unicode__(self):
        return self.nome
    class Meta:
        db_table = 'protocolo'

class Entidades(models.Model):
    gid = models.AutoField(primary_key=True)
    nome = models.CharField(max_length = 50, blank=False)
    geom = models.PointField("Introduza nova localização", srid=4326)
    telefone = models.CharField(max_length = 15, blank=False)
    protocolo = models.ForeignKey(Protocolo, db_column='id_protocolo')
    morada = models.CharField(max_length = 50, blank=False)
    descricao = models.CharField('descrição', max_length = 200, blank=False)
    objects = models.GeoManager()
    def __unicode__(self):
        return '%s %s %s' % (self.nome, self.geom.x, self.geom.y)
    class Meta:
        verbose_name_plural='Entidades'
        db_table = 'entidades'
    

class Estga(models.Model):
    gid = models.AutoField(primary_key=True)
    the_geom = models.PolygonField(srid=4326) # This field type is a guess.
    objects = models.GeoManager()
    class Meta:
        db_table = 'estga'

class Habitacoes(models.Model):
    gid = models.AutoField(primary_key=True)
    the_geom = models.PointField(srid=4326) # This field type is a guess.
    morada = models.CharField(max_length = 50, blank=False)
    numero = models.IntegerField('número', null=True, blank=True)
    objects = models.GeoManager()
    def __unicode__(self):
        return self.morada
    class Meta:
        verbose_name_plural='Habitações'
        db_table = 'habitacoes'

class Limite(models.Model):
    gid = models.AutoField(primary_key=True)
    objectid = models.IntegerField(null=True, blank=True)
    designacao = models.CharField('designação', max_length=50, blank=True)
    oid_field = models.IntegerField(null=True, db_column='oid_', blank=True) # Field renamed because it ended with '_'.
    observacao = models.CharField('observações', max_length=50, blank=True)
    geom = models.PolygonField(srid=4326) # This field type is a guess.
    objects = models.GeoManager()
    class Meta:
        db_table = 'limite'
        
class Arrendatario(models.Model):
    chave = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=50, blank=True)
    morada = models.CharField(max_length=200, blank=True)
    telefone = models.CharField(max_length=15, blank=True)
    objects = models.GeoManager()
    def __unicode__(self):
        return self.nome
    class Meta:
        verbose_name_plural= "Arrendatários"
        db_table = 'arrendatario'

class Quartos(models.Model):
    id = models.AutoField(primary_key=True)
    chave_arrendatario = models.ForeignKey(Arrendatario, db_column='chave')
    tipo = models.CharField(max_length=10, blank=True)
    num_total = models.IntegerField('número de quartos', null=False, blank=False)
    num_livres = models.IntegerField('número de quartos livres', null=False, blank=False)
    responsavel = models.CharField(max_length=200, blank=False)
    andar = models.CharField(max_length=20, blank=False)
    objects = models.GeoManager()
    def __unicode__(self):
        return self.responsavel, self.andar, self.tipo, self.num_total, self.num_livres
    class Meta:
        verbose_name_plural='Quartos'
        db_table = 'quartos'

class Utilizador(models.Model):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=50, blank=True)
    senha = models.CharField(max_length=10, blank=True)
    class Meta:
        db_table = 'utilizador'
