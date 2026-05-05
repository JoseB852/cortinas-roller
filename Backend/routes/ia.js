const express = require("express");
const multer = require("multer");
const Replicate = require("replicate");
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

router.post("/generar-cortina", upload.single("imagen"), async (req, res) => {
    let tempFilePath = null;
    
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No se recibió ninguna imagen" });
        }

        tempFilePath = req.file.path;
        const tipoCortina = req.body.tipoCortina || "gray roller blind";
        
        // Prompt más detallado para mejor resultado
        const prompt = `Add a ${tipoCortina} to the empty window in this room. Make it look photorealistic, matching the exact lighting, shadows, and perspective of the original photo. The roller blind should appear professionally installed.`;

        console.log("📸 Leyendo imagen:", tempFilePath);
        
        const imageBuffer = fs.readFileSync(tempFilePath);
        const base64Image = imageBuffer.toString('base64');
        const mimeType = req.file.mimetype;
        const dataUrl = `data:${mimeType};base64,${base64Image}`;

        console.log("🎨 Generando cortina con IA (usando modelo actualizado)...");
        
        // ✅ NUEVO MODELO que sí funciona (sdxl inpainting)
        const output = await replicate.run(
            "stability-ai/sdxl:inpainting",
            {
                input: {
                    image: dataUrl,
                    mask_prompt: "window, empty window frame, glass",
                    prompt: prompt,
                    negative_prompt: "blurry, distorted, unrealistic, cartoon, low quality, deformed",
                    num_outputs: 1,
                    num_inference_steps: 30,
                    guidance_scale: 7.5,
                }
            }
        );

        const generatedImageUrl = Array.isArray(output) ? output[0] : output;

        console.log("✅ Imagen generada:", generatedImageUrl);

        res.json({
            exito: true,
            imagenUrl: generatedImageUrl
        });

    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ 
            error: error.message || "Error al generar la imagen con IA"
        });
    } finally {
        if (tempFilePath && fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
        }
    }
});

router.get("/test", (req, res) => {
    res.json({ mensaje: "API de IA funcionando con Replicate (SDXL)" });
});

module.exports = router;