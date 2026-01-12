document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", async (e) => {
        const btn = e.target.closest(".remove-btn");
        if (btn) {
            const productId = btn.dataset.id;
            const userData = JSON.parse(localStorage.getItem("user"));
            const cartId = userData?.cart;

            try {
                const response = await fetch(`/api/v1/cart/${cartId}/products/${productId}`, {
                    method: "DELETE",
                });
                const data = await response.json();

                Toastify({
                    text: data.message || "Producto eliminado del carrito de compras",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#ff4d4d",
                }).showToast();

                window.location.reload();
            } catch (error) {
                Toastify({
                    text: "Error al eliminar producto",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#ff4d4d",
                }).showToast();
            }
        }
    });

    const emptyCartBtn = document.querySelector(".empty-cart");

    emptyCartBtn?.addEventListener("click", async () => {
        const userData = JSON.parse(localStorage.getItem("user"));
        const cartId = userData?.cart;

        if (!cartId) {
            Toastify({
                text: "No tienes un carrito activo",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#ff4d4d",
            }).showToast();
            return;
        }

        try {
            const response = await fetch(`/api/v1/cart/${cartId}`, {
                method: "DELETE",
            });

            const data = await response.json();

            Toastify({
                text: data.message || "Carrito vaciado correctamente",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#4CAF50",
            }).showToast();

            setTimeout(() => window.location.reload(), 1500);
        } catch (error) {
            console.error("Error al vaciar el carrito:", error);
            Toastify({
                text: "No se pudo vaciar el carrito",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#ff4d4d",
            }).showToast();
        }
    });
    
    const citySelect = document.getElementById("city");
    const subtotalEl = document.getElementById("subtotal");
    const shippingEl = document.getElementById("shipping");
    const totalEl = document.getElementById("total");

    citySelect.addEventListener("change", () => {
        const shipping = Number(citySelect.value);
        const subtotal = Number(
            subtotalEl.textContent.replace("$", "").replace(",", "").trim()
        );
        const total = subtotal + shipping;
        shippingEl.textContent = `$${shipping}`;
        totalEl.textContent = `$${total}`;
    });
});
