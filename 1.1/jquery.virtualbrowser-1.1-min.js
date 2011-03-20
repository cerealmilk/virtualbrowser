// encoding: utf-8
// jQuery.fn.virtualBrowser 1.1 - MIT/GPL Licensed - More info: http://github.com/maranomynet/virtualbrowser/
(function(d,o){d.injectBaseHrefToHtml=function(e,h){var b=h.split('#')[0],f=b[k](/([^?]*\/)?(.*)/,'$2'),a=b.split('?')[0][k](/(.*\/)?.*/,'$1');e=e[k](/(<[^>]+ (href|src|action)=["'])(["'#])/gi,'$1'+f+'$3')[k](/(<[^>]+ (href|src|action)=["'])\?/gi,'$1'+f.split('?')[0]+'?')[k](/(["'])([a-z]{3,12}:)/gi,'$1`<<`>>$2')[k](/(<[^>]+ (href|src|action)=["'])([^\/`])/gi,'$1'+a+'$3')[k](/\`<<`>>/g,'');return e};d.getResultBody=function(e){return d('<div/>').append(d(e||[]).not('script,title,meta,link,style').find('script,style').remove().end())};var z=document.location,u='isDefaultPrevented',A='preventDefault',r='stopPropagation',p='passThrough',l='virtualBrowser',v='VBbeforeload',w='VBdestroyed',x='VBload',y='VBloaded',k='replace',B=/^(https?:)?\/\//,C={'load':function(b){var f=typeof b!='string'?d(b):o,a=d(this),j=a.data(l),g=j.cfg,i=d.Event(v),m,n,D=g.loadmsgMode,c={elm:f};if(j.$$empty){c.isFirst=true;delete j.$$empty}if(f){b=f.attr('href');b=b===o?f.attr('action'):b}b=c.url=b===''?z.href:b;if(b){i[r]();a.trigger(i,c);if(!i[p]&&((i[p]===o&&f&&f[0].target&&f[0].target!=window.name)||(/^([a-z]{3,12}:|\/\/)/i.test(b)&&!b.toLowerCase()[k](B,'').indexOf(z.href.toLowerCase()[k](B,'').split('/')[0])==0))){i[p]=true}i[p]&&i[A]();if(!i[u]()){var G=c.noCache=c.noCache!==o?c.noCache:g.noCache,s=g.params||'',t='GET';if(f&&f.is('form')){t=f.attr('method')||t;s+='&'+f.serialize();var E=j._0;if(E){s+='&'+d.param(E);delete j._0}}c.params=s;c.method=t;d.ajax({url:c.url.split('#')[0],data:s,type:t,cache:!G,complete:function(e,h){c.result=d.injectBaseHrefToHtml(e.responseText,c.url);c.xhr=e;c.status=h;if(g.selector){c.resultDOM=d.getResultBody(c.result).find(g.selector)}m=d.Event(x);m[r]();a.trigger(m,c);if(!m[u]()){n=d.Event(y);n[r]();g.loadmsgElm.detach();c.resultDOM=c.resultDOM||d.getResultBody(c.result).contents();a.empty().append(c.resultDOM);j.lastRequest=c;a.trigger(n,c);delete c.resultDOM;delete c.result;delete c.xhr}if(g.disengage){a[l]('destroy')}}});if(D&&D!='none'){g.loadmsgMode=='replace'&&a.empty();a.append(g.loadmsgElm)}}}return i},'data':function(){return d(this).data(l)},'destroy':function(){var e=d(this);e.removeData(l).unbind('click submit',F).unbind(x+' '+y+' '+v).trigger(w).unbind(w)}},F=function(e){var h=d(e.target).closest(e.type=='click'?'[href], input:submit, button:submit':'form');if(h[0]){if(!e[u]()){if(!h.is(':submit')){var b=C['load'].call(this,h);if(!b[p]){e[A]();b.isPropagationStopped()&&e[r]()}}else if(h.is('[name]')){var f=d(this).data(l);f._0=h;setTimeout(function(){delete f._0},0)}}}},q=d.fn[l]=function(a,j){var g=this,i=typeof a=='string';if(i){var m=C[a],n;if(m){g.each(function(e){var h=m.apply(this,[].concat(j));if(!e){n=h}})}if(n!==o){return n}}else{g.each(function(){var e=d(this),h=d.extend({},q.defaults,a);j&&(h.url=j);var b=h.loadmsgElm||'<div class="loading" />',f=(q.i18n[e.closest('*[lang]').attr('lang')]||{}).loading||q.i18n.en.loading;if(b.charAt){b=b.replace(/%\{msg\}/g,f)}b=h.loadmsgElm=d(b);if(!b.text()){b.append(f)}e.data(l,{cfg:h,$$empty:1})}).bind('click submit',F);a.onLoad&&g.bind(x,a.onLoad);a.onLoaded&&g.bind(y,a.onLoaded);a.onBeforeload&&g.bind(v,a.onBeforeload);a.onDestroyed&&g.bind(w,a.onDestroyed);a.params=typeof a.params=='string'?a.params:d.param(a.params||{});a.url&&g[l]('load',a.url)}return this};q.defaults={loadmsgMode:'none'};q.i18n={en:{loading:'Loading...'},is:{loading:'Sæki gögn...'}}})(jQuery);
