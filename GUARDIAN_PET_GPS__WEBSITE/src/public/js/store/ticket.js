document.addEventListener("DOMContentLoaded", () => {
    const checkoutBtn = document.querySelector(".checkout-btn");
    const citySelect = document.getElementById("city");
    const subtotalEl = document.getElementById("subtotal");
    const shippingEl = document.getElementById("shipping");
    const totalEl = document.getElementById("total");

    citySelect.addEventListener("change", () => {
        const shipping = Number(citySelect.value);
        const subtotal = Number(subtotalEl.textContent.replace("$", "").replace(",", "").trim());
        const amount = subtotal + shipping;

        shippingEl.textContent = `$${shipping}`;
        totalEl.textContent = `$${amount}`;
    });

    checkoutBtn?.addEventListener("click", async () => {
        const userData = JSON.parse(localStorage.getItem("user"));
        const cartId = userData?.cart;

        if (!cartId) {
            Swal.fire({
                icon: "warning",
                title: "Carrito no encontrado",
                text: "Debes iniciar sesión o tener un carrito activo",
            });
            return;
        }

        const subtotal = Number(subtotalEl.textContent.replace("$", "").replace(",", "").trim());
        const shipping = Number(shippingEl.textContent.replace("$", "").replace(",", "").trim());
        const amount = Number(totalEl.textContent.replace("$", "").replace(",", "").trim());

        try {
            const response = await fetch(`/api/v1/tickets/cart/${cartId}/finish-purchase`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount, shipping, subtotal }),
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Compra realizada",
                    text: `¡Gracias por tu pedido! Total: $${amount}`,
                }).then(() => {
                    window.location.href = `/ticket/${data._id}`;
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: data.error || "No se pudo finalizar la compra",
                });
            }
        } catch (error) {
            console.error("Error al finalizar compra:", error);
            Swal.fire({
                icon: "error",
                title: "Problema",
                text: "Hubo un problema al procesar tu compra",
            });
        }
    });
});
