import {Rover} from "./Rover";

export enum CameraTypes {
    FHAZ,
    RHAZ,
    MAST,
    CHEMCAM,
    MAHLI,
    MARDI,
    NAVCAM,
    PANCAM,
    MINITES
}
export class Camera {
    id: number;
    name: CameraTypes;
    rover_id: number;
    full_name: string;

    constructor(id: number, name: CameraTypes, rover_id: number, full_name: string) {
        this.id = id;
        this.name = name;
        this.rover_id = rover_id;
        this.full_name = full_name;
    }

    static getCameraTypes(roverTypes: Rover[]) {
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
}

