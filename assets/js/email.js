(function () {
    'use strict';

    function constructMailto(user, domain, subject) {
        var mail = user + '@' + domain;
        if (subject) {
            return 'mailto:' + mail + '?subject=' + encodeURIComponent(subject);
        }
        return 'mailto:' + mail;
    }

    function onClick(e) {
        var el = e.currentTarget;
        e.preventDefault();
        var user = el.getAttribute('data-user');
        var domain = el.getAttribute('data-domain');
        var subject = el.getAttribute('data-subject');
        if (!user || !domain) return;
        var mailto = constructMailto(user, domain, subject);
        // Trigger navigation to mailto without leaving a static mailto in the DOM
        window.location.href = mailto;
    }

    function init() {
        var els = document.querySelectorAll('a.js-mailto');
        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            // make it keyboard-accessible
            if (!el.getAttribute('role')) el.setAttribute('role', 'button');
            if (!el.getAttribute('tabindex')) el.setAttribute('tabindex', '0');
            el.addEventListener('click', onClick);
            el.addEventListener('keypress', function (e) { if (e.key === "Enter" || e.key === " ") { onClick(e); } });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();