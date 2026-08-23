<meta name='viewport' content='width=device-width, initial-scale=1'/><script>/*
 * interactive.js â€" shared v2 interactivity layer.
 * Include on every page (alongside theme.js). Provides:
 *   1. Ambient gradient mesh background (auto-injected)
 *   2. Animated number counters (data-counter="1234.56")
 *   3. Scroll-reveal for elements below the fold (adds .reveal on enter)
 *   4. Subtle 3D tilt-on-hover for elements with .tilt-card (pointer devices only)
 */

(function () {
    // ---------- 1. Ambient mesh background ----------
    document.addEventListener("DOMContentLoaded", () => {
        if (!document.querySelector(".ambient-mesh")) {
            const mesh = document.createElement("div");
            mesh.className = "ambient-mesh";
            document.body.prepend(mesh);
        }
    });

    // ---------- 2. Animated number counters ----------
    function animateCounter(el) {
        const target = parseFloat(el.dataset.counter);
        if (isNaN(target)) return;

        const decimals = el.dataset.counterDecimals !== undefined
            ? parseInt(el.dataset.counterDecimals, 10)
            : (target % 1 !== 0 ? 2 : 0);
        const prefix = el.dataset.counterPrefix || "";
        const suffix = el.dataset.counterSuffix || "";
        const duration = 900;
        const start = performance.now();
        const from = 0;

        function easeOutExpo(t) {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        }

        function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutExpo(progress);
            const value = from + (target - from) * eased;
            el.textContent = prefix + value.toLocaleString(undefined, {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
            }) + suffix;

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                el.textContent = prefix + target.toLocaleString(undefined, {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals,
                }) + suffix;
            }
        }
        requestAnimationFrame(tick);
    }

    function initCounters(root) {
        (root || document).querySelectorAll("[data-counter]").forEach((el) => {
            if (el.dataset.counterDone) return;
            el.dataset.counterDone = "1";
            animateCounter(el);
        });
    }

    // ---------- 3. Scroll-reveal ----------
    function initScrollReveal(root) {
        const targets = (root || document).querySelectorAll(".reveal-on-scroll:not(.reveal)");
        if (!targets.length) return;

        if (!("IntersectionObserver" in window)) {
            targets.forEach((el) => el.classList.add("reveal"));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

        targets.forEach((el) => observer.observe(el));
    }

    // ---------- 4. 3D tilt-on-hover ----------
    function initTiltCards(root) {
        const isFinePointer = window.matchMedia("(pointer: fine)").matches;
        if (!isFinePointer) return;

        (root || document).querySelectorAll(".tilt-card:not([data-tilt-bound])").forEach((card) => {
            card.dataset.tiltBound = "1";
            const maxTilt = 6;

            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `perspective(800px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) translateY(-3px)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        initCounters();
        initScrollReveal();
        initTiltCards();
    });

    // Expose for pages that inject content dynamically (e.g. after fetch)
    window.TheCoffeeInteractive = {
        initCounters,
        initScrollReveal,
        initTiltCards,
        refresh: function (root) {
            initCounters(root);
            initScrollReveal(root);
            initTiltCards(root);
        },
    };
})();</script>
