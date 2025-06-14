
document.addEventListener("DOMContentLoaded", function () {
    function showSection(id) {
        document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
        document.getElementById(id).classList.remove("hidden");
    }

    document.getElementById("darkModeToggle").addEventListener("change", function () {
        document.body.classList.toggle("dark-mode", this.checked);
    });

    showSection("national");
});
