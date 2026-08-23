
/*
 * nav_helper.js â€” include on any iframe-loaded page that has links which
 * should navigate the parent app shell (bottom-nav + iframe) instead of
 * navigating inside the iframe itself.
 *
 * Usage: <a href="#" data-navigate="/app/bindbank">Bind Bank</a>
 */

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-navigate]").forEach((el) => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            const url = el.dataset.navigate;
            if (window.parent && window.parent !== window) {
                window.parent.postMessage({ type: "navigate", url: url }, "*");
            } else {
                window.location.href = url;
            }
        });
    });
});
