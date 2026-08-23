// ============================================================
// MAIN.JS - Bottom Navigation (NO DOMContentLoaded wrapper)
// ============================================================

// Wait a tiny moment for the iframe to be ready
setTimeout(() => {
    const navItems = document.querySelectorAll(".nav-item");
    const frame = document.getElementById("content-frame");

    if (navItems.length === 0) {
        console.warn("⚠️ No nav items found!");
        return;
    }

    navItems.forEach((item) => {
        item.addEventListener("click", function() {
            navItems.forEach((i) => i.classList.remove("active"));
            this.classList.add("active");
            const src = this.dataset.src;
            if (frame) {
                frame.src = src;
                console.log("🔍 Navigated to:", src);
            }
        });
    });

    // Allow iframe pages to request navigation via postMessage
    window.addEventListener("message", (event) => {
        // Accept postMessage from same origin OR any origin (for iframes)
        if (event.data && event.data.type === "navigate" && event.data.url) {
            navItems.forEach((i) => i.classList.remove("active"));
            if (frame) {
                frame.src = event.data.url;
                console.log("🔍 Navigated via message:", event.data.url);
            }
        }
    });

    console.log("✅ Bottom navigation initialized successfully.");
}, 50);
