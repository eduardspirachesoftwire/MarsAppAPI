import {Parameters} from "../models/parameters";

export function formatURL(roverName: string, params: Array<[Parameters, number | string]>) {
    let url: string = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?`;
    for (let param of params) {
        url += `${param[0]}=${param[1]}`;
        if (param != params[params.length - 1]) {
            url += `&`;
        }
    }
    return url;
}