const express = require("express");
const UTMLatLng = require("utm-latlng");

const app = express();
const port = process.env.PORT || 3000;

// Middleware para permitir JSON no corpo da requisição
app.use(express.json());

app.post("/convert-batch", (req, res) => {
  const data = req.body; // Espera-se que seja um array de objetos com easting, northing, zone, hemisphere
  const results = [];

  try {
    // Instanciar a classe UTMLatLng
    const utmConverter = new UTMLatLng();

    // Loop para processar todas as coordenadas no lote
    data.forEach((item) => {
      const { easting, northing, zone, hemisphere } = item;
      const latLon = utmConverter.convertUtmToLatLng(
        easting,
        northing,
        zone,
        hemisphere
      );

      results.push({
        latitude: latLon.lat,
        longitude: latLon.lng,
      });
    });

    // Retornar o array de resultados
    res.json(results);
  } catch (error) {
    console.error("Erro:", error); // Log de erro
    res.status(400).json({ error: "Invalid UTM coordinates" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
