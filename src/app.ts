import {Request, Response} from "express";
import * as fs from 'fs';
import {Rover} from "./models/rover";
import {Parameters} from "./models/parameters";
import {getRoverCameras, getRoverTypes} from "./services/roverService";
import {Photo} from "./models/photo";
import {getPhotos} from "./services/photoService";


const cors = require('cors');
const express = require('express');

const keyAPI: string = "VxjhaLNNqObban60iGtfz1t2pNbMYAhdOdYijFEr";

const app = express();
const port = 8000;

let readFromFile: boolean = true;

app.use(cors());

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});

var roverTypes: Rover[] = [];
if (readFromFile == true) {
    roverTypes = Object.values(JSON.parse(fs.readFileSync("roverList.json", 'utf-8')))[0] as Rover[];
} else {
    getRoverTypes(keyAPI).then(result => {
        if (result !== undefined) {
            roverTypes = result;
        }
    });
}

let cameraType = 'FHAZ';
let roverType = 'Curiosity';
let photoList: Photo[] = [];
getPhotos(roverType, [[Parameters.sol, 1276], [Parameters.api_key, keyAPI]]).then(result => {
    if (result !== undefined) {
        photoList = Object.values(result)[0] as Photo[];
    }
});

console.log("Available rovers and cameras:");
for (let rover of roverTypes) {
    console.log(rover.name + ": " + getRoverCameras(rover));
}

app.get('/rover', async (req: Request, res: Response) => {
   res.send(roverTypes);
});

