/**
 * @ngdoc Directive
 * @name parkalot.directive:paLanguageSwitcher
 * @description Provides a language switcher component which can be used
 *              to change UI language and retranslate all visible strings. Currently
 *              the supported UI translations are English (en_US) and Greek (el_GR).
 *              NOTE: This directive currently works in theme header.html
 * 
 *              Usage:
 *                 Element: <pa-language-switcher></pa-language-switcher>
 *                 Attribute: <li class="dropdown dropdown-language" pa-language-switcher></li>
 */
(function() {
    'use strict';

    angular
        .module('parkalot')
        .directive('paLanguageSwitcher', paLanguageSwitcher);

    paLanguageSwitcher.inject = ['$translate', '$state', '$rootScope'];
    function paLanguageSwitcher($translate, $state, $rootScope) {


        // Usage:
        //       <li class="dropdown dropdown-language" pa-language-switcher></li>
        // Creates: 
        //       See /js/scripts/common/language.switcher.directive.html
        //
        var directive = {
            templateUrl: 'js/scripts/common/language.switcher.directive.html',
            link: link,
            restrict: 'EA',
            scope: {

            }
        };

        // Private global variables
        var langToFlag = {
            'el': 'gr',
            'en': 'us'
        };
        var currentLanguage = 'el';

        return directive;

        function link(scope, element, attrs) {

            // Create function pointers to exposed functions
            scope.toggleLanguage = toggleLanguage;
            scope.getSelectedLanguageLabel = getSelectedLanguageLabel;
            scope.getIconFlagLanguage = getIconFlagLanguage;
            scope.getActiveLanguageClass = getActiveLanguageClass;

            // initialise directive
            initUiTranslation();
        };

        function initUiTranslation() {

            // Current language is system default
            // directive.scope.currentLang = (($rootScope.contentLanguage !== undefined) || ($rootScope.contentLanguage !== '')) ? $rootScope.contentLanguage : $translate.use();

            if ((!angular.isUndefined($rootScope.contentLanguage)) && ($rootScope.contentLanguage !== null)) {

                currentLanguage = $rootScope.contentLanguage;

            } else {

                currentLanguage = $translate.use();

            }

            $translate.use(currentLanguage);
        };

        function toggleLanguage(selectedLanguage) {

            selectedLanguage = ((selectedLanguage === undefined) || (selectedLanguage === null)) ? 'el' : selectedLanguage.toLowerCase();

            currentLanguage = (selectedLanguage === 'el') ? 'el' : 'en';
            retranslate();
        };

        function retranslate() {
            // force UI retranslation
            $translate.use(currentLanguage);

            $state.reload();
        };

        function getSelectedLanguageLabel() {
            return currentLanguage.toUpperCase();
        };

        function getActiveLanguageClass(selectedLanguage) {
            return (currentLanguage === selectedLanguage) ? 'active' : '';
        };

        /**
         * Returns the opposite language of the current ui language.
         * Thus, we show the language to which the UI will be
         * translated if the user clicks on the icon.
         *
         * For example if UI is currently in 'el' language, this
         * function will return 'gr'. Else it will return 'us'.
         *
         * @returns {string} a string which at the time being can be either 'en' or 'el'.
         */
        function getIconFlagLanguage() {
            return langToFlag[currentLanguage];
        };
    }
})();