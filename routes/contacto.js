var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('contacto');
});

router.post('/', async(req, res, next) => {

  var nombre = req.body.Nombre;
  var apellido = req.body.Apellido;
  var email = req.body.Email;
  var telefono = req.body.telf;
  var mensaje = req.body.Mensaje;

  var obj = {
    to: 'enzoquinte@gmail.com',
    subject: 'CONTACTO WEB',
    html: nombre + apellido + " se contacto a través de la web y quiere más información a este correo: " + email + ". <br>Además, hizo este comentario : " + mensaje + ". <br> Su tel es: " + telefono
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  var info = await transport.sendMail(obj);

  res.render('contacto', {
    message: 'Mensaje enviado correctamente'
  });
});

module.exports = router;
