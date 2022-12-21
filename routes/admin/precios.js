var express = require('express');
var router = express.Router();
var preciosModel = require("../../models/preciosModel")

router.get('/', async function(req,res,next){
    
    var precios = await preciosModel.getPrecios();
    
    res.render('admin/precios',{
        layout: 'admin/layout',
        persona: req.session.nombre,
        precios
    });
});

router.get('/eliminar/:id', async(req,res,next) => {
    var id = req.params.id;
    
    await preciosModel.deletePreciosById(id);
    res.redirect('/admin/precios')
});

router.get('/agregar', (req,res,next) => {
    res.render('admin/agregar',{
        layout: 'admin/layout'
    });
});

router.post('/agregar', async (req,res,next) => {
    try {
        if (req.body.nombre != "" && req.body.precio != "" && req.body.descripcion != "") {
            await preciosModel.insertPrecios(req.body);
            res.redirect('/admin/precios')
        }   else {
            res.render('admin/agregar',{
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            });
        }
    } catch (error) {
        console.log(error)
        res.render('admin/agregar',{
            layout: 'admin/layout',
            error: true,
            message: 'No se cargo el producto'
        });
    }
});

router.get('/modificar/:id', async (req,res,next) => {
    let id = req.params.id;
    let precio = await preciosModel.getPreciosById(id);
    res.render('admin/modificar', {
        layout: 'admin/layout',
        precio
    });
});

router.post('/modificar', async (req,res,next) => {
    try {
        var obj = {
            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion: req.body.descripcion
        }
        console.log(obj)
        await preciosModel.modificarPreciosById(obj,req.body.id);
        res.redirect('/admin/precios');
    }
    catch (error) {
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se modifico el producto'
        })
    }
})

module.exports = router;