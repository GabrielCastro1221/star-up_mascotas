document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("register-guest-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const guestId = localStorage.getItem("guestId");
        const userData = {
            nombre: document.getElementById("nombre").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            telefono: document.getElementById("telefono").value,
            direccion: document.getElementById("direccion").value,
            ciudad: document.getElementById("ciudad").value,
            edad: document.getElementById("edad").value,
            genero: document.getElementById("genero").value,
            guestId
        };

        try {
            const response = await fetch("/api/v1/users/register-guest", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(data.usuario));
                window.location.href = `/cart/${data.cart._id}`;
            } else {
                alert(data.message || "Error al registrar invitado");
            }
        } catch (error) {
            console.error("Error en registro invitado:", error);
            alert("No se pudo registrar el invitado");
        }
    });
});