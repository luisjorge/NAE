function GScript(src) {document.write('<' + 'script src="' + src + '"' +' type="text/javascript"><' + '/script>');}function GBrowserIsCompatible() {return true;}function GApiInit() {if (GApiInit.called) return;GApiInit.called = true;window.GAddMessages && GAddMessages({160: '\x3cH1\x3eErro no servidor\x3c/H1\x3eOcorreu um erro temporário no servidor e não é possível concluir sua solicitação. \x3cp\x3ePor favor, tente novamente em um minuto.\x3c/p\x3e',1415: '.',1416: '.',1547: 'mi',1616: 'km',4100: 'm',4101: 'pés',10018: 'Carregando...',10021: 'Mais zoom',10022: 'Menos zoom',10024: 'Arraste para dar zoom',10029: 'Voltar ao último resultado',10049: 'Mapa',10050: 'Satélite',10093: 'Termos de Uso',10111: 'Mapa',10112: 'Sat',10116: 'Híbrido',10117: 'Híb',10120: 'Infelizmente, não temos mapas dessa região com esse nível de detalhamento.\x3cp\x3eTente aplicar menos zoom para ver essa região.\x3c/p\x3e',10121: 'Infelizmente não temos imagens dessa região com esse nível de detalhamento.\x3cp\x3eTente aplicar menos zoom para ver essa região de mais longe.\x3c/p\x3e',10507: 'Mover para a esquerda',10508: 'Mover para a direita',10509: 'Mover para cima',10510: 'Mover para baixo',10511: 'Mostrar mapa de ruas',10512: 'Mostrar imagens de satélite',10513: 'Mostrar imagens com nomes de rua',10806: 'Clique para ver esta área no Google Maps',10807: 'Trânsito',10808: 'Mostrar trânsito',10809: 'Ocultar trânsito',12150: '%1$s na %2$s',12151: '%1$s na %2$s na %3$s',12152: '%1$s na %2$s entre %3$s e %4$s',10985: 'Ampliar',10986: 'Reduzir',11047: 'Centralizar mapa aqui',11089: '\x3ca href\x3d\x22javascript:void(0);\x22\x3eAmpliar\x3c/a\x3e para ver o trânsito nesta região',11259: 'Tela cheia',11751: 'Mostrar mapa da rua com terreno',11752: 'Estilo:',11757: 'Alterar estilo de mapa',11758: 'Terreno',11759: 'Ter',11794: 'Mostrar nomes',11303: 'Ajuda do Street View',11274: 'Para usar a vista da rua, você precisa da versão %1$d ou mais recente do Adobe Flash Player.',11382: 'Obtenha o Flash Player mais recente',11314: '\x3cbr\x3eInfelizmente, a vista da rua está indisponível no momento devido à grande demanda. Tente novamente mais tarde!',1559: 'N',1560: 'S',1561: 'O',1562: 'L',1608: 'NO',1591: 'NE',1605: 'SO',1606: 'SE',11907: 'Esta imagem não está mais disponível',10041: 'Ajuda',12471: 'Local atual',12492: 'Earth',12823: 'O Google desativou o uso da API do Google Maps para este aplicativo. Consulte os Termos de Serviço para obter mais informações: %1$s.',12822: 'http://code.google.com/apis/maps/terms.html',12915: 'Aperfeiçoar o mapa',12916: 'Google, Europa Technologies',13171: '3D Híbrido',0: ''});}var GLoad;(function() {GLoad = function(apiCallback) {var callee = arguments.callee;GApiInit();var opts = {export_legacy_names:true,tile_override:[{maptype:0,min_zoom:"7",max_zoom:"7",rect:[{lo:{lat_e7:330000000,lng_e7:1246050000},hi:{lat_e7:386200000,lng_e7:1293600000}},{lo:{lat_e7:366500000,lng_e7:1297000000},hi:{lat_e7:386200000,lng_e7:1320034790}}],uris:["http://mt0.gmaptiles.co.kr/mt/v=kr1.16\x26hl=pt-BR\x26src=api\x26","http://mt1.gmaptiles.co.kr/mt/v=kr1.16\x26hl=pt-BR\x26src=api\x26","http://mt2.gmaptiles.co.kr/mt/v=kr1.16\x26hl=pt-BR\x26src=api\x26","http://mt3.gmaptiles.co.kr/mt/v=kr1.16\x26hl=pt-BR\x26src=api\x26"]},{maptype:0,min_zoom:"8",max_zoom:"8",rect:[{lo:{lat_e7:330000000,lng_e7:1246050000},hi:{lat_e7:386200000,lng_e7:1279600000}},{lo:{lat_e7:345000000,lng_e7:1279600000},hi:{lat_e7:386200000,lng_e7:1286700000}},{lo:{lat_e7:354690000,lng_e7:1286700000},hi:{lat_e7:386200000,lng_e7:1320035000}}],uris:["http://mt0.gmaptiles.co.kr/mt/v=kr1.16\x26hl=pt-BR\x26src=api\x26","http://mt1.gmaptiles.co.kr/mt/v=kr1.16\x26hl=pt-BR\x26src=api\x26","http://mt2.gmaptiles.co.kr/mt/v=kr1.16\x26hl=pt-BR\x26src=api\x26","http://mt3.gmaptiles.co.kr/mt/v=kr1.16\x26hl=pt-BR\x26src=api\x26"]},{maptype:0,min_zoom:"9",max_zoom:"9",rect:[{lo:{lat_e7:330000000,lng_e7:1246050000},hi:{lat_e7:386200000,lng_e7:1279600000}},{lo:{lat_e7:340000000,lng_e7:1279600000},hi:{lat_e7:386200000,lng_e7:1286700000}},{lo:{lat_e7:348900000,lng_e7:1286700000},hi:{lat_e7:386200000,lng_e7:1302000000}},{lo:{lat_e7:368300000,lng_e7:1302000000},hi:{lat_e7:386200000,lng_e7:1320035000}}],uris:["http://mt0.gmaptiles.co.kr/mt/v=kr1.16\x26hl=pt-BR\x26src=api\x26","http://mt1.gmaptiles.co.kr/mt/v=kr1.16\x26hl=pt-BR\x26src=api\x26","http://mt2.gmaptiles.co.kr/mt/v=kr1.16\x26hl=pt-BR\x26src=api\x26","http://mt3.gmaptiles.co.kr/mt/v=kr1.16\x26hl=pt-BR\x26src=api\x26"]},{maptype:0,min_zoom:"10",max_zoom:"19",rect:[{lo:{lat_e7:329890840,lng_e7:1246055600},hi:{lat_e7:386930130,lng_e7:1284960940}},{lo:{lat_e7:344646740,lng_e7:1284960940},hi:{lat_e7:386930130,lng_e7:1288476560}},{lo:{lat_e7:350277470,lng_e7:1288476560},hi:{lat_e7:386930130,lng_e7:1310531620}},{lo:{lat_e7:370277730,lng_e7:1310531620},hi:{lat_e7:386930130,lng_e7:1320034790}}],uris:["http://mt0.gmaptiles.co.kr/mt/v=kr1.16\x26hl=pt-BR\x26src=api\x26","http://mt1.gmaptiles.co.kr/mt/v=kr1.16\x26hl=pt-BR\x26src=api\x26","http://mt2.gmaptiles.co.kr/mt/v=kr1.16\x26hl=pt-BR\x26src=api\x26","http://mt3.gmaptiles.co.kr/mt/v=kr1.16\x26hl=pt-BR\x26src=api\x26"]},{maptype:3,min_zoom:"7",max_zoom:"7",rect:[{lo:{lat_e7:330000000,lng_e7:1246050000},hi:{lat_e7:386200000,lng_e7:1293600000}},{lo:{lat_e7:366500000,lng_e7:1297000000},hi:{lat_e7:386200000,lng_e7:1320034790}}],uris:["http://mt0.gmaptiles.co.kr/mt/v=kr1p.12\x26hl=pt-BR\x26src=api\x26","http://mt1.gmaptiles.co.kr/mt/v=kr1p.12\x26hl=pt-BR\x26src=api\x26","http://mt2.gmaptiles.co.kr/mt/v=kr1p.12\x26hl=pt-BR\x26src=api\x26","http://mt3.gmaptiles.co.kr/mt/v=kr1p.12\x26hl=pt-BR\x26src=api\x26"]},{maptype:3,min_zoom:"8",max_zoom:"8",rect:[{lo:{lat_e7:330000000,lng_e7:1246050000},hi:{lat_e7:386200000,lng_e7:1279600000}},{lo:{lat_e7:345000000,lng_e7:1279600000},hi:{lat_e7:386200000,lng_e7:1286700000}},{lo:{lat_e7:354690000,lng_e7:1286700000},hi:{lat_e7:386200000,lng_e7:1320035000}}],uris:["http://mt0.gmaptiles.co.kr/mt/v=kr1p.12\x26hl=pt-BR\x26src=api\x26","http://mt1.gmaptiles.co.kr/mt/v=kr1p.12\x26hl=pt-BR\x26src=api\x26","http://mt2.gmaptiles.co.kr/mt/v=kr1p.12\x26hl=pt-BR\x26src=api\x26","http://mt3.gmaptiles.co.kr/mt/v=kr1p.12\x26hl=pt-BR\x26src=api\x26"]},{maptype:3,min_zoom:"9",max_zoom:"9",rect:[{lo:{lat_e7:330000000,lng_e7:1246050000},hi:{lat_e7:386200000,lng_e7:1279600000}},{lo:{lat_e7:340000000,lng_e7:1279600000},hi:{lat_e7:386200000,lng_e7:1286700000}},{lo:{lat_e7:348900000,lng_e7:1286700000},hi:{lat_e7:386200000,lng_e7:1302000000}},{lo:{lat_e7:368300000,lng_e7:1302000000},hi:{lat_e7:386200000,lng_e7:1320035000}}],uris:["http://mt0.gmaptiles.co.kr/mt/v=kr1p.12\x26hl=pt-BR\x26src=api\x26","http://mt1.gmaptiles.co.kr/mt/v=kr1p.12\x26hl=pt-BR\x26src=api\x26","http://mt2.gmaptiles.co.kr/mt/v=kr1p.12\x26hl=pt-BR\x26src=api\x26","http://mt3.gmaptiles.co.kr/mt/v=kr1p.12\x26hl=pt-BR\x26src=api\x26"]},{maptype:3,min_zoom:"10",rect:[{lo:{lat_e7:329890840,lng_e7:1246055600},hi:{lat_e7:386930130,lng_e7:1284960940}},{lo:{lat_e7:344646740,lng_e7:1284960940},hi:{lat_e7:386930130,lng_e7:1288476560}},{lo:{lat_e7:350277470,lng_e7:1288476560},hi:{lat_e7:386930130,lng_e7:1310531620}},{lo:{lat_e7:370277730,lng_e7:1310531620},hi:{lat_e7:386930130,lng_e7:1320034790}}],uris:["http://mt0.gmaptiles.co.kr/mt/v=kr1p.12\x26hl=pt-BR\x26src=api\x26","http://mt1.gmaptiles.co.kr/mt/v=kr1p.12\x26hl=pt-BR\x26src=api\x26","http://mt2.gmaptiles.co.kr/mt/v=kr1p.12\x26hl=pt-BR\x26src=api\x26","http://mt3.gmaptiles.co.kr/mt/v=kr1p.12\x26hl=pt-BR\x26src=api\x26"]}],jsmain:"http://maps.gstatic.com/intl/pt-BR_ALL/mapfiles/400d/maps2.api/main.js",bcp47_language_code:"pt-BR",obliques_urls:["http://khm0.google.com/kh?v=54\x26src=app\x26","http://khm1.google.com/kh?v=54\x26src=app\x26"],token:"2060021088",jsmodule_base_url:"http://maps.gstatic.com/intl/pt-BR_ALL/mapfiles/400d/maps2.api",generic_tile_urls:["http://mt0.google.com/vt?hl=pt-BR\x26src=api\x26","http://mt1.google.com/vt?hl=pt-BR\x26src=api\x26"],ignore_auth:false,sv_host:"http://cbk0.google.com"};apiCallback(["http://mt0.google.com/vt/lyrs\x3dm@176000000\x26hl\x3dpt-BR\x26src\x3dapi\x26","http://mt1.google.com/vt/lyrs\x3dm@176000000\x26hl\x3dpt-BR\x26src\x3dapi\x26"], ["http://khm0.google.com/kh/v\x3d109\x26src\x3dapp\x26","http://khm1.google.com/kh/v\x3d109\x26src\x3dapp\x26"], ["http://mt0.google.com/vt/lyrs\x3dh@176000000\x26hl\x3dpt-BR\x26src\x3dapi\x26","http://mt1.google.com/vt/lyrs\x3dh@176000000\x26hl\x3dpt-BR\x26src\x3dapi\x26"],""  ,""  ,""  ,true,"google.maps.",opts,["http://mt0.google.com/vt/lyrs\x3dt@128,r@176000000\x26hl\x3dpt-BR\x26src\x3dapi\x26","http://mt1.google.com/vt/lyrs\x3dt@128,r@176000000\x26hl\x3dpt-BR\x26src\x3dapi\x26"]);if (!callee.called) {callee.called = true;}}})();function GUnload() {if (window.GUnloadApi) {GUnloadApi();}}var _mIsRtl = false;var _mHost = "http://maps.google.com";var _mUri = "/maps";var _mDomain = "google.com";var _mStaticPath = "http://maps.gstatic.com/intl/pt-BR_ALL/mapfiles/";var _mJavascriptVersion = G_API_VERSION = "400d";var _mTermsUrl = "http://www.google.com/intl/pt-BR_ALL/help/terms_maps.html";var _mLocalSearchUrl = "http://www.google.com/uds/solutions/localsearch/gmlocalsearch.js";var _mHL = "pt-BR";var _mGL = "";var _mTrafficEnableApi = true;var _mTrafficTileServerUrls = ["http://mt0.google.com/mapstt","http://mt1.google.com/mapstt","http://mt2.google.com/mapstt","http://mt3.google.com/mapstt"];var _mCityblockLatestFlashUrl = "http://maps.google.com/local_url?q=http://www.adobe.com/shockwave/download/download.cgi%3FP1_Prod_Version%3DShockwaveFlash&amp;dq=&amp;file=api&amp;s=ANYYN7manSNIV_th6k0SFvGB4jz36is1Gg";var _mCityblockFrogLogUsage = false;var _mCityblockInfowindowLogUsage = false;var _mCityblockUseSsl = false;var _mSatelliteToken = "fzwq2skkLD8tiSxr6PBfmwpK-dAH-v12mEdHEg";var _mMapCopy = "Dados cartográficos \x26#169;2012";var _mSatelliteCopy = "Imagens \x26#169;2012";var _mGoogleCopy = "\x26#169;2012 Google";var _mPreferMetric = false;var _mDirectionsEnableApi = true;var _mLayersTileBaseUrls = ['http://mt0.google.com/mapslt','http://mt1.google.com/mapslt','http://mt2.google.com/mapslt','http://mt3.google.com/mapslt'];var _mLayersFeaturesBaseUrl = "http://mt0.google.com/vt/ft";function GLoadMapsScript() {if (!GLoadMapsScript.called && GBrowserIsCompatible()) {GLoadMapsScript.called = true;GScript("http://maps.gstatic.com/intl/pt-BR_ALL/mapfiles/400d/maps2.api/main.js");}}(function() {if (!window.google) window.google = {};if (!window.google.maps) window.google.maps = {};var ns = window.google.maps;ns.BrowserIsCompatible = GBrowserIsCompatible;ns.Unload = GUnload;})();GLoadMapsScript();