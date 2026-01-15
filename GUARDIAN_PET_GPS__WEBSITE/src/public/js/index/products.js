document.addEventListener("DOMContentLoaded", () => {
    function getGuestId() {
        let guestId = localStorage.getItem("guestId");
        if (!guestId) {
            guestId = crypto.randomUUID();
            localStorage.setItem("guestId", guestId);
        }
        return guestId;
    }

    const buttons = document.querySelectorAll(".add-cart-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", async (e) => {
            e.preventDefault();
            const productId = btn.dataset.productId;
            const userData = JSON.parse(localStorage.getItem("user"));
            const cartId = userData?.cart;

            try {
                let response;

                if (cartId) {
                    response = await fetch(`/api/v1/cart/${cartId}/products/${productId}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ quantity: 1 })
                    });
                } else {
                    const guestId = getGuestId();
                    response = await fetch(`/api/v1/cart/guest/${guestId}/products/${productId}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ quantity: 1 })
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
});
