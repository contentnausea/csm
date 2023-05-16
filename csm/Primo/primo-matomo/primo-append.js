// Matomo tracking code - v1
//Adds tracking code to head as a template literal
//Pageview data sends to Matomo


//Matomo tracking code

var matomoScript = document.createElement("script");
matomoScript.type = "text/javascript";
matomoScript.innerHTML = `var _paq = window._paq || [];
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="https://mineslibrary.matomo.cloud/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '2']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src='//cdn.matomo.cloud/mineslibrary.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
  })();`;

document.head.appendChild(matomoScript);