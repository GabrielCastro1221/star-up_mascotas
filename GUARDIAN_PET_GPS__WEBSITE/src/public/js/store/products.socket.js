document.addEventListener("DOMContentLoaded", () => {
    const socket = io();
    const productsContainer = document.querySelector(".product-card");
    const categorySelect = document.getElementById("category");
    const priceSelect = document.getElementById("price");
    const searchInput = document.getElementById("search");
    const paginationContainer = document.querySelector(".pagination");

    socket.on("products", (data) => {
        const { productos, pagination } = data;
        productsContainer.innerHTML = "";

        productos.forEach((prod) => {
            const card = document.createElement("div");
            card.classList.add("p-card");

            card.innerHTML = `
                <a href="/tienda/${prod._id}" alt="Detalle del producto">
                <div class="img row">
                    <img src="${prod.image || '/assets/images/default-product.png'}" alt="Detalle del producto">
                    <div class="p-content">
                        <h3>${prod.title}</h3>
                        <p>${prod.description || "Sin descripción disponible"}</p>
                        <p><strong>Precio:</strong> $${prod.price}</p>
                        <a href="#" class="page-btn" data-id="${prod.id}">
                            Comprar ahora <i class="fi fi-rr-shopping-cart-add"></i>
                        </a>
                    </div>
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

    socket.on("searchResults", (productos) => {
        productsContainer.innerHTML = "";
        productos.forEach((prod) => {
            const card = document.createElement("div");
            card.classList.add("p-card");
            card.innerHTML = `
                <div class="img row">
                    <img src="${prod.image || '/assets/images/default-product.png'}" alt="${prod.title}">
                    <div class="p-content">
                        <h3>${prod.title}</h3>
                        <p>${prod.description || "Sin descripción disponible"}</p>
                        <p><strong>Precio:</strong> $${prod.price}</p>
                        <a href="#" class="page-btn" data-id="${prod.id}">
                            Comprar ahora <i class="fi fi-rr-shopping-cart-add"></i>
                        </a>
                    </div>
                </div>
            `;
            productsContainer.appendChild(card);
        });
        if (paginationContainer) {
            paginationContainer.innerHTML = "";
        }
    });

    function getProducts(page = 1) {
        const category = categorySelect.value !== "all" ? categorySelect.value : null;
        let sort = "asc";
        if (priceSelect.value === "low") sort = "asc";
        else if (priceSelect.value === "high") sort = "desc";

        socket.emit("getPaginatedProducts", { page, limit: 6, sort, query: category });
    }

    categorySelect.addEventListener("change", () => getProducts(1));
    priceSelect.addEventListener("change", () => getProducts(1));

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim();
        if (query.length > 0) {
            socket.emit("searchProducts", query);
        } else {
            getProducts(1);
        }
    });
    getProducts();
});
