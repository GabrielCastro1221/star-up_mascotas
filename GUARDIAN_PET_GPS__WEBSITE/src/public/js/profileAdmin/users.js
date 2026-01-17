document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".action .page-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", async (e) => {
            const id = btn.getAttribute("data-id");
            const action = btn.getAttribute("data-action");
            try {
                let url = "";
                let method = "PUT";
                if (action === "admin") {
                    url = `/api/v1/users/admin/${id}`;
                } else if (action === "user") {
                    url = `/api/v1/users/user/${id}`;
                } else if (action === "delete") {
                    const result = await Swal.fire({
                        title: "¿Estás seguro?",
                        text: "Este usuario será eliminado permanentemente.",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#d33",
                        cancelButtonColor: "#3085d6",
                        confirmButtonText: "Sí, eliminar",
                        cancelButtonText: "Cancelar"
                    });
                    if (!result.isConfirmed) {
                        return;
                    }
                    url = `/api/v1/users/delete/${id}`;
                    method = "DELETE";
                }
                const response = await fetch(url, {
                    method,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (!response.ok) {
                    throw new Error("Error en la petición");
                }
                const data = await response.json();
                console.log("Respuesta:", data);
                if (action === "admin" || action === "user") {
                    Toastify({
                        text: `El rol del usuario ${data.nombre} ha sido actualizado a ${data.rol}`,
                        duration: 3000,
                        gravity: "top",
                        position: "right",
                        backgroundColor: action === "admin"
                            ? "linear-gradient(to right, #ffe55e)"
                            : "linear-gradient(to right, #4caf50)"
                    }).showToast();
                }
                if (action === "delete") {
                    Swal.fire({
                        title: "Eliminado",
                        text: `El usuario ha sido eliminado correctamente.`,
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false
                    });
                }
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } catch (error) {
                console.error("Error:", error);
                Toastify({
                    text: "No se pudo completar la acción",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "linear-gradient(to right, #d32f2f, #f44336)"
                }).showToast();
            }
        });
    });
});
