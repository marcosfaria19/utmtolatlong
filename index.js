const express = require("express");
const UTMLatLng = require("utm-latlng"); // Certifique-se de que a biblioteca está corretamente importada

const app = express();
const port = process.env.PORT || 3000;

// Middleware para permitir JSON no corpo da requisição
app.use(express.json());

app.post("/convert", (req, res) => {
  const { easting, northing, zone, hemisphere } = req.body;

  console.log("Recebido:", req.body); // Verificar a requisição recebida

  try {
    // Instanciar a classe UTMLatLng
    const utmConverter = new UTMLatLng();

    // Usar a nova biblioteca para converter UTM para Latitude/Longitude
    const latLon = utmConverter.convertUtmToLatLng(
      easting,
      northing,
      zone,
      hemisphere
    );

    console.log("Resultado:", latLon); // Verificar resultado da conversão

    // Retornar um objeto JSON com as propriedades de latitude e longitude
    res.json({
      latitude: latLon.lat,
      longitude: latLon.lng,
    });
  } catch (error) {
    console.error("Erro:", error); // Log de erro
    res.status(400).json({ error: "Invalid UTM coordinates" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
