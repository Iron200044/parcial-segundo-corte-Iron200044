const express=require('express')
const router = express.Router();
//Solicitud get default para coin
router.get('coin',(req,res)=>{
  res.send("Trabajando desde 'Coin'.")
})
// Solicitud get que consume la API para obtener el precio de una moneda
router.get('/:coinName', async (req, res) => {
  const coinName = req.params.coinName.toLowerCase();
  try {
    const response = await fetch(`https://api.coincap.io/v2/assets/${coinName}`);
    const data = await response.json();
    if (data.data) {
      const priceUSD = data.data.priceUsd;
      res.send(`El precio en dólares de la moneda para el día de hoy es ${priceUSD}`);
    } else {
      res.status(404).send('El nombre de la moneda no fue encontrado en la base de datos');
    }
  } catch (error) {
    console.error(error);
    res.status(400).send('Error al obtener el precio de la moneda');
  }
});

module.exports = router;