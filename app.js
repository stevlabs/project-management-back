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
app.use(cors());

/* Rutas */
app.use('/api/v1/projects', require('./routers/apiRouterProject'))
app.use('/api/v1/auth', require('./routers/apiRouterAuth'))

/* Servidor a la escucha */
app.listen(port, ()=>{
    console.log(`Server on port ${port}`)
})