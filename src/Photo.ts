import {Camera} from "./Camera";
import {Parameters, URL} from "./URL";

const fetch = require('node-fetch');

export class Photo {
    id: number;
    sol: number;
    camera: Camera;
    img_src: string;
    earth_date: Date;

    constructor(id: number, sol: number, camera: Camera, img_src: string, earth_date: Date) {
        this.id = id;
        this.sol = sol;
        this.camera = camera;
        this.img_src = img_src;
        this.earth_date = earth_date;
    }

    static async getPhotos(rover: string, params: Array<[Parameters, number | string]>) {
        try {
            const url = URL.formatURL(rover, params);
            console.log(url);
            const response = await fetch(url, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            return (await response.json()) as Object;
        } catch (error) {
            if (error instanceof Error) {
                console.log('error message: ', error.message);
            } else {
                console.log('unexpected error: ', error);
            }
        }
    }
}