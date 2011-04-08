// encoding: utf-8
// jQuery.fn.virtualBrowser 1.1 - MIT/GPL Licensed - More info: http://github.com/maranomynet/virtualbrowser/
(function(e,s){e.injectBaseHrefToHtml=function(d,j){var f=j.split('#')[0],a=f[l](/([^?]*\/)?(.*)/,'$2'),c=f.split('?')[0][l](/(.*\/)?.*/,'$1');d=d[l](/(<[^>]+ (href|src|action)=["'])(["'#])/gi,'$1'+a+'$3')[l](/(<[^>]+ (href|src|action)=["'])\?/gi,'$1'+a.split('?')[0]+'?')[l](/(["'])([a-z]{3,12}:)/gi,'$1`<<`>>$2')[l](/(<[^>]+ (href|src|action)=["'])([^\/`])/gi,'$1'+c+'$3')[l](/\`<<`>>/g,'');return d};e.getResultBody=function(d){return e('<div/>').append(e(d||[]).not('script,title,meta,link,style').find('script,style').remove().end())};var D=document.location,z='isDefaultPrevented',E='preventDefault',v='stopPropagation',t='passThrough',m='virtualBrowser',F='VBbeforeload',G='VBload',H='VBerror',I='VBloaded',J='VBdisengaged',l='replace',o='resultDOM',p='result',K=/^(https?:)?\/\//,L={'load':function(a){var c=typeof a!='string'?e(a):s,g=e(this),k=g.data(m),h=k.cfg,i=e.Event(F),q,r,b={elm:c},M;if(k.$$empty){b.isFirst=true;delete k.$$empty}if(c){a=c.attr('href');a=a===s?c.attr('action'):a}a=b.url=a===''?D.href:a;if(a){i[v]();g.trigger(i,[b]);if(!i[t]&&((i[t]===s&&c&&c[0].target&&c[0].target!=window.name)||(/^([a-z]{3,12}:|\/\/)/i.test(a)&&!a.toLowerCase()[l](K,'').indexOf(D.href.toLowerCase()[l](K,'').split('/')[0])==0))){i[t]=true}i[t]&&i[E]();if(!i[z]()){var R=b.noCache=b.noCache!==s?b.noCache:h.noCache,n=h.params||'',w='GET';if(c&&c.is('form')){w=c.attr('method')||w;n+='&'+c.serialize();var x=k._0;if(x){var A=x.elm;if(A.is(':image')){var N=A[0].name;n+='&'+N+'.x='+Math.round(x.X)+'&'+N+'.y='+Math.round(x.Y)}else{n+='&'+e.param(A)}delete k._0}n=n.replace(/^&+|&+$/g,'');var O='multipart/form-data';i._1=c.attr('enctype')==O||c.attr('encoding')==O||!!c.find('input:file')[0]}b.params=n;b.method=w;g.addClass(h.loadingClass);if(h.loadmsgElm){M=setTimeout(function(){h.loadmsgMode=='replace'&&g.empty();g.append(h.loadmsgElm)},0)}var y={url:b.url.split('#')[0],data:n,type:w,cache:!R,complete:function(d,j){clearTimeout(M);g.removeClass(h.loadingClass||'');b.xhr=d;b.status=j||'error';var f=!j||j=='error';if(f){g.trigger(H,[b])}else{b[p]=e.injectBaseHrefToHtml(d.responseText||'',b.url)}if(b[p]&&h.selector){b[o]=e.getResultBody(b[p]).find(h.selector)}if(!f||b[p]||b[o]){q=e.Event(G);q[v]();g.trigger(q,[b]);if(!q[z]()){r=e.Event(I);r[v]();h.loadmsgElm&&h.loadmsgElm.detach();b[o]=b[o]||e.getResultBody(b[p]).contents();g.empty().append(b[o]);k.lastRequest=b;g.trigger(r,[b]);delete b[o];delete b[p]}}delete b.xhr;if(h.disengage){g[m]('disengage')}}};if(!i._1){e.ajax(y)}else{y=e.extend({},y);var P='if'+(new Date).getTime(),B=e('<iframe name="'+P+'" src=\'javascript:"";\' style="position:absolute;top:-999em;left:-999em;visibility:hidden;" />').appendTo('body'),C=c.attr('action')||'',S=c.attr('target')||'';c.attr('target',P);if(h.params){c.attr('action',C+(/\?/.test(C)?'&':'?')+h.params)}B.bind('load',function(){var d='success';y.complete({fakeXHR:'iframe',responseText:'<html>'+B.contents().find('html').html()+'</html>'},d);c.attr({target:S,action:C});setTimeout(function(){B.remove()},0)})}}}return i},'data':function(){return e(this).data(m)},'disengage':function(){var d=e(this);d.removeData(m).unbind('click submit',Q).unbind([F,H,G,I].join(' ')).trigger(J).unbind(J)}},Q=function(d){var j=d.type=='submit',f=e(d.target).closest(j?'form':'[href], input:submit, button:submit, input:image');if(f[0]){if(!d[z]()){if(f.is('input, button')){if(!f[0].disabled){var a=e(this).data(m);if(f.is(':image')){var c=f.offset();a._0={elm:f,X:d.pageX-c.left,Y:d.pageY-c.top}}else if(f.is('[name]')){a._0={elm:f}}setTimeout(function(){delete a._0},0)}}else{var g=L['load'].call(this,f);if(!g[t]){!g._1&&d[E]();g.isPropagationStopped()&&d[v]()}}}}},u=e.fn[m]=function(k,h){var i=this,q=typeof k=='string';if(q){var r=L[k],b;if(r){i.each(function(d){var j=r.apply(this,[].concat(h));if(!d){b=j}})}if(b!==s){return b}}else{i.each(function(){var f=e(this),a=e.extend({},u.defaults,k);e.each(['Beforeload','Error','Load','Loaded','Disengaged'],function(d,j){d='on'+j;a[d]&&i.bind('VB'+j.toLowerCase(),a[d]);delete a[d]});a.params=typeof a.params=='string'?a.params:e.param(a.params||{});h&&(a.url=h);if(a.loadmsgMode!='none'){var c=a.loadmsgElm||'<div class="loading" />',g=(u.i18n[f.closest('*[lang]').attr('lang')]||{}).loading||u.i18n.en.loading;if(c.charAt){c=c.replace(/%\{msg\}/g,g)}c=a.loadmsgElm=e(c);if(!c.text()){c.append(g)}}else{delete a.loadmsgElm}f.data(m,{cfg:a,$$empty:1});a.url&&f[m]('load',a.url)}).bind('click submit',Q)}return this};u.defaults={loadmsgMode:'none'};u.i18n={en:{loading:'Loading...'},is:{loading:'Sæki gögn...'}}})(jQuery);
