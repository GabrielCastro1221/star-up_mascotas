const product = require("../../repositories/product.repository");
const { logger } = require("../../middlewares/logger.middleware");

class SocketProduct {
    constructor(io) {
        this.io = io;
        this.initSocketEvents();
    }

    initSocketEvents() {
        this.io.on("connection", async (socket) => {
            logger.info("WebSocket productos conectado");

            try {
                await this.emitPaginatedProducts(socket, {
                    page: 1,
                    limit: 6,
                    sort: "asc",
                    query: null,
                });
            } catch (error) {
                logger.error("Error al emitir productos iniciales:", error.message);
                socket.emit("error", "Error al cargar los productos.");
            }

            socket.on("featureProd", async (id) => {
                try {
                    await product.featureProduct(id);
                    await this.emitPaginatedProducts(socket, { page: 1, limit: 6 });
                } catch (error) {
                    socket.emit("error", "Error al destacar el producto");
                }
            });

            socket.on("newArrive", async (id) => {
                try {
                    await product.newArrive(id);
                    await this.emitPaginatedProducts(socket, { page: 1, limit: 6 });
                } catch (error) {
                    socket.emit("error", "Error al marcar como nuevo arribo");
                }
            });

            socket.on("bestSeller", async (id) => {
                try {
                    await product.bestSeller(id);
                    await this.emitPaginatedProducts(socket, { page: 1, limit: 6 });
                } catch (error) {
                    socket.emit("error", "Error al marcar como más vendido");
                }
            });

            socket.on("deleteProd", async (id) => {
                try {
                    await product.deleteProduct(id);
                    await this.emitPaginatedProducts(socket, { page: 1, limit: 6 });
                } catch (error) {
                    socket.emit("error", "Error al eliminar producto");
                }
            });

            socket.on("getPaginatedProducts", async (params) => {
                try {
                    await this.emitPaginatedProducts(socket, params);
                } catch (error) {
                    socket.emit("error", "Error al obtener productos paginados");
                }
            });

            socket.on("searchProducts", async (query) => {
                try {
                    const searchResults = await product.searchProducts(query);
                    socket.emit("searchResults", searchResults);
                } catch (error) {
                    socket.emit("error", "Error en la búsqueda de productos");
                }
            });

            socket.on("getProductById", async (id) => {
                try {
                    const prod = await product.getProductById(id);
                    socket.emit("productDetail", prod);
                } catch (error) {
                    socket.emit("error", "Error al obtener producto por ID");
                }
            });

            socket.on("updateProduct", async ({ id, updateData }) => {
                try {
                    const updatedProduct = await product.updateProduct(id, updateData);
                    socket.emit("productUpdated", updatedProduct);
                } catch (error) {
                    socket.emit("error", "Error al actualizar producto");
                }
            });
        });
    }

    async emitPaginatedProducts(socket, queryParams) {
        try {
            const result = await product.getPaginatedProducts(queryParams);
            socket.emit("products", {
                productos: result.productos.map((producto) => ({
                    id: producto._id,
                    type_product: producto.type_product,
                    ...producto,
                })),
                categorias: result.categorias,
                pagination: result.pagination,
            });
        } catch (error) {
            socket.emit("error", "Error al obtener productos paginados");
        }
    }
}

module.exports = SocketProduct;
