document.addEventListener("DOMContentLoaded", () => {
    const viewPetsBtn = document.getElementById("view-pets");
    const petsContainer = document.querySelector(".pets-card");

    async function eliminarMascota(petId) {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`/api/v1/pets/delete/${petId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            const result = await response.json();
            if (response.ok) {
                Toastify({
                    text: "Mascota eliminada correctamente",
                    duration: 2000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "linear-gradient(to right, #ff6b6b, #ff8787)",
                    style: { fontWeight: "600", borderRadius: "8px" }
                }).showToast();
                cargarMascotas();
            } else {
                Toastify({
                    text: result.message || "Error al eliminar la mascota",
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
    }

    async function cargarMascotas() {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`/api/v1/users/${user._id}/pets`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` }
            });
            const result = await response.json();
            petsContainer.innerHTML = "";
            if (response.ok && result.mascotas.length > 0) {
                petsContainer.style.display = "grid";
                result.mascotas.forEach(pet => {
                    const card = document.createElement("div");
                    card.classList.add("pet-card");
                    card.innerHTML = `
                        <img src="${pet.foto ? pet.foto : '/assets/images/default-pet.jpg'}"
                            alt="Foto de ${pet.nombre_mascota}" class="pet-photo">
                        <div class="pet-info">
                            <h3>${pet.nombre_mascota || 'Sin nombre'}</h3>
                            <p><span>Especie:</span> ${pet.especie || '-'}</p>
                            <p><span>Raza:</span> ${pet.raza || '-'}</p>
                            <p><span>Edad:</span> ${pet.edad ? pet.edad + ' años' : '-'}</p>
                            <p><span>Sexo:</span> ${pet.sexo || '-'}</p>
                            <div class="pet-btns">
                                <button class="track-pet-btn track" data-id="${pet._id}">Ver en mapa</button>
                                <button class="edit-pet-btn edit" data-id="${pet._id}">Editar</button>
                                <button class="delete-pet-btn delete" data-id="${pet._id}">Eliminar</button>
                            </div>
                        </div>
                    `;
                    card.querySelector(".delete-pet-btn").addEventListener("click", () => {
                        Swal.fire({
                            title: "¿Eliminar mascota?",
                            text: `Se eliminará "${pet.nombre_mascota}" de tu lista.`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#d33",
                            cancelButtonColor: "#3085d6",
                            confirmButtonText: "Sí, eliminar",
                            cancelButtonText: "Cancelar"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                eliminarMascota(pet._id);
                            }
                        });
                    });
                    petsContainer.appendChild(card);
                });
            } else {
                petsContainer.style.display = "block";
                petsContainer.innerHTML = `<p>No tienes mascotas registradas aún</p>`;
            }
        } catch (error) {
            petsContainer.style.display = "block";
            petsContainer.innerHTML = `<p>Error de conexión con el servidor</p>`;
        }
    }

    viewPetsBtn.addEventListener("click", (e) => {
        e.preventDefault();
        cargarMascotas();
    });
});
