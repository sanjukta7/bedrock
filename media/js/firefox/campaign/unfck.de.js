/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

(function() {
    'use strict';

    // Twitter share
    function openTwitterSubwin(url) {
        var width = 550;
        var height = 420;
        var options = {
            'scrollbars': 'yes',
            'resizable': 'yes',
            'toolbar': 'no',
            'location': 'yes',
            'width': width,
            'height': height,
            'top': screen.height > height ? Math.round((screen.height / 2) - (height / 2)) : 0,
            'left': Math.round((screen.width / 2) - (width / 2))
        };

        window.open(url, 'twitter_share', window._SearchParams.objectToQueryString(options).replace(/&/g, ',')).focus();
    }

    function handleShareSubmit(e) {
        var input = document.querySelector('.c-tell-input');
        var url = document.querySelector('.c-tell').getAttribute('action');

        if (input && input.value) {
            var text = encodeURIComponent(input.value);

            url += '&text=' + text + '&hashtags=unfcktheinternet&via=firefox_DE';
            // Track the event in GA
            window.dataLayer.push({
                'event': 'in-page-interaction',
                'eAction': 'checklist',
                'eLabel': 'share: tweet'
            });

            // Open Twitter in a sub window
            openTwitterSubwin(url);
            e.preventDefault();
        }
    }

    function onLoad() {
        // Set up twitter submit button handler
        var shareButton = document.querySelector('.js-tell-button');

        shareButton.addEventListener('click', handleShareSubmit, false);
    }

    window.Mozilla.run(onLoad);
})();


/*
    Download GIF
*/
(function() {
    'use strict';

    function watchDownloads() {
        var downloadLinks = document.querySelectorAll('.js-download-gif');

        for (var i = 0; i < downloadLinks.length; i++) {
            downloadLinks[i].addEventListener('click', function(e) {
                var item = e.target.closest('.c-item-unfck');
                // Track the event in GA
                window.dataLayer.push({
                    'event': 'in-page-interaction',
                    'eAction': 'checklist',
                    'eLabel': 'download: ' + item.id,
                });
            }, false);
        }
    }

    window.Mozilla.run(watchDownloads);

})();
