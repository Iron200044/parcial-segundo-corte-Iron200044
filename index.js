const express = require('express');
const PORT = 3000;
const app = express();

//Rutas 
const coinRoute=require('./routes/coin');
const userRoute=require('./routes/users');

app.use('/coin',coinRoute);
app.use('/users',userRoute);

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

//Get default
app.get('/', (req, res) => {
  res.send('Holi soy Samuel Acero García ID:0000300974, BIENVENIDO A MI API');
});

//Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});