const express = require('express');
const router = express.Router();
const DadosSolares = require('../models/solar_irradiance_temperatures');

router.get('/date/:startDate/:endDate', async (req, res) => {
    try {
      const startRange = new Date(req.params.startDate);
      const endRange = new Date(req.params.endDate);
  
      // Definindo o final do dia (23:59:59) para a data final
      endRange.setUTCHours(23, 59, 59, 999);
  
      const registros = await DadosSolares.find({
        period_end: { $gte: startRange, $lte: endRange }
      });
  
      if (registros && registros.length > 0) {
        res.json(registros); // Retorna os registros encontrados no intervalo de datas especificado
      } else {
        res.status(404).json({ message: 'Nenhum registro encontrado para o intervalo de datas especificado' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});
  
module.exports = router;
