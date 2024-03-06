import { HOST } from './URL';

const API = {
    POST: (URL, Params) => {
        const Data = fetch(`${HOST}${URL}`, {
            method: 'POST',
            headers: Params instanceof FormData ? {} : {
                'Content-Type': 'application/json',
            },
            body: Params instanceof FormData ? Params : JSON.stringify(Params),
        })
            .then((res) => res.json())
        return Data;
    },
    GET: (URL) => {
        const Data = fetch(`${HOST}${URL}`)
            .then((res) => res.json())
        return Data;

    },
}

export { API };