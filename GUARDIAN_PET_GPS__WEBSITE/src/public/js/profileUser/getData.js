document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/login";
        return;
    }
    try {
        const response = await fetch("/api/v1/users/profile/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials: "include"
        });
        const result = await response.json();
        if (response.ok && result.data) {
            const user = result.data;
            document.getElementById("user-name").textContent = `${user.nombre}`;
            document.querySelector(".profile-info p:nth-child(2)").innerHTML = `<span>Email:</span> ${user.email}`;
            document.querySelector(".profile-info p:nth-child(3)").innerHTML = `<span>Rol:</span> ${user.rol}`;
            document.querySelector(".profile-info p:nth-child(4)").innerHTML = `<span>Teléfono:</span> ${user.telefono || "No registrado"}`;
            document.querySelector(".profile-info p:nth-child(5)").innerHTML = `<span>Dirección:</span> ${user.direccion || "No registrada"}`;
            document.querySelector(".profile-info p:nth-child(6)").innerHTML = `<span>Ciudad:</span> ${user.ciudad || "No registrada"}`;
            document.querySelector(".profile-info p:nth-child(7)").innerHTML = `<span>Género:</span> ${user.genero || "No especificado"}`;
            document.querySelector(".profile-info p:nth-child(8)").innerHTML = `<span>Edad:</span> ${user.edad || "No registrada"}`;
            if (user.foto) {
                document.getElementById("user-photo").src = user.foto;
            }
        } else {
            Toastify({
                text: result.message || "Error al obtener el perfil",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "linear-gradient(to right, #ff4d4d, #ff9999)",
                style: { fontWeight: "600", borderRadius: "8px" }
            }).showToast();
            if (response.status === 401) {
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2000);
            }
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

    const logoutBtn = document.getElementById("logout");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();

            Swal.fire({
                title: "¿Cerrar sesión?",
                text: "Tu sesión actual se cerrará y deberás volver a iniciar sesión.",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Sí, salir",
                cancelButtonText: "Cancelar",
                reverseButtons: true,
                customClass: {
                    popup: "swal-popup",
                    confirmButton: "swal-confirm-btn",
                    cancelButton: "swal-cancel-btn"
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");

                    Swal.fire({
                        title: "Sesión cerrada",
                        text: "Has salido correctamente",
                        icon: "success",
                        confirmButtonText: "Aceptar",
                        customClass: {
                            popup: "swal-popup",
                            confirmButton: "swal-confirm-btn"
                        }
                    }).then(() => {
                        window.location.href = "/login";
                    });
                }
            });
        });
    }
});
