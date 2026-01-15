document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".login-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const userData = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        };
        try {
            const response = await fetch("/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData),
                credentials: "include"
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(result.data));
                localStorage.setItem("token", result.data.token);

                Toastify({
                    text: "Inicio de sesión exitoso",
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

                setTimeout(() => {
                    if (result.data.rol === "admin") {
                        window.location.href = "/perfil-admin";
                    } else {
                        window.location.href = "/perfil-usuario";
                    }
                }, 3000);

            } else {
                Toastify({
                    text: result.message || "Credenciales incorrectas",
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
