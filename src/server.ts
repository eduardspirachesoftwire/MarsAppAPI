import {Request, Response} from "express";
import {Rover} from "./Rover";
import * as fs from 'fs';
import {Photo} from "./Photo";
import {Parameters} from "./URL";

const fetch = require('node-fetch');
const express = require('express');

const keyAPI: string = "VxjhaLNNqObban60iGtfz1t2pNbMYAhdOdYijFEr";

const app = express();
const port = 8000;

let readFromFile: boolean = true;

app.use(express.json());
const router = express.Router();

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});

var roverTypes: Rover[] = [];
if (readFromFile == true) {
    roverTypes = Object.values(JSON.parse(fs.readFileSync("roverList.json", 'utf-8')))[0] as Rover[];
} else {
    Rover.getRoverTypes(keyAPI).then(result => {
        if (result !== undefined) {
            roverTypes = result;
        }
    });
}

let cameraType = 'FHAZ';
let roverType = 'Curiosity';
let photoList: Photo[] = [];
Photo.getPhotos(roverType, [[Parameters.sol, 1276], [Parameters.api_key, keyAPI]]).then(result => {
    if (result !== undefined) {
        photoList = Object.values(result)[0] as Photo[];
    }
});

console.log("Available rovers and cameras:");
for (let rover of roverTypes) {
    console.log(rover.name + ": " + Rover.getRoverCameras(rover));
}

router.get('/test', async (req: Request, res: Response) => {
    res.send(photoList[0].img_src);
});
app.use('/', router);
