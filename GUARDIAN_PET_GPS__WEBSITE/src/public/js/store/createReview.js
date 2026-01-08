document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("review-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const reviewText = document.getElementById("reviewText").value;
        const rating = document.querySelector('input[name="rating"]:checked')?.value;
        const productId = document.getElementById("product").value;
        const userData = JSON.parse(localStorage.getItem("user"));
        const userId = userData?._id;
        if (!userId) {
            Swal.fire({
                icon: "warning",
                title: "Inicia sesión",
                text: "Debes iniciar sesión para dejar un comentario",
            });
            return;
        }
        try {
            const response = await fetch(`/api/v1/reviews/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    product: productId,
                    user: userId,
                    reviewText,
                    rating: Number(rating),
                }),
            });
            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "¡Reseña creada con éxito!",
                    text: "Gracias por compartir tu opinión",
                }).then(() => {
                    window.location.reload();
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: data.message || "No se pudo crear la reseña",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Problema al enviar reseña",
                text: "Hubo un problema al enviar tu reseña",
            });
        }
    });
});
