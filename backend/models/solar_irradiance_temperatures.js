const mongoose = require('mongoose');

const dadosSolaresSchema = new mongoose.Schema({
  air_temp: Number, // temperatura do ar
  dni: Number,      // irradiação solar direta normal
  ghi: Number,      // irradiação solar global horizontal
  period_end: Date, 
  period: String
});

const DadosSolares = mongoose.model('DadosSolares', dadosSolaresSchema);

module.exports = DadosSolares;
