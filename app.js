/* Importaciones */
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config()

const app=express();
const port = process.env.PORT || 4000;

/* Middlewares */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//app.use(express.static(path.join(__dirname, 'uploads')));
app.use(cors());

/* Rutas */
app.use('/api/v1/projects', require('./routers/apiRouterProject'))

/* Servidor a la escucha */
app.listen(port, ()=>{
    console.log(`Server on port ${port}`)
})