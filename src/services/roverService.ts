const fetch = require('node-fetch');
export async function getRoverTypes(key: string) {
    try {
        const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=${key}`, {
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

export async function getRoverInfo(key: string, rover: string) {
    try {
        const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/?api_key=${key}`, {
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
