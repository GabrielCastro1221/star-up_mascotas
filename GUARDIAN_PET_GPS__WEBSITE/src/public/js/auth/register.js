document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".register-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const userData = {
            nombre: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        };
        try {
            const response = await fetch("/api/v1/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
            const result = await response.json();
            if (response.ok) {
                Toastify({
                    text: "Usuario Registrado con exito",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "linear-gradient(to right, var(--cl--3--), var(--cl--4--))",
                    style: {
                        fontWeight: "600",
                        borderRadius: "8px"
                    }
                }).showToast();
                form.reset();
                setTimeout(() => { window.location.href = "/login"; }, 3000);
            } else {
                Toastify({
                    text: result.message || "Error en el registro",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "linear-gradient(to right, #ff4d4d, #ff9999)",
                    style: {
                        fontWeight: "600",
                        borderRadius: "8px"
                    }
                }).showToast();
            }
        } catch (error) {
            Toastify({
                text: "Error de conexión con el servidor",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "linear-gradient(to right, #ff4d4d, #ff9999)",
                style: {
                    fontWeight: "600",
                    borderRadius: "8px"
                }
            }).showToast();
        }
    });
});