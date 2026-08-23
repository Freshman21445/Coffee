<meta name='viewport' content='width=device-width, initial-scale=1'/><script>/*
 * theme.js â€" shared dark/light mode logic.
 * Include this in every page. It:
 *   1. Applies the saved theme immediately (before paint, via inline call)
 *   2. Exposes window.toggleTheme() for toggle buttons to call
 *   3. Syncs theme across the app shell + all iframe pages via localStorage
 */

(function () {
    function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
    }

    function getSavedTheme() {
        return localStorage.getItem("thecoffee-theme") || "dark";
    }

    // Apply immediately on script load (this file is included at top of <head> when possible)
    applyTheme(getSavedTheme());

    window.toggleTheme = function () {
        const current = getSavedTheme();
        const next = current === "dark" ? "light" : "dark";
        localStorage.setItem("thecoffee-theme", next);
        applyTheme(next);
        // Update any toggle switches on this page
        document.querySelectorAll("[data-theme-toggle]").forEach((el) => {
            el.classList.toggle("is-dark", next === "dark");
        });
        // If this page is the top-level app shell, tell the iframe to re-sync
        const frame = document.getElementById("content-frame");
        if (frame && frame.contentWindow) {
            try {
                frame.contentWindow.postMessage({ type: "theme-sync", theme: next }, "*");
            } catch (e) { /* cross-origin safety no-op */ }
        }
    };

    // Listen for sync messages (used inside iframe pages)
    window.addEventListener("message", (event) => {
        if (event.origin !== window.location.origin) return;
        if (event.data && event.data.type === "theme-sync") {
            applyTheme(event.data.theme);
        }
    });

    document.addEventListener("DOMContentLoaded", () => {
        const isDark = getSavedTheme() === "dark";
        document.querySelectorAll("[data-theme-toggle]").forEach((el) => {
            el.classList.toggle("is-dark", isDark);
        });
    });
})();</script>