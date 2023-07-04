import {formatURL} from "../utils/urlFormatter";
import {Parameters} from "../models/parameters";

export async function getPhotos(rover: string, params: Array<[Parameters, number | string]>) {
    try {
        const url = formatURL(rover, params);
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