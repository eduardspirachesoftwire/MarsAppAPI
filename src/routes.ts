import {Express, Request, Response} from "express";
import {
    getRoverCamerasHandler,
    getRoverPhotosHandler,
    getRoverSolHandler,
    getRoverTypesHandler
} from "./controllers/roverController";

export function routes(app: Express) {
    app.get('/rover', getRoverTypesHandler);
    app.get('/rover/:name/sol', getRoverSolHandler); //getMaxSol
    app.get('/rover/:name/:sol/cameras/', getRoverCamerasHandler);
    app.get('/rover/:name/:sol/:camera/photos', getRoverPhotosHandler);
}