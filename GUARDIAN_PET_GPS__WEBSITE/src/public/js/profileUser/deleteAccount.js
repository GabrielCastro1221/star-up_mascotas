document.addEventListener("DOMContentLoaded", () => {
    const deleteBtn = document.querySelector(".profile-actions .delete-account");
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    if (!deleteBtn || !token || !userId) return;
    deleteBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        Swal.fire({
            title: `¿Eliminar la cuenta de ${user.nombre}?`,
            text: "Esta acción no se puede deshacer. Tu perfil y datos serán eliminados.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
            customClass: {
                popup: "swal-popup",
                confirmButton: "swal-confirm-btn",
                cancelButton: "swal-cancel-btn"
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`/api/v1/users/delete/${userId}`, {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    const resultData = await response.json();

                    if (response.ok) {
                        Swal.fire({
                            title: "Cuenta eliminada",
                            text: "Tu cuenta ha sido eliminada correctamente",
                            icon: "success",
                            confirmButtonText: "Aceptar",
                            customClass: {
                                popup: "swal-popup",
                                confirmButton: "swal-confirm-btn"
                            }
                        }).then(() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            window.location.href = "/";
                        });
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: resultData.message || "No se pudo eliminar la cuenta",
                            icon: "error",
                            confirmButtonText: "Aceptar",
                            customClass: {
                                popup: "swal-popup",
                                confirmButton: "swal-confirm-btn"
                            }
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error de conexión",
                        text: "No se pudo conectar con el servidor",
                        icon: "error",
                        confirmButtonText: "Aceptar",
                        customClass: {
                            popup: "swal-popup",
                            confirmButton: "swal-confirm-btn"
                        }
                    });
                }
            }
        });
    });
});
