document.addEventListener("DOMContentLoaded", () => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
        const nameInput = document.getElementById("name-user-ticket");
        const emailInput = document.getElementById("email-user-ticket");
        const cityInput = document.getElementById("ciudad-user-ticket");
        const addressInput = document.getElementById("direccion-user-ticket");
        const phoneInput = document.getElementById("telefono-user-ticket");

        if (nameInput) nameInput.value = userData.nombre || "Ingrese su nombre completo";
        if (emailInput) emailInput.value = userData.email || "Ingrese su correo electronico";
        if (cityInput) cityInput.value = userData.ciudad || "Ingrese su ciudad de residencia";
        if (addressInput) addressInput.value = userData.direccion || "Ingrese su direccion actual";
        if (phoneInput) phoneInput.value = userData.telefono || "Ingrese su telefono";
    }

    const form = document.querySelector(".update-form");
    form?.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!userData?._id) {
            Swal.fire({
                icon: "warning",
                title: "Usuario no encontrado",
                text: "Debes iniciar sesión para actualizar tus datos",
            });
            return;
        }

        const payload = {
            nombre: document.getElementById("name-user-ticket").value.trim(),
            email: document.getElementById("email-user-ticket").value.trim(),
            ciudad: document.getElementById("ciudad-user-ticket").value.trim(),
            direccion: document.getElementById("direccion-user-ticket").value.trim(),
            telefono: document.getElementById("telefono-user-ticket").value.trim(),
        };

        try {
            const response = await fetch(`/api/v1/users/update/${userData._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Datos actualizados",
                    text: "Tu información se ha guardado correctamente",
                }).then(() => {
                    location.reload();
                });

                localStorage.setItem("user", JSON.stringify({ ...userData, ...payload }));
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: data.error || "No se pudo actualizar la información",
                });
            }
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            Swal.fire({
                icon: "error",
                title: "Problema",
                text: "Hubo un problema al procesar la actualización",
            });
        }
    });
});
