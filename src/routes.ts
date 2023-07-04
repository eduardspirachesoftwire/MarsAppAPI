import {Express, Request, Response} from "express";
import {getRoversHandler} from "./controllers/roverController";

function routes(app: Express) {
    app.get('/rover', getRoversHandler);
}