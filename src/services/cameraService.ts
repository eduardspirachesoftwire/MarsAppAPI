import {Rover} from "../models/rover";
import {Camera} from "../models/camera";

export function getCameraTypes(roverTypes: Rover[]) {
    if (roverTypes === undefined || roverTypes.length == 0) {
        return [];
    }

    let cameraTypes: Camera[] = [];
    let findCamera = (camera: Camera, cameraList: Camera[]) => {
        if (cameraList.indexOf(camera) < 0) {
            return false;
        }
        return true;
    };

    for (let rover of roverTypes) {
        for (let camera of rover.cameras) {
            if (!findCamera(camera, cameraTypes)) {
                cameraTypes.push(camera);
            }
        }
    }
    return cameraTypes;
}