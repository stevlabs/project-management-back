/* Importaciones */
const express = require('express');
const cors = require('cors');
require('dotenv').config()

const app=express();
const port = process.env.PORT || 4000;

/* Middlewares */
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors());

/* Rutas */
app.use('/api/v1/projects', require('./routers/apiRouterProject'))

/* Servidor a la escucha */
app.listen(port, ()=>{
    console.log(`Server on port ${port}`)
})