// @flow
class BaseAPI {
    static apiUrl: ?string = process.env.API_URL;

    static requestInit(requestType?: string = "GET", body?: JSONType, cors?: boolean = true): RequestOptions {
        const init: RequestOptions = {
            method: requestType,
            headers: { "Content-Type": "application/json" },
        };

        if (body) {
            init.body = JSON.stringify(body);
        }

        if (cors) {
            init.mode = "cors";
            init.credentials = "include";
        }

        return init;
    }

    static fetchData(input: string, init?: RequestOptions = BaseAPI.requestInit()) {
        return fetch(input, init)
            .then((response) => {
                // throw error if response is not ok
                if (!response.ok) {
                    throw response;
                }

                // throw error if response data is not in JSON format
                const contentType = response.headers.get("Content-Type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new TypeError("Returned data is not in JSON format.");
                }

                return response.json();
            });
    }

    static downloadFile(location: string, requestType?: string = "GET", body?: Object) {
        const form: HTMLFormElement = window.document.createElement("form");

        form.target = "_blank";
        form.action = BaseAPI.getUri(location);
        form.method = requestType;

        if (body) {
            Object.entries(body).forEach(([key, val]: [string, mixed]) => {
                if (typeof val === "string" || typeof val === "number" || typeof val === "boolean") {
                    const input: HTMLInputElement = window.document.createElement("input");
                    input.name = key;
                    input.value = val.toString();
                    form.appendChild(input);
                }
            });
        }

        window.document.body.appendChild(form);
        form.submit();
        window.document.body.removeChild(form);
    }

    static getUri(location: string, version?: string = "v1.0") {
        if (!BaseAPI.apiUrl) {
            throw new Error("API_URL is not defined.");
        }
        return `${BaseAPI.apiUrl}/${version}/${location}`;
    }
}

export default BaseAPI;
