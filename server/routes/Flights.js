const express = require("express");
const router = express.Router();
const Flights = require("../models/Flights.js");

router.get("/getFlights", async (req, res) => {
    try {
        const flights = await Flights.find();
        res.json(flights);
    } catch (error) {
        console.error("Uçuşlar alınırken hata oluştu:", error);
        res.status(500).json({ error: "Uçuşlar alınamadı" });
    }
});

router.post("/setFlight", async (req, res) => {
    try {
        const flightData = req.body;

        if (!flightData || Object.keys(flightData).length === 0) {
            return res.status(400).json({ error: "Eksik veya geçersiz uçuş verisi" });
        }
        const newFlight = new Flights(flightData);
        await newFlight.save();
        res.status(201).json({ success: "Uçuş başarıyla kaydedildi" });
    } catch (error) {
        res.status(409).json({ error: "Bu id ile başka bir uçuş zaten var" });
    }
});

module.exports = router;
