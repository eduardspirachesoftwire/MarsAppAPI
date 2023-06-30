import {Camera, CameraTypes} from "./Camera";

const fetch = require('node-fetch');

export class Rover {
    id: number;
    name: string;
    landing_date: Date;
    launch_date: Date;
    status: string;
    max_sol: number;
    max_date: Date;
    total_photos: number;
    cameras: Camera[];

    constructor(id: number, name: string, landing_date: Date, launch_date: Date, status: string, max_sol: number, max_date: Date, total_photos: number, cameras: Camera[]) {
        this.id = id;
        this.name = name;
        this.landing_date = landing_date;
        this.launch_date = launch_date;
        this.status = status;
        this.max_sol = max_sol;
        this.max_date = max_date;
        this.total_photos = total_photos;
        this.cameras = cameras;
    }

    static getRoverCameras(rover: Rover) {
        let cameraList: CameraTypes[] = [];
        for (let camera of rover.cameras) {
            if (Object.values(CameraTypes).includes(camera.name) || rover.name === "Perseverance") {
                cameraList.push(camera.name);
            }
        }
        return cameraList;
    }

    static async getRoverTypes(key: string) {
        try {
            const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/?${key}`, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            return (await response.json()) as Rover[];
        } catch (error) {
            if (error instanceof Error) {
                console.log('error message: ', error.message);
            } else {
                console.log('unexpected error: ', error);
            }
        }
    }
}

