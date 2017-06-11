angular.module('app', [])
    .directive('ncTitle', title)
    .constant('appVersion', 1)
    .factory('preventTemplateCache', preventTemplateCache)
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('preventTemplateCache');
    });

function preventTemplateCache(appVersion) {
    return {
        'request': function (config) {
            if (config.method === 'GET' && config.url.endsWith('.html') !== -1) {
                config.url = config.url + '?v=' + appVersion;
            }

            return config;
        }
    }
}

function title() {
    return {
        restrict: 'E',
        templateUrl: 'app/templates/title.template.html'
    };
}