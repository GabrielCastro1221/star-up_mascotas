document.addEventListener("DOMContentLoaded", () => {
    const updateBtn = document.getElementById("update-account-btn");
    const modal = document.getElementById("update-user");
    const form = document.querySelector(".update-form");
    modal.style.display = "none";

    updateBtn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.display = "block";
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            document.getElementById("name").value = user.nombre || "";
            document.getElementById("email").value = user.email || "";
            document.getElementById("ciudad").value = user.ciudad || "";
            document.getElementById("direccion").value = user.direccion || "";
            document.getElementById("telefono").value = user.telefono || "";
            document.getElementById("edad").value = user.edad || "";
            document.getElementById("genero").value = user.genero || "";
        }
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?._id;

        const updateData = {
            nombre: document.getElementById("name").value,
            email: document.getElementById("email").value,
            ciudad: document.getElementById("ciudad").value,
            direccion: document.getElementById("direccion").value,
            telefono: document.getElementById("telefono").value,
            edad: document.getElementById("edad").value,
            genero: document.getElementById("genero").value
        };

        try {
            const response = await fetch(`/api/v1/users/update/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updateData)
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(result.user));

                Toastify({
                    text: "Datos actualizados correctamente",
                    duration: 2000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "linear-gradient(to right, var(--cl--3--), var(--cl--4--))",
                    style: { fontWeight: "600", borderRadius: "8px" }
                }).showToast();

                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                Toastify({
                    text: result.message || "Error al actualizar los datos",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "linear-gradient(to right, #ff4d4d, #ff9999)",
                    style: { fontWeight: "600", borderRadius: "8px" }
                }).showToast();
            }
        } catch (error) {
            Toastify({
                text: "Error de conexión con el servidor",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "linear-gradient(to right, #ff4d4d, #ff9999)",
                style: { fontWeight: "600", borderRadius: "8px" }
            }).showToast();
        }
    });
});
