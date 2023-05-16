(function() {
  "use strict";
  'use strict';

  var app = angular.module('viewCustom', ['angularLoad', 'matomoAnalytics']);
  /****************************************************************************************************/
  /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/
  /*var app = angular.module('centralCustom', ['angularLoad']);*/
  /****************************************************************************************************/


  // Enhance no results
  app.controller('prmNoSearchResultAfterController', [function() {
    var vm = this;
    vm.getSearchTerm = getSearchTerm;

    function getSearchTerm() {
      return vm.parentCtrl.term;
    }
  }]);

  app.component('prmNoSearchResultAfter', {
    bindings: {
      parentCtrl: '<'
    },
    controller: 'prmNoSearchResultAfterController',
    template: '<md-card class="default-card zero-margin _md md-primoExplore-theme">\n\t\t\t\t\t<md-card-title>\n\t\t\t\t\t\t<md-card-title-text>\n\t\t\t\t\t\t\t<span translate="" class="md-headline ng-scope">No records found</span>\n\t\t\t\t\t\t</md-card-title-text>\n\t\t\t\t\t</md-card-title>\n\t\t\t\t\t<md-card-content>\n\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t<span>There are no results matching your search:\n\t\t\t\t\t\t<blockquote><i>{{$ctrl.getSearchTerm()}}</i>.</blockquote>\n\t\t\t\t\t\t<!-- Update to your domain and view code -->\n\t\t\t\t\t\t<a href="https://mines.primo.exlibrisgroup.com/discovery/search?query=any,contains,{{$ctrl.getSearchTerm()}}&tab=Everything&search_scope=MyInst_and_CI&vid=01COLSCHL_INST:MINES&offset=0&sortby=rank&pcAvailability=true"><b>Try again and include items with no full text?</b></a>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</p>\n\t\t\t\t\t\t<p><span translate="" class="bold-text ng-scope">Suggestions:</span></p>\n\t\t\t\t\t\t<ul><li translate="" class="ng-scope">Make sure that all words are spelled correctly.</li>\n\t\t\t\t\t\t<li translate="" class="ng-scope">Try a different search scope.</li>\n\t\t\t\t\t\t<li translate="" class="ng-scope">Try different search terms.</li>\n\t\t\t\t\t\t<li translate="" class="ng-scope">Try more general search terms.</li>\n\t\t\t\t\t\t<li translate="" class="ng-scope">Try fewer search terms.</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<!-- Other helpful links -->\n\t\t\t\t\t\t<p><b><a href="http://www.worldcat.org/">Search WorldCat</a></b></p>\n\t\t\t\t\t\t<p><b><a href="http://mines.libanswers.com/form.php?queue_id=2217">Contact a Research Librarian for Assistance</a></b></p>\n\t\t\t\t\t</md-card-content>\n\t\t\t\t   </md-card>'
  });


  /** Altmetrics **/
  app.controller('FullViewAfterController', ['angularLoad', '$http', '$scope', '$element', '$timeout', '$window', function(angularLoad, $http, $scope, $element, $timeout, $window) {
    var vm = this;
    this.$http = $http;
    this.$element = $element;
    this.$scope = $scope;
    this.$window = $window;

    vm.$onInit = function() //wait for all the bindings to be initialised
    {

      vm.parentElement = this.$element.parent()[0]; //the prm-full-view container

      try {
        vm.doi = vm.parentCtrl.item.pnx.addata.doi[0] || '';
      } catch (e) {
        return;
      }

      if (vm.doi) {
        //If we've got a doi to work with check whether altmetrics has data for it.
        //If so, make our div visible and create a new Altmetrics service
        $timeout(function() {
          $http.get('https://api.altmetric.com/v1/doi/' + vm.doi).then(function() {
            try {
              //Get the altmetrics widget
              angularLoad.loadScript('https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js?' + Date.now()).then(function() {});
              //Create our new Primo service
              var altmetricsSection = {
                scrollId: "altmetrics",
                serviceName: "altmetrics",
                title: "brief.results.tabs.Altmetrics"
              };
              vm.parentCtrl.services.splice(vm.parentCtrl.services.length, 0, altmetricsSection);
            } catch (e) {
              console.log(e);
            }
          }).catch(function(e) {
            return;
          });
        }, 3000);
      }


      //move the altmetrics widget into the new Altmetrics service section
      var unbindWatcher = this.$scope.$watch(function() {
        return vm.parentElement.querySelector('h4[translate="brief.results.tabs.Altmetrics"]');
      }, function(newVal, oldVal) {
        if (newVal) {
          //Get the section body associated with the value we're watching
          let altContainer = newVal.parentElement.parentElement.parentElement.parentElement.children[1];
          let almt1 = vm.parentElement.children[1].children[0];
          if (altContainer && altContainer.appendChild && altm1) {
            altContainer.appendChild(altm1);
          }
          unbindWatcher();
        }
      });
    }; // end of $onInit


    //You'd also need to look at removing the various css/js scripts loaded by this.
    //refer to: https://github.com/Det-Kongelige-Bibliotek/primo-explore-rex
    vm.$onDestroy = function() {
      if (this.$window._altmetric) {
        delete this.$window._altmetric;
      }

      if (this.$window._altmetric_embed_init) {
        delete this.$window._altmetric_embed_init;
      }

      if (this.$window.AltmetricTemplates) {
        delete this.$window.AltmetricTemplates;
      }
    }

  }]);

  app.component('prmFullViewAfter', {
    bindings: {
      parentCtrl: '<'
    },
    controller: 'FullViewAfterController',
    template: '<div id="altm1" ng-if="$ctrl.doi" class="altmetric-embed" data-hide-no-mentions="true"  data-link-target="new" data-badge-type="medium-donut" data-badge-details="right" data-doi="{{$ctrl.doi}}"></div>'
  });
  /** Altmetrics **/

  //Matomo tracking code - adapted from Cal State Dominguez Hills (csudhlib)

  angular.module('matomoAnalytics', []);
  angular.module('matomoAnalytics').run(function($rootScope, $interval, analyticsOptions) {
    if (analyticsOptions.hasOwnProperty("enabled") && analyticsOptions.enabled) {
      if (analyticsOptions.hasOwnProperty("siteId") && analyticsOptions.siteId != '' && analyticsOptions.hasOwnProperty("siteUrl") && analyticsOptions.siteUrl != '') {
        if (typeof _paq === 'undefined') {
          window['_paq'] = [];
          _paq.push(["setDomains", ["*.mines.primo.exlibrisgroup.com/"]]);
          _paq.push(["setDoNotTrack", true]);
          (function() {
            _paq.push(['setTrackerUrl', analyticsOptions.siteUrl + 'piwik.php']);
            _paq.push(['setSiteId', analyticsOptions.siteId]);
            var d = document,
              g = d.createElement('script'),
              s = d.getElementsByTagName('script')[0];
            g.type = 'text/javascript';
            g.async = true;
            g.defer = true;
            g.src = analyticsOptions.siteUrl + 'piwik.js';
            s.parentNode.insertBefore(g, s);
          })();
        }
      }
      $rootScope.$on('$locationChangeSuccess', function(event, toState, fromState) {
        if (analyticsOptions.hasOwnProperty("defaultTitle")) {
          var documentTitle = analyticsOptions.defaultTitle;
          var timerStart = Date.now();
          var interval = $interval(function() {
            if (document.title !== '') documentTitle = document.title;
            if (window.location.pathname.indexOf('openurl') !== -1 || window.location.pathname.indexOf('fulldisplay') !== -1)
              if (angular.element(document.querySelector('prm-full-view-service-container .item-title>a')).length === 0) return;
              else documentTitle = angular.element(document.querySelector('prm-full-view-service-container .item-title>a')).text();

            if (typeof _paq !== 'undefined') {
              if (fromState != toState) _paq.push(['setReferrerUrl', fromState]);
              _paq.push(['setCustomUrl', toState]);
              _paq.push(['setDocumentTitle', documentTitle]);
              _paq.push(['setGenerationTimeMs', Date.now() - timerStart]);
              _paq.push(['enableLinkTracking']);
              _paq.push(['enableHeartBeatTimer']);
              _paq.push(['trackPageView']);
            }
            $interval.cancel(interval);
          }, 0);
        }
      });
    }
  });
  angular.module('matomoAnalytics').value('analyticsOptions', {
    enabled: true,
    siteId: '3',
    siteUrl: '//mineslibrary.matomo.cloud/',
    defaultTitle: 'Catalog Search'
  });

  //End Matomo

  // Begin BrowZine - Primo Integration...
  window.browzine = {
    api: "https://public-api.thirdiron.com/public/v1/libraries/1252",
    apiKey: "f38c0e72-a3e3-4b82-b33c-2864ef23c166",

    journalCoverImagesEnabled: true,

    journalBrowZineWebLinkTextEnabled: true,
    journalBrowZineWebLinkText: "View Journal Contents",

    articleBrowZineWebLinkTextEnabled: true,
    articleBrowZineWebLinkText: "View Issue Contents",

    articlePDFDownloadLinkEnabled: true,
    articlePDFDownloadLinkText: "Download PDF",

    articleLinkEnabled: true,
    articleLinkText: "Read Article",

    printRecordsIntegrationEnabled: true,

    unpaywallEmailAddressKey: "libsys@mines.edu",

    articlePDFDownloadViaUnpaywallEnabled: true,
    articlePDFDownloadViaUnpaywallText: "Download PDF (via Unpaywall)",

    articleLinkViaUnpaywallEnabled: true,
    articleLinkViaUnpaywallText: "Read Article (via Unpaywall)",

    articleAcceptedManuscriptPDFViaUnpaywallEnabled: true,
    articleAcceptedManuscriptPDFViaUnpaywallText: "Download PDF (Accepted Manuscript via Unpaywall)",

    articleAcceptedManuscriptArticleLinkViaUnpaywallEnabled: true,
    articleAcceptedManuscriptArticleLinkViaUnpaywallText: "Read Article (Accepted Manuscript via Unpaywall)",
  };

  browzine.script = document.createElement("script");
  browzine.script.src = "https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js";
  document.head.appendChild(browzine.script);

  app.controller('prmSearchResultAvailabilityLineAfterController', function($scope) {
    window.browzine.primo.searchResult($scope);
  });

  app.component('prmSearchResultAvailabilityLineAfter', {
    bindings: {
      parentCtrl: '<'
    },
    controller: 'prmSearchResultAvailabilityLineAfterController'
  });
  // ... End BrowZine - Primo Integration
})();