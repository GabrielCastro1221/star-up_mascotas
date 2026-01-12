const ShippinRepository = require("../repositories/shipping.repository");

class ShippingController {
    async createShipping(req, res) {
        try {
            const shippingData = req.body;
            await ShippinRepository.createShipping(shippingData);
            res.status(201).json({ status: true, message: "Destino creado con exito", shippingData })
            //res.redirect("/perfil-admin");
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getShipping(req, res) {
        try {
            const shipping = await ShippinRepository.getShipping();
            if (!shipping || shipping.length === 0) {
                return res.status(404).json({ message: "No hay destinos disponibles" });
            }
            res.status(200).json({ shipping });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateShipping(req, res) {
        try {
            const { id } = req.params;
            const { city_ship, amount } = req.body;

            const updatedShipping = await ShippinRepository.updateShipping(id, { city_ship, amount });
            res.status(200).json({ message: "Destino actualizado correctamente", updatedShipping });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteShipping(req, res) {
        try {
            const { id } = req.params;
            const deletedShipping = await ShippinRepository.deleteShippingById(id);
            res.status(200).json({ message: "Destino eliminado correctamente", deletedShipping });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ShippingController();