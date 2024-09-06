import express from "express";
import bodyParser from "body-parser";
import qr from "qr-image";
import fs from "fs";
import {dirname} from "path";
import { fileURLToPath } from "url";

const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();


app.use(bodyParser.urlencoded({extended: true}));

// Frontend
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

app.post("/submit", (req, res) => {
    console.log(req.body.url);
    var qr_image = qr.image("https://" + req.body.url);
    var qr_stream = qr_image.pipe(fs.createWriteStream('qr_code.png'));
    qr_stream.on('finish', ()=> {
        res.sendFile(__dirname + "/qr_code.png");
    })
})


app.listen(port, () => {
    console.log(`Server is listening on the port ${port}...`);
})