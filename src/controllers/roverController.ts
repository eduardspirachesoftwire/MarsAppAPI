import {NextFunction, Request, Response} from "express";
import {Rover} from "../models/rover";
import {getRoverInfo, getRoverTypes} from "../services/roverService";
import {keyAPI} from "../utils/constants";
import {Photo} from "../models/photo";
import {getPhotos} from "../services/photoService";
import {Parameters} from "../models/parameters";

export function getRoverTypesHandler(req: Request, res: Response, next: NextFunction) {
    try {
        let roverTypes: string[] = [];
        getRoverTypes(keyAPI).then(result => {
            if (result !== undefined) {
                let roverList: Rover[] = Object.values(result)[0] as Rover[];
                for (let rover of roverList) {
                    roverTypes.push(rover.name);
                }
            }
            res.send(roverTypes);
        });
    } catch (error) {
        next(error);
    }
}

export function getRoverCamerasHandler(req: Request, res: Response, next: NextFunction) {
    try {
        let cameraTypes: string[] = [];
        cameraTypes.push("Every_camera");
        getRoverInfo(keyAPI, req.params.name).then(result => {
            if (result !== undefined) {
                let rover: Rover = Object.values(result)[0] as Rover;
                let findCamera = (camera: string, cameraList: string[]) => {
                    return cameraList.indexOf(camera) >= 0;
                };

                for (let camera of rover.cameras) {
                    let cameraName = camera.name.charAt(0).toUpperCase() +
                        camera.name.slice(1).toLowerCase();

                    if (!findCamera(cameraName, cameraTypes)) {
                        cameraTypes.push(cameraName);
                    }
                }
            }
            res.send(cameraTypes);
        });
    } catch (error) {
        next(error);
    }
}

export function getRoverSolHandler(req: Request, res: Response, next: NextFunction) {
    try {
        let maxSol: string = "";
        getRoverInfo(keyAPI, req.params.name).then(result => {
            if (result !== undefined) {
                let rover: Rover = Object.values(result)[0] as Rover;
                maxSol = rover.max_sol.toString();
            }
            res.send(maxSol);
        });
    } catch (error) {
        next(error);
    }
}

export function getRoverPhotosHandler(req: Request, res: Response, next: NextFunction) {
    try {
        let photoParams: Array<[Parameters, number | string]> = [[Parameters.sol,req.params.sol], [Parameters.api_key, keyAPI]];
        if (req.params.camera !== "Every_camera") {
            photoParams.push([Parameters.camera, req.params.camera]);
        }
        getPhotos(req.params.name, photoParams).then(result => {
            let photoLinks: string[] = [];
            if (result !== undefined) {
                let photos: Photo[] = Object.values(result)[0] as Photo[];

                for (let photo of photos) {
                    photoLinks.push(photo.img_src);
                }
            }
            res.send(photoLinks);
        });
    } catch (error) {
        next(error);
    }
}
