// encoding: utf-8
// jQuery.fn.virtualBrowser 1.1 - MIT/GPL Licensed - More info: http://github.com/maranomynet/virtualbrowser/
(function(d,p){d.injectBaseHrefToHtml=function(e,j){var a=j.split('#')[0],c=a[k](/([^?]*\/)?(.*)/,'$2'),b=a.split('?')[0][k](/(.*\/)?.*/,'$1');e=e[k](/(<[^>]+ (href|src|action)=["'])(["'#])/gi,'$1'+c+'$3')[k](/(<[^>]+ (href|src|action)=["'])\?/gi,'$1'+c.split('?')[0]+'?')[k](/(["'])([a-z]{3,12}:)/gi,'$1`<<`>>$2')[k](/(<[^>]+ (href|src|action)=["'])([^\/`])/gi,'$1'+b+'$3')[k](/\`<<`>>/g,'');return e};d.getResultBody=function(e){return d('<div/>').append(d(e||[]).not('script,title,meta,link,style').find('script,style').remove().end())};var E=document.location,w='isDefaultPrevented',F='preventDefault',s='stopPropagation',q='passThrough',l='virtualBrowser',x='VBbeforeload',y='VBdisengaged',z='VBload',A='VBloaded',k='replace',G=/^(https?:)?\/\//,H={'load':function(a){var c=typeof a!='string'?d(a):p,b=d(this),h=b.data(l),g=h.cfg,i=d.Event(x),m,n,I=g.loadmsgMode,f={elm:c};if(h.$$empty){f.isFirst=true;delete h.$$empty}if(c){a=c.attr('href');a=a===p?c.attr('action'):a}a=f.url=a===''?E.href:a;if(a){i[s]();b.trigger(i,f);if(!i[q]&&((i[q]===p&&c&&c[0].target&&c[0].target!=window.name)||(/^([a-z]{3,12}:|\/\/)/i.test(a)&&!a.toLowerCase()[k](G,'').indexOf(E.href.toLowerCase()[k](G,'').split('/')[0])==0))){i[q]=true}i[q]&&i[F]();if(!i[w]()){var N=f.noCache=f.noCache!==p?f.noCache:g.noCache,o=g.params||'',t='GET';if(c&&c.is('form')){t=c.attr('method')||t;o+='&'+c.serialize();var u=h._0;if(u){var B=u.elm;if(B.is(':image')){var J=B[0].name;o+='&'+J+'.x='+Math.round(u.X)+'&'+J+'.y='+Math.round(u.Y)}else{o+='&'+d.param(B)}delete h._0}o=o.replace(/^&+|&+$/g,'');var K='multipart/form-data';i._1=!!c.find('input:file')[0]||c.attr('enctype')==K||c.attr('encoding')==K}f.params=o;f.method=t;if(I&&I!='none'){g.loadmsgMode=='replace'&&b.empty();b.append(g.loadmsgElm)}var v={url:f.url.split('#')[0],data:o,type:t,cache:!N,complete:function(e,j){f.result=d.injectBaseHrefToHtml(e.responseText,f.url);f.xhr=e;f.status=j;if(g.selector){f.resultDOM=d.getResultBody(f.result).find(g.selector)}m=d.Event(z);m[s]();b.trigger(m,f);if(!m[w]()){n=d.Event(A);n[s]();g.loadmsgElm.detach();f.resultDOM=f.resultDOM||d.getResultBody(f.result).contents();b.empty().append(f.resultDOM);h.lastRequest=f;b.trigger(n,f);delete f.resultDOM;delete f.result;delete f.xhr}if(g.disengage){b[l]('disengage')}}};if(!i._1){d.ajax(v)}else{v=d.extend({},v);var L='if'+(new Date).getTime(),C=d('<iframe name="'+L+'" src="about:blank" style="position:absolute;top:-999em;left:-999em;visibility:hidden;" />').appendTo('body'),O=function(){var e='success';v.complete({fakeXHR:'iframe',responseText:'<html>'+C.contents().find('html').html()+'</html>'},e);c.attr({target:P,action:D});setTimeout(function(){C.remove()},0)},D=c.attr('action')||'',P=c.attr('target')||'';c.attr('target',L);if(g.params){c.attr('action',D+(/\?/.test(D)?'&':'?')+g.params)}C.bind('load',O)}}}return i},'data':function(){return d(this).data(l)},'disengage':function(){var e=d(this);e.removeData(l).unbind('click submit',M).unbind(z+' '+A+' '+x).trigger(y).unbind(y)}},M=function(e){var j=e.type=='submit',a=d(e.target).closest(j?'form':'[href], input:submit, button:submit, input:image');if(a[0]){if(!e[w]()){if(a.is('input, button')){if(!a[0].disabled){var c=d(this).data(l);if(a.is(':image')){var b=a.offset();c._0={elm:a,X:e.pageX-b.left,Y:e.pageY-b.top}}else if(a.is('[name]')){c._0={elm:a}}setTimeout(function(){delete c._0},0)}}else{var h=H['load'].call(this,a);if(!h[q]){!h._1&&e[F]();h.isPropagationStopped()&&e[s]()}}}}},r=d.fn[l]=function(b,h){var g=this,i=typeof b=='string';if(i){var m=H[b],n;if(m){g.each(function(e){var j=m.apply(this,[].concat(h));if(!e){n=j}})}if(n!==p){return n}}else{b.onLoad&&g.bind(z,b.onLoad);b.onLoaded&&g.bind(A,b.onLoaded);b.onBeforeload&&g.bind(x,b.onBeforeload);b.onDisengaged&&g.bind(y,b.onDisengaged);b.params=typeof b.params=='string'?b.params:d.param(b.params||{});g.each(function(){var e=d(this),j=d.extend({},r.defaults,b);h&&(j.url=h);var a=j.loadmsgElm||'<div class="loading" />',c=(r.i18n[e.closest('*[lang]').attr('lang')]||{}).loading||r.i18n.en.loading;if(a.charAt){a=a.replace(/%\{msg\}/g,c)}a=j.loadmsgElm=d(a);if(!a.text()){a.append(c)}e.data(l,{cfg:j,$$empty:1})}).bind('click submit',M);b.url&&g[l]('load',b.url)}return this};r.defaults={loadmsgMode:'none'};r.i18n={en:{loading:'Loading...'},is:{loading:'Sæki gögn...'}}})(jQuery);
