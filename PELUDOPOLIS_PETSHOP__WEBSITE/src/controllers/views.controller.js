class ViewsController {
    renderIndex(req, res) {
        try {
            res.render('index');
        } catch (error) {
            res.status(500).send('Error al mostrar la vista de inicio.');
        }
    }
}

module.exports = new ViewsController();