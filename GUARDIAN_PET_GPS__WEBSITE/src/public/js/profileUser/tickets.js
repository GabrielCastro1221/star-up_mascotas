document.addEventListener("DOMContentLoaded", () => {
    const viewBtn = document.getElementById("view-tickets");
    const ticketsHistory = document.querySelector(".tickets-history");
    const ticketsList = document.getElementById("tickets-list");

    viewBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        if (ticketsHistory.style.display === "block") {
            ticketsHistory.style.display = "none";
            viewBtn.innerHTML = `Compras Realizadas <i class="fi fi-rr-shop"></i>`;
            return;
        } else {
            ticketsHistory.style.display = "block";
            viewBtn.innerHTML = `Cerrar historial <i class="fi fi-rr-cross"></i>`;
        }

        const userData = JSON.parse(localStorage.getItem("user"));
        if (!userData?._id) {
            Swal.fire({
                icon: "warning",
                title: "Usuario no encontrado",
                text: "Debes iniciar sesión para ver tus compras",
            });
            return;
        }

        try {
            const response = await fetch(`/api/v1/users/${userData._id}/tickets`);
            const data = await response.json();

            if (!response.ok) throw new Error(data.message || "Error al obtener tickets");

            ticketsList.innerHTML = "";

            if (data.tickets.length === 0) {
                ticketsList.innerHTML = `<p class="no-tickets">No tienes compras registradas aún 🐾</p>`;
                return;
            }

            data.tickets.forEach(ticket => {
                const card = document.createElement("div");
                card.classList.add("ticket-card");
                card.innerHTML = `
                <header class="ticket-card-header">
                    <h6 class="ticket-code">Código: <span>${ticket.code}</span></h6>
                    <p class="ticket-date">Fecha: ${new Date(ticket.purchase_datetime).toLocaleDateString("es-ES")}</p>
                    <p class="ticket-status">Estado: <span class="status ${ticket.status}">${ticket.status}</span></p>
                </header>
                <div class="ticket-card-body">
                    <ul class="products-list">
                    ${ticket.products.map(p => `
                        <li class="product-item" style="padding: 8px;">
                            <span class="product-name">${p.title}</span>
                            <span class="product-qty">x${p.quantity}</span>
                            <span class="product-price">$${p.price}</span>
                        </li>
                    `).join("")}
                    </ul>
                </div>
                <div class="ticket-card-footer" style="padding: 8px;">
                    <p class="ticket-total">Total: <strong>$${ticket.amount}</strong></p>
                    <a href="/ticket-detail/${ticket._id}" target="_blank" class="page-btn small-btn">
                        Ver detalle <i class="fi fi-rr-document"></i>
                    </a>
                    <button class="page-btn cancel-btn" data-id="${ticket._id}">
                        Cancelar compra <i class="fi fi-bs-ban"></i>
                    </button>
                    <button class="page-btn delete-btn" data-id="${ticket._id}">
                        Eliminar compra <i class="fi fi-bs-ban"></i>
                    </button>
                </div>
        `;
                ticketsList.appendChild(card);

                const cancelBtn = card.querySelector(".cancel-btn");
                cancelBtn.addEventListener("click", async () => {
                    try {
                        const cancelResponse = await fetch(`/api/v1/tickets/cancel/${ticket._id}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" }
                        });
                        const cancelData = await cancelResponse.json();

                        if (cancelResponse.ok) {
                            Swal.fire({
                                icon: "success",
                                title: "Compra cancelada",
                                text: `El ticket ${ticket.code} ha sido cancelado correctamente`,
                            }).then(() => viewBtn.click());
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: cancelData.message || "No se pudo cancelar la compra",
                            });
                        }
                    } catch (error) {
                        console.error("Error al cancelar compra:", error);
                        Swal.fire({ icon: "error", title: "Problema", text: "Hubo un problema al cancelar la compra" });
                    }
                });

                const deleteBtn = card.querySelector(".delete-btn");
                deleteBtn.addEventListener("click", async () => {
                    try {
                        const confirm = await Swal.fire({
                            icon: "warning",
                            title: "¿Eliminar compra?",
                            text: `¿Seguro que deseas eliminar el ticket ${ticket.code}? Esta acción no se puede deshacer.`,
                            showCancelButton: true,
                            confirmButtonText: "Sí, eliminar",
                            cancelButtonText: "Cancelar"
                        });

                        if (!confirm.isConfirmed) return;

                        const deleteResponse = await fetch(`/api/v1/tickets/${ticket._id}`, {
                            method: "DELETE",
                            headers: { "Content-Type": "application/json" }
                        });
                        const deleteData = await deleteResponse.json();

                        if (deleteResponse.ok) {
                            Swal.fire({
                                icon: "success",
                                title: "Ticket eliminado",
                                text: `El ticket ${ticket.code} ha sido eliminado correctamente`,
                            }).then(() => viewBtn.click());
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: deleteData.message || "No se pudo eliminar la compra",
                            });
                        }
                    } catch (error) {
                        console.error("Error al eliminar ticket:", error);
                        Swal.fire({ icon: "error", title: "Problema", text: "Hubo un problema al eliminar la compra" });
                    }
                });
            });
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({ icon: "error", title: "Error", text: "No se pudo cargar el historial de compras" });
        }
    });
});
