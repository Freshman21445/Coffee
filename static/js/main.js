<meta name='viewport' content='width=device-width, initial-scale=1'/><script>document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll(".nav-item");
    const frame = document.getElementById("content-frame");

    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            navItems.forEach((i) => i.classList.remove("active"));
            item.classList.add("active");
            frame.src = item.dataset.src;
        });
    });

    // Allow iframe pages (e.g. home.html feature icons) to request navigation
    // without needing to know they're inside an iframe/bottom-nav shell.
    window.addEventListener("message", (event) => {
        if (event.origin !== window.location.origin) return;
        if (event.data && event.data.type === "navigate" && event.data.url) {
            navItems.forEach((i) => i.classList.remove("active"));
            frame.src = event.data.url;
        }
    });
});</script>
