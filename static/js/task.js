
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("form[data-confirm]").forEach((form) => {
        form.addEventListener("submit", (e) => {
            const message = form.dataset.confirm;
            if (!confirm(message)) {
                e.preventDefault();
            }
        });
    });
});
