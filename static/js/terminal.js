window.CustomTerminal = (function () {
    const containerId = "custom-terminal";
    const bodyId = "custom-terminal-body";
    const clearButtonId = "terminal-clear-btn";
    let container = null;
    let body = null;
    let clearButton = null;
    let initialized = false;
    const readyCallbacks = [];
    let readyDispatched = false;
    const defaultMessages = {
        started: 'Terminal started...',
        cleared: 'Terminal cleared.'
    };
    const messages = { ...defaultMessages };

    function notifyReady() {
        if (!initialized || readyDispatched) {
            return;
        }

        readyDispatched = true;

        while (readyCallbacks.length) {
            const callback = readyCallbacks.shift();
            try {
                callback();
            } catch (error) {
                console.error('[CustomTerminal] onReady callback failed.', error);
            }
        }

        try {
            window.dispatchEvent(new CustomEvent('CustomTerminalReady', {
                detail: { containerId, bodyId }
            }));
        } catch (error) {
            console.error('[CustomTerminal] Failed to dispatch ready event.', error);
        }
    }

    function onReady(callback) {
        if (typeof callback !== 'function') {
            return;
        }

        if (initialized) {
            callback();
        } else {
            readyCallbacks.push(callback);
        }
    }

    function init() {
        if (initialized) {
            return;
        }
        container = document.getElementById(containerId);
        body = document.getElementById(bodyId);
        clearButton = document.getElementById(clearButtonId);

        if (!container || !body) {
            return;
        }

        if (container.dataset) {
            if (container.dataset.terminalLang) {
                const langCode = container.dataset.terminalLang.toLowerCase();
                if (langCode.startsWith('es')) {
                    messages.started = 'Terminal iniciado...';
                    messages.cleared = 'Terminal limpiado.';
                } else if (langCode.startsWith('en')) {
                    messages.started = defaultMessages.started;
                    messages.cleared = defaultMessages.cleared;
                }
            }
            if (container.dataset.terminalStarted) {
                messages.started = container.dataset.terminalStarted;
            }
            if (container.dataset.terminalCleared) {
                messages.cleared = container.dataset.terminalCleared;
            }
        }

        if (clearButton) {
            clearButton.addEventListener('click', clear);
        }

        initialized = true;

        if (body && body.childElementCount === 0 && messages.started) {
            write(messages.started);
        }

        notifyReady();
    }

    function write(text, isPrompt = false) {
        if (!body || text == null) {
            return;
        }
        const pre = document.createElement('pre');
        pre.className = isPrompt ? 'prompt' : 'output';
        pre.textContent = (isPrompt ? '> ' : '') + text;
        body.appendChild(pre);
        body.scrollTop = body.scrollHeight;
    }

    function clear() {
        if (!body) {
            return;
        }
        body.innerHTML = '';
        if (messages.cleared) {
            const pre = document.createElement('pre');
            pre.className = 'output';
            pre.textContent = messages.cleared;
            body.appendChild(pre);
        }
        body.scrollTop = body.scrollHeight;
    }

    document.addEventListener("DOMContentLoaded", init);

    const api = {
        write,
        clear,
        onReady,
        get initialized() {
            return initialized;
        }
    };

    return api;
})();