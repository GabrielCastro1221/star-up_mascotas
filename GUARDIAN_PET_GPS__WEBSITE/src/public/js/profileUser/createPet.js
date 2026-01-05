document.addEventListener("DOMContentLoaded", () => {
    const registerPetBtn = document.getElementById("register-pet");
    const petModal = document.getElementById("pet-user");
    const usuarioInput = document.getElementById("usuario");
    const form = document.querySelector(".pet-form");
    petModal.style.display = "none";

    registerPetBtn.addEventListener("click", (e) => {
        e.preventDefault();
        petModal.style.display = "block";
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user._id) {
            usuarioInput.value = user._id;
        }
    });

    window.addEventListener("click", (e) => {
        if (e.target === petModal) {
            petModal.style.display = "none";
        }
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        const formData = new FormData();
        formData.append("nombre_mascota", document.getElementById("nombre_mascota").value);
        formData.append("especie", document.getElementById("especie").value);
        formData.append("raza", document.getElementById("raza").value);
        formData.append("edad", document.getElementById("edad_m").value);
        formData.append("usuario", usuarioInput.value);
        formData.append("sexo", document.getElementById("sexo").value);
        const fotoInput = document.getElementById("foto_m");

        if (fotoInput.files.length > 0) {
            formData.append("foto", fotoInput.files[0]);
        }
        try {
            const response = await fetch(`/api/v1/pets/create`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });
            const result = await response.json();
            if (response.ok) {
                Toastify({
                    text: "Mascota registrada correctamente",
                    duration: 2000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "linear-gradient(to right, var(--cl--3--), var(--cl--4--))",
                    style: { fontWeight: "600", borderRadius: "8px" }
                }).showToast();
                if (user) {
                    if (!user.mascotas) {
                        user.mascotas = [];
                    }
                    user.mascotas.push(result.mascota || {});
                    localStorage.setItem("user", JSON.stringify(user));
                }
                form.reset();
                usuarioInput.value = user._id;
                petModal.style.display = "none";
                document.getElementById("file-name").textContent = "Ningún archivo seleccionado";
            } else {
                Toastify({
                    text: result.message || "Error al registrar la mascota",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "linear-gradient(to right, #ff4d4d, #ff9999)",
                    style: { fontWeight: "600", borderRadius: "8px" }
                }).showToast();
            }
        } catch (error) {
            Toastify({
                text: "Error de conexión con el servidor",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "linear-gradient(to right, #ff4d4d, #ff9999)",
                style: { fontWeight: "600", borderRadius: "8px" }
            }).showToast();
        }
    });

    const fotoInput = document.getElementById("foto_m");
    const fileNameSpan = document.getElementById("file-name");

    fotoInput.addEventListener("change", () => {
        if (fotoInput.files.length > 0) {
            fileNameSpan.textContent = fotoInput.files[0].name;
        } else {
            fileNameSpan.textContent = "Ningún archivo seleccionado";
        }
    });
});
