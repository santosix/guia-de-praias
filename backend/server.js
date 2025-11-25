const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/map", async (req, res) => {
    const { lat, lon } = req.query;
    if (!lat || !lon) return res.status(400).json({ error: "Latitude e longitude são obrigatórias" });

    const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=15&size=600x300&markers=color:red|${lat},${lon}&key=${process.env.API_KEY}`;
    
    try {
        const response = await axios.get(url, { responseType: "arraybuffer" });
        res.set("Content-Type", "image/png");
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ error: "Erro ao acessar a API do Google Maps" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
