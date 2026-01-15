document.addEventListener("DOMContentLoaded", () => {
    function getGuestId() {
        let guestId = localStorage.getItem("guestId");
        if (!guestId) {
            guestId = crypto.randomUUID();
            localStorage.setItem("guestId", guestId);
        }
        return guestId;
    }

    const addToCartForm = document.querySelector(".add-to-cart-form");

    addToCartForm?.addEventListener("submit", async (e) => {
        e.preventDefault();

        const productId = addToCartForm.dataset.productId;
        const quantityInput = addToCartForm.querySelector("#quantity");
        const quantity = parseInt(quantityInput.value);
        const userData = JSON.parse(localStorage.getItem("user"));
        const cartId = userData?.cart || addToCartForm.dataset.cartId;

        if (quantity < 1) {
            Swal.fire({
                icon: "warning",
                title: "Cantidad inválida",
                text: "Debes seleccionar al menos 1 unidad",
            });
            return;
        }

        try {
            let response;

            if (cartId) {
                response = await fetch(`/api/v1/cart/${cartId}/products/${productId}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ quantity })
                });
            } else {
                const guestId = getGuestId();
                response = await fetch(`/api/v1/cart/guest/${guestId}/products/${productId}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ quantity })
                });
            }

            if (response.redirected) {
                window.location.href = response.url;
            } else if (response.ok) {
                if (cartId) {
                    window.location.href = `/cart/${cartId}`;
                } else {
                    const guestId = getGuestId();
                    window.location.href = `/cart/${guestId}`;
                }
            } else {
                const result = await response.json();
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: result.message || "No se pudo agregar el producto",
                });
            }
        } catch (error) {
            console.error("Error al agregar producto:", error);
            Swal.fire({
                icon: "error",
                title: "Problema",
                text: "Hubo un problema al conectar con el servidor",
            });
        }
    });
});
