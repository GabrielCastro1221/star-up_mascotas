document.addEventListener("DOMContentLoaded", () => {
    const socket = io();

    const editButtons = document.querySelectorAll(".action .page-btn[data-action='edit']");
    editButtons.forEach(btn => {
        btn.addEventListener("click", async () => {
            const id = btn.getAttribute("data-id");
            socket.emit("pet:getById", { id });
            socket.once("pet:getById:response", async (pet) => {
                const { value: formValues } = await Swal.fire({
                    title: "Editar Mascota",
                    html: `
                        <input id="swal-nombre_mascota" class="swal2-input" name="nombre_mascota" placeholder="Nombre" value="${pet.nombre_mascota || ''}">
                        <input id="swal-edad" class="swal2-input" name="edad" placeholder="Edad" value="${pet.edad || ''}">
                        <input id="swal-raza" class="swal2-input" name="raza" placeholder="Raza" value="${pet.raza || ''}">
                        <input id="swal-especie" class="swal2-input" name="especie" placeholder="Especie" value="${pet.especie || ''}">
                        <select id="swal-sexo" class="swal2-input" name="sexo">
                            <option value="">Seleccionar sexo</option>
                            <option value="macho" ${pet.sexo === "macho" ? "selected" : ""}>Macho</option>
                            <option value="hembra" ${pet.sexo === "hembra" ? "selected" : ""}>Hembra</option>
                        </select>
                        <label for="swal-foto" class="file-label">Foto nueva (opcional)</label>
                        <input id="swal-foto" type="file" class="swal2-file" name="foto" accept="image/*">
                    `,
                    focusConfirm: false,
                    showCancelButton: true,
                    confirmButtonText: "Actualizar",
                    cancelButtonText: "Cancelar",
                    preConfirm: () => {
                        return {
                            nombre_mascota: document.getElementById("swal-nombre_mascota").value,
                            edad: document.getElementById("swal-edad").value,
                            raza: document.getElementById("swal-raza").value,
                            especie: document.getElementById("swal-especie").value,
                            sexo: document.getElementById("swal-sexo").value,
                            foto: document.getElementById("swal-foto").files[0]
                        };
                    }
                });
                if (!formValues) return;
                const updateData = new FormData();
                updateData.append("nombre_mascota", formValues.nombre_mascota);
                updateData.append("edad", formValues.edad);
                updateData.append("raza", formValues.raza);
                updateData.append("especie", formValues.especie);
                updateData.append("sexo", formValues.sexo);
                if (formValues.foto) {
                    updateData.append("foto", formValues.foto);
                }
                try {
                    const response = await fetch(`/api/v1/pets/update/${id}`, {
                        method: "PUT",
                        body: updateData
                    });
                    if (!response.ok) throw new Error("Error al actualizar mascota");
                    const data = await response.json();
                    Swal.fire({
                        title: "Actualizada",
                        text: `La mascota "${data.mascota.nombre_mascota}" fue actualizada correctamente.`,
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false
                    });
                    setTimeout(() => window.location.reload(), 1500);
                } catch (error) {
                    Swal.fire({
                        title: "Error",
                        text: error.message || "No se pudo actualizar la mascota",
                        icon: "error"
                    });
                }
            });
        });
    });

    const deleteButtons = document.querySelectorAll(".action .page-btn[data-action='delete']");
    deleteButtons.forEach(btn => {
        btn.addEventListener("click", async () => {
            const id = btn.getAttribute("data-id");
            const result = await Swal.fire({
                title: "¿Eliminar mascota?",
                text: "Esta acción no se puede deshacer.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar"
            });
            if (!result.isConfirmed) return;
            try {
                const response = await fetch(`/api/v1/pets/delete/${id}`, { method: "DELETE" });
                if (!response.ok) throw new Error("Error al eliminar mascota");
                const data = await response.json();
                Swal.fire({
                    title: "Eliminada",
                    text: `La mascota "${data.mascota.nombre_mascota}" fue eliminada correctamente.`,
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
                setTimeout(() => window.location.reload(), 1500);
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: error.message || "No se pudo eliminar la mascota",
                    icon: "error"
                });
            }
        });
    });
});
