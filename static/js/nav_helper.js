// Navigation helper for pages inside the iframe
document.addEventListener("DOMContentLoaded", () => {
    // Handle all links with data-navigate attribute
    document.querySelectorAll("[data-navigate]").forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const url = link.dataset.navigate;
            if (window.parent && window.parent !== window) {
                window.parent.postMessage({ type: "navigate", url: url }, "*");
            } else {
                window.location.href = url;
            }
        });
    });
});
