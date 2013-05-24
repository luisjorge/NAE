Ext.onReady(function() {

Ext.Ajax.disableCaching = false;


$(document).ajaxSend(function(event, xhr, settings) {
	  function getCookie(name) {
	    var cookieValue = null;

	    if (document.cookie && document.cookie != '') {
	      var cookies = document.cookie.split(';');

	      for (var i = 0; i < cookies.length; i++) {
	        var cookie = jQuery.trim(cookies[i]);

	        // Does this cookie string begin with the name we want?
	        if (cookie.substring(0, name.length + 1) == (name + '=')) {
	          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	          break;
	        }
	      }
	    }

	    return cookieValue;
	  }

	  function sameOrigin(url) {
	    // url could be relative or scheme relative or absolute
	    var host = document.location.host;
	    // host + port
	    var protocol = document.location.protocol;
	    var sr_origin = '//' + host;
	    var origin = protocol + sr_origin;

	    // Allow absolute or scheme relative URLs to same origin
	    return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
	           (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
	           // or any other URL that isn't scheme relative or absolute i.e relative.
	           !(/^(\/\/|http:|https:).*/.test(url));
	  }

	  function safeMethod(method) {
	    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	  }

	  if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
	    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
	  }
	}); 



////////////////////////////////////////////////////////////////////////////////
/* variáveis */
////////////////////////////////////////////////////////////////////////////////

	// gisforcloud
	//var wms = "http://localhost/geoserver/wms";
	//var wfs = "http://localhost/geoserver/wfs";

	// localhostt
	var wms = "http://localhost/geoserver/wms";
	var wfs = "http://localhost/geoserver/wfs";

	// proxy
	OpenLayers.ProxyHost = "apache/cgi-bin/proxy.cgi?url=";

	var workspace = "grupo7";
	var layer_entidade = "entidades";
	var layer_limite = "limite";
	var layer_habitacao = "habitacoes";
	var layer_estga = "estga";

	var WGS84 = new OpenLayers.Projection("EPSG:4326");
	var WGS84_google_mercator = new OpenLayers.Projection("EPSG:900913");
	var Militar = new OpenLayers.Projection("EPSG:20790");

	var bounds = new OpenLayers.Bounds(-8.44802, 40.565089, -8.443208, 40.581273).transform(WGS84, WGS84_google_mercator);

	var dialog_entidade, dialog_habitacao;
////////////////////////////////////////////////////////////////////////////////
/* mapas openlayers */
////////////////////////////////////////////////////////////////////////////////

	// mapas open street maps
	var osm = new OpenLayers.Layer.OSM();

	// mapas google
	var gphy = new OpenLayers.Layer.Google(
		"Google Physical",
		{type:google.maps.MapTypeId.TERRAIN}
	);
	var gmap = new OpenLayers.Layer.Google(
		"Google Streets",
		{numZoomLevels:20}
	);
	var ghyb = new OpenLayers.Layer.Google(
		"Google Hybrid",
		{type:google.maps.MapTypeId.HYBRID, numZoomLevels:20}
	);
	var gsat = new OpenLayers.Layer.Google(
		"Google Satellite",
		{type:google.maps.MapTypeId.SATELLITE, numZoomLevels:22}
	);

	// mapas bing
	var apiKey = "AqTGBsziZHIJYYxgivLBf0hVdrAk9mWO5cQcb8Yux8sW5M8c8opEC2lZqKR1ZZXf";
	var road = new OpenLayers.Layer.Bing({
		name:"Bing Road",
		key:apiKey,
		type:"Road"
	});
	var hybrid = new OpenLayers.Layer.Bing({
		name:"Bing Hybrid",
		key:apiKey,
		type:"AerialWithLabels"
	});
	var aerial = new OpenLayers.Layer.Bing({
		name:"Bing Aerial",
		key:apiKey,
		type:"Aerial"
	});



////////////////////////////////////////////////////////////////////////////////
/* estilos */
////////////////////////////////////////////////////////////////////////////////

var estilo1 = new OpenLayers.StyleMap({
"default":new OpenLayers.Style({
pointRadius:15,
externalGraphic:"static/imagens/info.png"
}),
"select":new OpenLayers.Style({
pointRadius:20
})
});

var estilo2 = new OpenLayers.StyleMap({
"default":new OpenLayers.Style({
pointRadius:15,
externalGraphic:"static/imagens/home.png"
}),
"select":new OpenLayers.Style({
pointRadius:20
})
});

////////////////////////////////////////////////////////////////////////////////
/* strategies */
////////////////////////////////////////////////////////////////////////////////

var save_strategy = new OpenLayers.Strategy.Save();

////////////////////////////////////////////////////////////////////////////////
/* layers */
////////////////////////////////////////////////////////////////////////////////


// layer wfs entidades

var wfs_entidade = new OpenLayers.Layer.Vector("Entidades", {
styleMap:estilo1,
strategies:[new OpenLayers.Strategy.Fixed(), save_strategy],
protocol:new OpenLayers.Protocol.WFS({
url:wfs,
featureType:layer_entidade,
featurePrefix:workspace,
srsName:WGS84_google_mercator,
version:"1.1.0"
})
});

//layer wfs habitacoes
var wfs_habitacao = new OpenLayers.Layer.Vector("Habita��es", {
	styleMap:estilo2,
	strategies:[new OpenLayers.Strategy.Fixed(), save_strategy],
	protocol:new OpenLayers.Protocol.WFS({
		url:wfs,
		featureType:layer_habitacao,
		featurePrefix:workspace,
		srsName:WGS84_google_mercator,
		version:"1.1.0"
	})
});

	
	// layer wms estga
	var wms_estga = new OpenLayers.Layer.WMS("ESTGA", wms, {
			layers:workspace + ":" + layer_estga,
			transparent:true
		},
		{singleTile:true}
	);

	// layer wms limite
	var wms_limite = new OpenLayers.Layer.WMS("Limite", wms, {
			layers:workspace + ":" + layer_limite,
			transparent:true
		},
		{singleTile:true}
	);
	

	/** eventos **/

	// entidades
	wfs_entidade.events.on({
		"featureselected":function(e){
			on_select_ponto(e.feature);
			get_lat_lon(e.feature, "entidade");
			popup_entidade(e.feature);
		},
		"featureunselected":function(){
			on_unselect_entidade();
		}
	});	
	
	// habitacoes
	wfs_habitacao.events.on({
		"featureselected":function(e){
			on_select_ponto(e.feature);
			get_lat_lon(e.feature, "habitacao");
			popup_habitacao(e.feature);
		},
		"featureunselected":function(){
			on_unselect_habitacao();
		}
	});
	
////////////////////////////////////////////////////////////////////////////////
	/* controls */
	////////////////////////////////////////////////////////////////////////////////

		// select control
		var select_control = new OpenLayers.Control.SelectFeature([wfs_entidade, wfs_habitacao], {
			clickout:true,
			toggle:true,
			multiple:false,
			hover:false
		});

		// modify control
		var mc_entidade = new OpenLayers.Control.ModifyFeature(wfs_entidade, {
			mode: OpenLayers.Control.ModifyFeature.DRAG
		});
		
		var mc_habitacao = new OpenLayers.Control.ModifyFeature(wfs_habitacao, {
			mode: OpenLayers.Control.ModifyFeature.DRAG
		});
		
		// draw control
		var dc_entidade = new OpenLayers.Control.DrawFeature(wfs_entidade, OpenLayers.Handler.Point);
		var dc_habitacao = new OpenLayers.Control.DrawFeature(wfs_habitacao, OpenLayers.Handler.Point);	
		
		////////////////////////////////////////////////////////////////////////////////
/* configurações do mapa */
////////////////////////////////////////////////////////////////////////////////


	
	// opções do mapa
	var map_options = {
		controls:[
			new OpenLayers.Control.LayerSwitcher(),
			new OpenLayers.Control.Navigation(),
			new OpenLayers.Control.PanZoom(),
			select_control, mc_entidade, mc_habitacao, dc_entidade, dc_habitacao
		],
		layers:[osm, gphy, gmap, ghyb, gsat, road, hybrid, aerial,wms_estga,wfs_entidade,wfs_habitacao],
	//	layers:[osm, gphy, gmap, ghyb, gsat, road, hybrid, aerial],
		maxExtent:bounds,
		projection:WGS84_google_mercator
	};

	// criação do mapa
	var map = new OpenLayers.Map("map", map_options);

	// zoom do mapa
	map.zoomToExtent(bounds);

	// animação no zoom (google maps)
	for (var i = map.layers.length - 1; i >= 0; -- i) {
		map.layers[i].animationEnabled = this.checked;
	}
	
	
	
	/** barra do mapa **/

	var barra_painel_mapa = new Ext.Toolbar({
		id:"barra_painel_mapa",
		items:[]
	});

	var ctrl, toolbarItems = [], action, actions = {};

	// zoom-to-max-extent
	var zoomButton = new Ext.Button({
		cls:"x-btn-icon",
		icon:"static/imagens/reset.png",
		tooltip:"Zoom geral",
		handler:function(){
			map.zoomToExtent(bounds);
			map.zoomTo(17);
		}
	});
	
	// zoom in
	action = new GeoExt.Action({
		 control:new OpenLayers.Control.ZoomBox(),
		 tooltip:"Aumentar zoom no rectângulo de seleção.",
		 map:map,
		 icon:"static/imagens/zoom_in.png",
		 toggleGroup:"map"
	});

	toolbarItems.push("-");
	toolbarItems.push(action);

	// zoom out
	action = new GeoExt.Action({
		control:new OpenLayers.Control.ZoomBox({out:true}),
		tooltip:"Diminuir zoom no rectângulo de seleção.",
		map:map,
		icon:"static/imagens/zoom_out.png",
		toggleGroup:"map"
	});

	toolbarItems.push("-");
	toolbarItems.push(action);

	// historico de navegacao
	ctrl = new OpenLayers.Control.NavigationHistory();
	map.addControl(ctrl);

	// retroceder
	action = new GeoExt.Action({
		cls:"x-btn-icon",
		icon:"static/imagens/left.png",
		control:ctrl.previous,
		disabled:true,
		tooltip:"Vista anterior"
	});

	actions["previous"] = action;
	toolbarItems.push("-");
	toolbarItems.push(action);

	// seguinte
	action = new GeoExt.Action({
		cls:"x-btn-icon",
		icon:"static/imagens/right.png",
		control:ctrl.next,
		disabled:true,
		tooltip:"Vista seguinte"
	});

	actions["next"] = action;
	toolbarItems.push("-");
	toolbarItems.push(action);

	toolbarItems.push("-");

	// imprimir
	var printButton = new Ext.Button({
		cls:"x-btn-icon",
		icon:"static/imagens/printer.png",
		tooltip:"Imprimir página.",
		handler:function(){
			javascript:print();
		}
	});

	// adicionar items a barra
	barra_painel_mapa.add([zoomButton, toolbarItems, printButton]);
		
	
	
	var painel_mapa = new GeoExt.MapPanel({
		id:"painel_mapa",
		region:"center",
		xtype:"gx_mappanel",
		layout:"fit",
		map:map,
		tbar:barra_painel_mapa,
		header:false,
		height:850
	});
	

////////////////////////////////////////////////////////////////////////////////
	/* stores */
	////////////////////////////////////////////////////////////////////////////////

		// store entidade
		var store_entidade = new GeoExt.data.FeatureStore({
			fields:[
				{name:"gid", type:"integer"},
				{name:"nome", type:"string"},
				{name:"morada", type:"string"},
				{name:"telefone", type:"integer"},
				{name:"descricao", type:"string"},
				{name:"id_protocolo", type:"integer"}
			],
			proxy:new GeoExt.data.ProtocolProxy({
				protocol:new OpenLayers.Protocol.WFS({
					url:wfs,
					featureType:layer_entidade,
					featurePrefix:workspace,
					srsName:WGS84_google_mercator,
					version:"1.1.0"
				})
			}),
			autoLoad:true
		}); 

		store_entidade.on("load", function(){
			store_entidade.sort("nome", "ASC");
		});

		// store protocolo
		var store_protocolo = new Ext.data.JsonStore({
			url:'listar_protocolos/',
			root: 'data',
			totalProperty:'total',
			successProperty: 'success',	
			fields:[
					{name:"gid", mapping: 'fields.gid'},
					{name:"nome", mapping: 'fields.nome'}
				],
			autoLoad:true
		});

		store_protocolo.on("load", function(){
			store_protocolo.sort("nome", "ASC");
		});

		// store habitacao
		var store_habitacao = new GeoExt.data.FeatureStore({
			fields:[
				{name:"gid", type:"integer"},
				{name:"morada", type:"string"},
				{name:"numero", type:"integer"}
			],
			proxy:new GeoExt.data.ProtocolProxy({
				protocol:new OpenLayers.Protocol.WFS({
					url:wfs,
					featureType:layer_habitacao,
					featurePrefix:workspace,
					srsName:WGS84_google_mercator,
					version:"1.1.0"
				})
			}),
			autoLoad:true
		});

		store_habitacao.on("load", function(){
			store_habitacao.sort("morada", "ASC");
		});

		// ligar stores
		store_habitacao.bind(wfs_habitacao);
		store_entidade.bind(wfs_entidade);

	////////////////////////////////////////////////////////////////////////////////
	/* column models */
	////////////////////////////////////////////////////////////////////////////////

		// cm entidades
		var cm_entidade = new Ext.grid.ColumnModel({
			defaults:{sortable:true},
			columns:[
				{header:"Nome", dataIndex:"nome", width:175},
				{header:"Morada", dataIndex:"morada", width:200}
			]
		});

		// cm habitacoes
		var cm_habitacao = new Ext.grid.ColumnModel({
			defaults:{sortable:true},
			columns:[
				{header:"Morada", dataIndex:"morada", width:225},
				{header:"Número", dataIndex:"numero", width:75}
			]
		});

		// cm edicao de entidades
		var cm_edicao_entidade = new Ext.grid.ColumnModel({
			columns:[
				{header:"Nome", dataIndex:"nome", editor:{xtype:"textfield"}, width:200},
				{header:"Morada", dataIndex:"morada", editor:{xtype:"textfield"}, width:300},
				{header:"Telefone", dataIndex:"telefone", editor:{xtype:"numberfield"}, width:75},
				{header:"Descricao", dataIndex:"descricao", editor:{xtype:"textfield"}, width:300},
				{header:"Protocolo", dataIndex:"id_protocolo", editor:{xtype:"numberfield"}, width:75}
			]
		});

		// cm edicao de habitacoes
		var cm_edicao_habitacao = new Ext.grid.ColumnModel({
			columns:[
				{header:"Morada", dataIndex:"morada", editor:{xtype:"textfield"}, width:300},
				{header:"Número", dataIndex:"numero", editor:{xtype:"numberfield"}, width:100}
			]
		});

	////////////////////////////////////////////////////////////////////////////////
	/* estrutura da pagina */
	////////////////////////////////////////////////////////////////////////////////

	/** combos **/

		// combo pesquisa por nome
		var combo_nome = new Ext.form.ComboBox({
			id:"combo_nome",
			mode:"local",
			typeAhead:true,
			fieldLabel:"Nome",
			emptyText:"Introduza um nome...",
			displayField:"nome",
			store:store_entidade,
			hideTrigger:true
		});

		// combo pesquisa por nome 2
		var combo_nome2 = new Ext.form.ComboBox({
			id:"combo_nome2",
			mode:"local",
			typeAhead:false,
			fieldLabel:"Nome",
			emptyText:"Escolha um nome...",
			displayField:"nome",
			store:store_entidade
		});

		// combo pesquisa por raio
		var combo_raio = new Ext.form.ComboBox({
			id:"combo_raio",
			fieldLabel:"Raio de pesquisa",
			emptyText:"Introduza um raio em m...",
			hideTrigger:true
		});

		// combo pesquisa por raio 2
		var combo_raio2 = new Ext.form.ComboBox({
			id:"combo_raio2",
			fieldLabel:"Raio de pesquisa",
			emptyText:"Introduza um raio em m...",
			hideTrigger:true
		});

		// combo pesquisa por protocolo
		var combo_protocolo = new Ext.form.ComboBox({
			xtype: 'combo',
			id:"combo_protocolo",
			store:store_protocolo,
			mode:"local",
			fieldLabel:"Protocolo",
			emptyText:"Escolha um protocolo...",
			valueField:"gid",
			displayField:"nome",
			triggerAction:"all",
			editable:false,
			listeners:{
				select:function(combo, record){
					filter_protocolo(combo, record);
				}
			}
		});

		// combo pesquisa por morada
		var combo_morada = new Ext.form.ComboBox({
			id:"combo_morada",
			mode:"local",
			typeAhead:true,
			fieldLabel:"Morada",
			emptyText:"Introduza uma morada...",
			displayField:"morada",
			store:store_habitacao,
			hideTrigger:true
		});

		// combo pesquisa por morada 2
		var combo_morada2 = new Ext.form.ComboBox({
			id:"combo_morada2",
			mode:"local",
			typeAhead:true,
			fieldLabel:"Morada",
			emptyText:"Introduza uma morada...",
			displayField:"morada",
			store:store_habitacao
		});

		// combo pesquisa por numero
		var combo_numero = new Ext.form.ComboBox({
			id:"combo_numero",
			mode:"local",
			typeAhead:true,
			fieldLabel:"Número",
			emptyText:"Introduza um número...",
			displayField:"numero",
			store:store_habitacao,
			hideTrigger:true
		});

	/** forms **/

		// form pesquisa entidades
		var form_entidade = new Ext.form.FormPanel({
			id:"form_entidade",
			title:"Pesquisa",
			items:[combo_nome, combo_protocolo],
			buttons:[{
				text:"Limpar pesquisa",
				handler:function(){
					clean_filter_entidade();
				}
			}],
			frame:true
		});

		// form pesquisa entidades por raio habitacoes
		var form_entidade_raio = new Ext.form.FormPanel({
			id:"form_entidade_raio",
			title:"Pesquisa por proximidade",
			items:[combo_nome2, combo_raio],
			buttons:[{
				text:"Pesquisar",
				handler:function(){
					get_near_habitacao();
				}
			},
			{
				text:"Limpar pesquisa",
				handler:function(){
					clean_filter_entidade();
				}
			}],
			frame:true
		});

		// form pesquisa habitacoes
		var form_habitacao = new Ext.form.FormPanel({
			id:"form_habitacao",
			title:"Pesquisa",
			items:[combo_morada, combo_numero],
			buttons:[{
				text:"Limpar pesquisa",
				handler:function(){
					clean_filter_habitacao();
				}
			}],
			frame:true,
			style:"margin:10px;"
		});

		// form pesquisa entidades por raio habitacoes
		var form_habitacao_raio = new Ext.form.FormPanel({
			id:"form_habitacao_raio",
			title:"Pesquisa por proximidade",
			items:[combo_morada2, combo_raio2],
			buttons:[{
				text:"Pesquisar",
				handler:function(){
					get_near_entidade();
				}
			},
			{
				text:"Limpar pesquisa",
				handler:function(){
					clean_filter_habitacao();
				}
			}],
			frame:true,
			style:"margin:10px;"
		});

		// form de login
		var form_login = new Ext.FormPanel({
			id:"form_login",
			url:"apache/login.php",
			items:[{
				fieldLabel:"Senha",
				name:"senha",
				inputType:"password",
				emptyText:"********",
				width:165,
				allowBlank:false
			}],
			buttons:[{ 
				text:"Login",
				formBind:true,
				handler:function(){
					login();
				}
			}],
			monitorValid:true,
			frame:true,
			defaultType:"textfield",
			style:"margin:10px;"
		});

		// form logout
		var form_logout = new Ext.FormPanel({
			id:"form_logout",
			buttons:[{ 
				text:"Logout",
				handler:function(){
					logout();
				}
			}],
			frame:true,
			hidden:true,
			style:"margin:10px;"
		});

	/** grids **/

		// grid entidade
		var grid_entidade = new Ext.grid.GridPanel({
			id:"grid_entidade",
			title:"Lista de entidades",
			cm:cm_entidade,
			store:store_entidade, 
			sm:new GeoExt.grid.FeatureSelectionModel({singleSelect:true, selectControl:select_control}),
			height:350,
			style:"margin:10px;"
		});

		// grid habitacao
		var grid_habitacao = new Ext.grid.GridPanel({
			id:"grid_habitacao",
			title:"Lista de habitações",
			cm:cm_habitacao,
			store:store_habitacao, 
			sm:new GeoExt.grid.FeatureSelectionModel({singleSelect:true, selectControl:select_control}),
			height:350,
			style:"margin:10px;"
		});

		// grid edicao de entidades
		var grid_edicao_entidade = new Ext.grid.EditorGridPanel({
			id:"grid_edicao_entidade",
			title:"Edição de entidades",
			xtype:"editorgrid",
			ref:"featureGrid",
			cm:cm_edicao_entidade,
			store:store_entidade, 
			sm:new GeoExt.grid.FeatureSelectionModel({singleSelect:true, selectControl:select_control}),
			tbar:[],
			height:200
		});

		// grid edicao de habitacoes
		var grid_edicao_habitacao = new Ext.grid.EditorGridPanel({
			id:"grid_edicao_habitacao",
			title:"Edição de habitações",
			xtype:"editorgrid",
			ref:"featureGrid",
			cm:cm_edicao_habitacao,
			store:store_habitacao, 
			sm:new GeoExt.grid.FeatureSelectionModel({singleSelect:true, selectControl:select_control}),
			tbar:[],
			height:200
		});

	/** barras **/

		// barra entidades
		var bbar_entidade = grid_edicao_entidade.getTopToolbar();

		bbar_entidade.add([
		{
			text:"Apagar",
			handler:function(){delete_feature("entidade");}
		},
		{xtype:"tbseparator"},
		new GeoExt.Action({
			control:dc_entidade,
			text:"Criar",
			enableToggle:true
		}),
		{xtype:"tbseparator"},
		new GeoExt.Action({
			control:mc_entidade,
			text:"Mover",
			enableToggle:true
		}),
		{xtype:"tbseparator"},
		{
			text:"Guardar alterações",
			handler:function(){save_features("entidade");}
		}
		]);

		bbar_entidade.doLayout();

		// barra habitacoes
		var bbar_habitacao = grid_edicao_habitacao.getTopToolbar();

		bbar_habitacao.add([
		{
			text:"Apagar",
			handler:function(){delete_feature("habitacao");}
		},
		{xtype:"tbseparator"},
		new GeoExt.Action({
			control:dc_habitacao,
			text:"Criar",
			enableToggle:true
		}),
		{xtype:"tbseparator"},
		new GeoExt.Action({
			control:mc_habitacao,
			text:"Mover",
			enableToggle:true
		}),
		{xtype:"tbseparator"},
		{
			text:"Guardar alterações",
			handler:function(){save_features("habitacao");}
		}]);

		bbar_habitacao.doLayout();

		/** paineis **/

		// painel pesquisa de entidades
		var pesquisa_entidade = new Ext.Panel({
			id:"pesquisa_entidade",
			title:"Entidades",
			bodyStyle:"background:#f4f4f4;",
			items:[form_entidade, form_entidade_raio, grid_entidade]
		});
		
		// painel pesquisa de habitacoes
		var pesquisa_habitacao = new Ext.Panel({
			id:"pesquisa_habitacao",
			title:"Habitações",
			bodyStyle:"background:#f4f4f4;",
			items:[form_habitacao, form_habitacao_raio, grid_habitacao]
		});

		// painel pesquisa por camada
		var pesquisa_camada = new Ext.TabPanel({
			id:"pesquisa_camada",
			title:"Pesquisa",
			items:[pesquisa_entidade, pesquisa_habitacao],
			activeTab:0,
			border:false,
			style:"background:#dce6f5;padding-top:15px;"
		});
		
		// painel edicao por camada
		var edicao_camada = new Ext.TabPanel({
			id:"edicao_camada",
			title:"Pesquisa",
			items:[grid_edicao_entidade, grid_edicao_habitacao],
			activeTab:0,
			border:false,
			hidden:true,
			style:"background:#dce6f5;padding-top:15px;"
		});
/*			
	// painel rota
		var painel_rota = new Ext.Panel({
			id:"painel_rota",
			items:[{
				id:"item_painel_rota",
				xtype:"gxux_routingpanel",
				cloudmadeKey:"bc4182bf14474c769734f26f0fa74e4e",
				map:map
			}],
			autoHeight:true,
			split:true,
			style:"margin:10px;"
		});
				
		// painel itinerario
		var itinerario = new Ext.Panel({
			id:"itinerario",
			title:"Itinerário",
			bodyStyle:"background:#f4f4f4;",
			items:painel_rota
		});
*/
		// painel simbologia
		var simbologia = new Ext.Panel({
			id:"simbologia",
			autoHeight:true,
			bodyStyle:"margin:10px;",
			html:
				"<table cellspacing=\"10\" style=\"font-family:verdana,arial;font-size:12px;\">"+
				"<tr><td><img src=\"static/imagens/info.png\" height=\"40\" width=\"40\" /></td><td>Entidades</td></tr>"+
				"<tr><td><img src=\"static/imagens/home.png\" height=\"40\" width=\"40\" /></td><td>Habitações</td></tr>"+
				"<tr><td><img src=\"static/imagens/pin.png\" height=\"40\" width=\"40\" /></td><td>Partida/chegada do itinerário</td></tr>"+
				"<tr><td><img src=\"static/imagens/linha_rota.png\" /></td><td>Itinerário</td></tr>"+
				"</table>"
		});

		// painel legenda
		var legenda = new Ext.Panel({
			id:"legenda",
			title:"Legenda",
			items:simbologia,
			bodyStyle:"background:#f4f4f4;"
		});
		
		
		
/*
		// painel backoffice
		var backoffice = new Ext.Panel({
			id:"backoffice",
			title:"Backoffice",
			items:[form_login, form_logout],
			bodyStyle:"background:#f4f4f4;"
		});
*/
	/** menu **/

		// menu
		var menu = new Ext.Toolbar({
			id:"menu",
			items:[{
				text:'Contactos',
				xtype:'tbbutton',
				cls:'x-btn-text-icon',
				icon:'static/imagens/collapse-all.gif',
				handler:function(){
					popup_contactos();
				}
			},
			{xtype:"tbseparator"},
			{
				text:"Créditos",
				xtype:"tbbutton",
				cls:"x-btn-text-icon",
				icon:"static/imagens/group.png",
				handler:function(){
					popup_creditos();
				}
			}]
		});
		
		
		
		
	// painel norte
	var norte = new Ext.Panel({
		id:"norte",
		region:"north",
		tbar:menu,
		border:false,
		collapsible:false,
		bodyStyle:"background-color:#f8f8f8;"
	});

	// painel sul
	var sul = new Ext.Panel({
		id:"sul",
		region:"south",
//		items:edicao_camada,
		border:true,
		html:"<div align=\"center\"><h1 class=\"rodape\">Projeto Temático em Aplicações SIG | 2011/2012</h1></div>"
	});

	// painel oeste
	var este = new Ext.TabPanel({
		id:"este",
		region:"west",
		items:[pesquisa_camada,legenda],
		activeTab:0,
		width:310,
		border:false,
		collapsible:true,
		collapseMode:"normal",
		bodyStyle:"font-size:11px;"
	});

	// painel centro
	var centro = new Ext.Panel({
		id:"centro",
		region:"center",
		border:false,
		items:painel_mapa
	});

	// viewport
	var viewport = new Ext.Viewport({
		id:"viewport",
		items:[norte, este, sul, centro],
		layout:"border",
		border:false
	});

/*	var viewport = new Ext.Viewport({
		id:"viewport",
		items:[centro],
		layout:"border",
		border:false
	});
*/	
	
	
	// zoom mapa
	map.zoomToExtent(bounds);
	map.zoomTo(17);

////////////////////////////////////////////////////////////////////////////////
	/* funcoes */
	////////////////////////////////////////////////////////////////////////////////

	/** filtros **/

		// filtrar grid por protocolo
		function filter_protocolo(combo, record){
			var aux = "^" + record.get("id") + "$";
			var id = RegExp(aux);
			var nome = record.get("nome");
			var comboNome = Ext.getCmp("combo_nome");
			combo.setValue(nome);
			comboNome.clearValue();
			comboNome.store.filter("id_protocolo", id);
		}

		// limpar filtros entidades
		function clean_filter_entidade(){
			var comboNome = Ext.getCmp("combo_nome");
			var comboNome2 = Ext.getCmp("combo_nome2");
			var comboRaio = Ext.getCmp("combo_raio");
			var comboProtocolo = Ext.getCmp("combo_protocolo");
			comboNome.store.filter();
			comboNome.setValue();
			comboNome2.setValue();
			comboRaio.setValue();
			comboProtocolo.setValue();
		}

		// limpar filtros habitacoes
		function clean_filter_habitacao(){
			var comboMorada = Ext.getCmp("combo_morada");
			var comboMorada2 = Ext.getCmp("combo_morada2");
			var comboRaio2 = Ext.getCmp("combo_raio2");
			comboMorada.store.filter();
			comboMorada.setValue();
			comboMorada2.setValue();
			comboRaio.setValue();
		}

	/** selecao de pontos **/

		// selecionar ponto
		function on_select_ponto(feature){
			select_control.unselectAll({except:feature});
		}

		// descelecionar entidade
		function on_unselect_entidade(){
			dialog_entidade.dialog("destroy").remove();
		}

		// descelecionar habitacao
		function on_unselect_habitacao(){
			dialog_habitacao.dialog("destroy").remove();
		}

		// selecionar latitude e longitude
		function get_lat_lon(feature, layer){
			var gid = feature.attributes.gid;
			var caminho = 'getlonlat/';
			var dados = "gid=" + gid + "&table=" + layer;

			$.ajax({
				url:caminho,
				data:dados,
				type:"POST"
			}).always(function(data){
				//var aux = jQuery.parseJSON(data);
				var lat = data.lat;
				var lon = data.long;
				var lonlat = new OpenLayers.LonLat(lon, lat).transform(WGS84, WGS84_google_mercator);
				map.panTo(lonlat);
			});
		}

		// habitacoes proximas de uma entidade
		function get_near_habitacao(){
			var nome = Ext.getCmp("combo_nome2").getValue();
			var raio = Ext.getCmp("combo_raio").getValue();
			var caminho = "apache/getNearHabitacoes.php";
			var dados = "nome=" + nome + "&raio=" + raio;
			var title = "Habitações próximas de <b>" + nome + "</b> num raio de " + raio + "m:";
			var output = "<span style=\"font-size:10;\">";

			$.ajax({
				url:caminho,
				data:dados,
				type:"POST"
			}).done(function(data){
				var data = jQuery.parseJSON(data);

				if(data != null){
					for(var i = 0; i < data.length; i ++){
						if(data[i].dentro == "t"){
							output += "<br /> - " + data[i].ponto + " Nº. " + data[i].numero;
						}
					}

					output += "</span>";

					Ext.Msg.minWidth = 350;
					Ext.Msg.alert(title, output);
				}
				else{
					Ext.Msg.alert("Não existem habitações próximas.");
				}
			});
		}

		// entidades proximas de uma habitacao
		function get_near_entidade(){
			var morada = Ext.getCmp("combo_morada2").getValue();
			var raio = Ext.getCmp("combo_raio2").getValue();
			var caminho = "getnearentidades/";
			var dados = "morada=" + morada + "&raio=" + raio;
			var title = "Entidades próximas de <b>" + morada + "</b> num raio de " + raio + "m:";
			var output = "<span style=\"font-size:10;\">";

			$.ajax({
				url:caminho,
				data:dados,
				type:"POST"
			}).done(function(data){
				var data = jQuery.parseJSON(data);

				if(data != null){
					for(var i = 0; i < data.length; i ++){
						if(data[i].dentro == "t"){
							output += "<br /> - " + data[i].ponto;
						}
					}

					output += "</span>";

					Ext.Msg.minWidth = 350;
					Ext.Msg.alert(title, output);
				}
				else{
					Ext.Msg.alert("Não existem entidades próximas.");
				}
			});
		}

	/** popups **/

		// popup entidade
		function popup_entidade(feature){
			var id = feature.attributes.id_protocolo;
			var caminho = 'getprotocolopopup/';
			var dados = "id=" + id;
			var lat, lon;

			$.ajax({
				url:caminho,
				data:dados,
				type:"POST"
			}).done(function(data){
				//var aux = jQuery.parseJSON(data);
				var protocolo = data.nome;

				var output =
					"<span class=\"bold\">Tipo:</span> " + protocolo + "<br /><br />"+
					"<span class=\"bold\">Morada: </span>" + feature.attributes.morada + "<br />"+
					"<span class=\"bold\">Telefone: </span>" + feature.attributes.telefone + "<br /><br />"+
					"<span class=\"bold\">Descricao: </span>" + feature.attributes.descricao;

				var title = feature.attributes.nome;

				dialog_entidade = $("<div id='pop_ent'>" + output + "</div>").dialog({
					title:title,
					position:[400,100],
					width:300
				});
			});
		}

		// popup habitacao
		function popup_habitacao(feature){
			var id = feature.attributes.gid;
			var caminho = "getquartos/";
			var dados = "id=" + id;
			var output =
				"<span class=\"bold\">Número: </span>" + feature.attributes.numero + "<br /><br />"+
				"<span class=\"bold\">Apartamentos:</span>";

			$.ajax({
				url:caminho,
				data:dados,
				type:"POST"
			}).done(function(data){

		//		var data = jQuery.parseJSON(data);
				
				if(data != null){
					output +=
						"<br /><br /><div align=\"center\">" +
						"<table class=\"apartamentos\">" +
						"<tr>" +
						"<th>Responsável</th>" +
						"<th>Andar</th>" +
						"<th>Tipo</th>" +
						"<th>Quartos</th>" +
						"<th>Livres</th>" +
						"</tr>";
/*
					Object.keys(data).forEach(function(key){
						
						output +=
							"<tr>"+
							"<td>" + data.fields[key] + "</td>" +
							"<td>" + data[key].andar + "</td>" +
							"<td>" + data[key].tipo + "</td>" +
							"<td>" + data[key].num_lives + "</td>" +
							"</tr>";
							
						});
					
					$.each(data, function(key, val){
						output +=
							"<tr>"+
							"<td>" + data[key].responsavel + "</td>" +
							"<td>" + data[key] + "</td>" +
							"<td>" + data[key] + "</td>" +
							"<td>" + data[key] + "</td>" +
							"</tr>";
				    });
*/
		var dadosLenght = data.total;			
				for (i = 0; i < dadosLenght; i++) {
		//			var fieldsLenght = data.data[i].fields.lenght
					output +=
					"<tr>"+
					"<td>" + data.data[i].fields.responsavel + "</td>" +
					"<td>" + data.data[i].fields.andar + "</td>" +
					"<td>" + data.data[i].fields.tipo + "</td>" +
					"<td>" + data.data[i].fields.num_total + "</td>" +
					"<td>" + data.data[i].fields.num_livres + "</td>" +
					"</tr>";}	
					
					output += "</table></div>";
				}
				else{
					output += " esta habitação não tem quartos para arrendamento.";
				}

				var title = feature.attributes.morada;

				dialog_habitacao = $("<div id='pop_ent'>" + output + "</div>").dialog({
					title:title,
					position:[400,100],
					width:400
				});
			});
		}

		// popup contactos
		function popup_contactos(){
			Ext.Msg.minWidth = 500;
			Ext.Msg.alert(
				"Contatos",
				"<p style=\"font-weight:bold;\">Núcleo Associativo de Estudantes de Águeda:</p>"+
				"<br />"+
				"<table cellspacing=\"5\" style=\"font-size:12px;\">"+
				"<tr><td>Telefone</td><td>961277127</td></tr>"+
				"<tr><td>E-mail</td><td><a href=\"mailto:nae@aauav.pt\">nae@aauav.pt</a></td></tr>"+
				"<tr><td>Site</td><td><a href=\"http://www.aauav.pt/nae\">http://www.aauav.pt/nae</a></td></tr>"+
				"</table>"
			);
		}

		// popup creditos
		function popup_creditos(){
			Ext.Msg.minWidth = 500;
			Ext.Msg.alert(
				"Créditos",
				"<h1>Escola Superior de Tecnologia e Gestão de Águeda</h1>"+
				"<h1>Tecnologias da Informação</h1>"+
				"<br />"+
				"<h1>Orientação e coordenação:</h1>"+
				"<br />"+
				"<p>Luís Jorge Gonçalves <a href=\"mailto:luisjorge@ua.pt\">luisjorge@ua.pt</a></p>"+
				"<br />"+
				"<h1>Equipa de desenvolvimento:</h1>"+
				"<br />"+
				"<p>49562 – Tiago Coelho"+
				"<br />49973 – Marcel Carvalho"+
				"<br />49974 – Fábio Luís"+
				"<br />51406 – Henrique Moreira (web developer)</p>"
			);
		}

	/** backoffice **/

		// save features
		function save_features(layer){

			if(layer == "entidade"){
				store_entidade.proxy.protocol.commit(wfs_entidade.features, {
					callback:function(){
						var layers = map.layers;

						for(var i = layers.length - 1; i >= 0; --i){
							layers[i].redraw(true);
						}
					}
				});
			}
			if(layer == "habitacao"){
				store_habitacao.proxy.protocol.commit(wfs_habitacao.features, {
					callback:function(){
						var layers = map.layers;

						for(var i = layers.length - 1; i >= 0; --i){
							layers[i].redraw(true);
						}
					}
				});
			}
		}

		// delete_feature
		function delete_feature(layer){
			if(layer == "entidade"){
				store_entidade.featureFilter = new OpenLayers.Filter({
					evaluate:function(feature){
						return feature.state != OpenLayers.State.DELETE;
					}
				});

				grid_edicao_entidade.getSelectionModel().each(function(rec){
					var feature = rec.getFeature();
					mc_entidade.unselectFeature(feature);
					wfs_entidade.removeFeatures([feature]);

					if(feature.state != OpenLayers.State.INSERT){
						feature.state = OpenLayers.State.DELETE;
						wfs_entidade.addFeatures([feature]);
					}
				});
			}
			if(layer == "habitacao"){
				store_habitacao.featureFilter = new OpenLayers.Filter({
					evaluate:function(feature){
						return feature.state != OpenLayers.State.DELETE;
					}
				});

				grid_edicao_habitacao.getSelectionModel().each(function(rec){
					var feature = rec.getFeature();
					mc_habitacao.unselectFeature(feature);
					wfs_habitacao.removeFeatures([feature]);

					if(feature.state != OpenLayers.State.INSERT){
						feature.state = OpenLayers.State.DELETE;
						wfs_habitacao.addFeatures([feature]);
					}
				});
			}
		}

	/** login **/

		// login
		function login(){
			form_login.getForm().submit({
				method:"POST",
				success:function(){login_sucesso();},
				failure:function(){login_falha();}
			});
		}

		// login sucesso
		function login_sucesso(){
			// mudar layout
			Ext.getCmp("form_login").hide();
			Ext.getCmp("form_logout").show();
			Ext.getCmp("edicao_camada").show();
			Ext.getCmp("sul").update("");
			sul.setHeight(300);
			sul.findParentByType("viewport").doLayout();

			// desativar select control
			select_control.deactivate();
		}

		// login falha
		function login_falha(){
			Ext.Msg.alert("Login falhou","O login falhou. Por favor tente novamente.");
			form_login.getForm().reset();
		}

		// logout
		function logout(){
			Ext.getCmp("form_login").show();
			Ext.getCmp("form_logout").hide();
			Ext.getCmp("edicao_camada").hide();
			Ext.getCmp("sul").update("<div align=\"center\"><h1 class=\"rodape\">Projeto Temático em Aplicações SIG | 2011/2012 | Grupo 7</h1></div>");
			sul.setHeight(35);
			sul.findParentByType("viewport").doLayout();

			mc_entidade.deactivate();
			mc_habitacao.deactivate();
			dc_entidade.deactivate();
			dc_habitacao.deactivate();
			select_control.activate();
		}
	
});