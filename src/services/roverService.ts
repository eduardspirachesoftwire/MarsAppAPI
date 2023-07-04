import {CameraTypes} from "../Camera";
import {Rover} from "../models/rover";

export function getRoverCameras(rover: Rover) {
    let cameraList: CameraTypes[] = [];
    for (let camera of rover.cameras) {
        if (Object.values(CameraTypes).includes(camera.name) || rover.name === "Perseverance") {
            cameraList.push(camera.name);
        }
    }
    return cameraList;
}

export async function getRoverTypes(key: string) {
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