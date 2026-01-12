document.addEventListener("DOMContentLoaded", () => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
        const nameSpan = document.querySelector(".ticket-summary .resumen-subtitle + .price-s:nth-of-type(1)");
        const emailSpan = document.querySelector(".ticket-summary .resumen-subtitle + .price-s:nth-of-type(2)");
        const citySpan = document.querySelector(".ticket-summary .resumen-subtitle + .price-s:nth-of-type(3)");
        const addressSpan = document.querySelector(".ticket-summary .resumen-subtitle + .price-s:nth-of-type(4)");
        const phoneSpan = document.querySelector(".ticket-summary .resumen-subtitle + .price-s:nth-of-type(5)");
        const nameEl = document.getElementById("user-name");
        const emailEl = document.getElementById("user-email");
        const cityEl = document.getElementById("user-city");
        const addressEl = document.getElementById("user-address");
        const phoneEl = document.getElementById("user-phone");

        if (nameEl) nameEl.textContent = userData.nombre || "No registrado";
        if (emailEl) emailEl.textContent = userData.email || "No registrado";
        if (cityEl) cityEl.textContent = userData.ciudad || "No registrado";
        if (addressEl) addressEl.textContent = userData.direccion || "No registrado";
        if (phoneEl) phoneEl.textContent = userData.telefono || "No registrado";
    }
});