document.addEventListener("DOMContentLoaded", () => {
    const socket = io();
    const productsContainer = document.querySelector(".product-card");
    const categorySelect = document.getElementById("category");
    const priceSelect = document.getElementById("price");
    const searchInput = document.getElementById("search");
    const paginationContainer = document.querySelector(".pagination");

    function getGuestId() {
        let guestId = localStorage.getItem("guestId");
        if (!guestId) {
            guestId = crypto.randomUUID();
            localStorage.setItem("guestId", guestId);
        }
        return guestId;
    }

    async function addProductToGuestCart(productId, quantity = 1) {
        const guestId = getGuestId();

        try {
            const response = await fetch(`/api/v1/cart/guest/${guestId}/products/${productId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ quantity })
            });

            if (response.redirected) {
                window.location.href = response.url;
            } else if (response.ok) {
                const data = await response.json();
                alert(data.message || "Producto agregado al carrito invitado");
            } else {
                const data = await response.json();
                alert(data.message || "No se pudo agregar el producto al carrito invitado");
            }
        } catch (error) {
            console.error("Error al agregar producto al carrito invitado:", error);
            alert("No se pudo agregar el producto al carrito invitado");
        }
    }

    socket.on("products", (data) => {
        const { productos, pagination } = data;
        productsContainer.innerHTML = "";

        productos.forEach((prod) => {
            const card = document.createElement("div");
            card.classList.add("p-card");
            card.innerHTML = `
                <a href="/tienda/${prod._id}"><div class="img row">
                <img src="${prod.image}" alt="${prod.title}">
                <div class="p-content">
                    <h3>${prod.title}</h3>
                    <p>${prod.description || "Sin descripción disponible"}</p>
                    <p><strong>Precio:</strong> $${prod.price}</p>
                    <a href="#" class="page-btn buy-btn" data-id="${prod._id}">
                    Comprar ahora <i class="fi fi-rr-shopping-cart-add"></i>
                    </a>
                </div>
                </a>
            `;
            productsContainer.appendChild(card);
        });

        if (paginationContainer) {
            paginationContainer.innerHTML = "";
            if (pagination.hasPrevPage) {
                const prevBtn = document.createElement("a");
                prevBtn.href = "#";
                prevBtn.classList.add("page-btn");
                prevBtn.textContent = "« Anterior";
                prevBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    getProducts(pagination.prevPage);
                });
                paginationContainer.appendChild(prevBtn);
            }
            for (let i = 1; i <= pagination.totalPages; i++) {
                const pageBtn = document.createElement("a");
                pageBtn.href = "#";
                pageBtn.classList.add("page-btn");
                if (i === pagination.currentPage) pageBtn.classList.add("active");
                pageBtn.textContent = i;
                pageBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    getProducts(i);
                });
                paginationContainer.appendChild(pageBtn);
            }
            if (pagination.hasNextPage) {
                const nextBtn = document.createElement("a");
                nextBtn.href = "#";
                nextBtn.classList.add("page-btn");
                nextBtn.textContent = "Siguiente »";
                nextBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    getProducts(pagination.nextPage);
                });
                paginationContainer.appendChild(nextBtn);
            }
        }
    });

    document.addEventListener("click", async (e) => {
        const btn = e.target.closest(".buy-btn");
        if (btn) {
            e.preventDefault();
            const productId = btn.dataset.id;
            const userData = JSON.parse(localStorage.getItem("user"));
            const cartId = userData?.cart;

            if (!cartId) {
                addProductToGuestCart(productId, 1);
                return;
            }

            try {
                const response = await fetch(`/api/v1/cart/${cartId}/products/${productId}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ quantity: 1 })
                });

                if (response.ok || response.redirected) {
                    window.location.href = `/cart/${cartId}`;
                } else {
                    const data = await response.json();
                    alert(data.message || "No se pudo agregar el producto");
                }
            } catch (error) {
                console.error("Error al agregar producto:", error);
                alert("No se pudo agregar el producto al carrito");
            }
        }
    });

    function getProducts(page = 1) {
        const category = categorySelect?.value !== "all" ? categorySelect?.value : null;
        let sort = priceSelect?.value === "high" ? "desc" : "asc";
        socket.emit("getPaginatedProducts", { page, limit: 6, sort, query: category });
    }

    categorySelect?.addEventListener("change", () => getProducts(1));
    priceSelect?.addEventListener("change", () => getProducts(1));
    searchInput?.addEventListener("input", () => {
        const query = searchInput.value.trim();
        if (query.length > 0) {
            socket.emit("searchProducts", query);
        } else {
            getProducts(1);
        }
    });
    getProducts();
});
