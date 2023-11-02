const mongoose = require('mongoose');

const dadosSolaresSchema = new mongoose.Schema({
  air_temp: Number,
  dni: Number,
  ghi: Number,
  period_end: Date,
  period: String
});

const DadosSolares = mongoose.model('DadosSolares', dadosSolaresSchema);

module.exports = DadosSolares;
