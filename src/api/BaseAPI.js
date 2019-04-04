// @flow
class BaseAPI {
    csrftoken: ?string = null;

    apiUrl: ?string = process.env.API_URL;

    requestInit(requestType?: string = "GET", body?: JSONType, cors?: boolean = true): RequestOptions {
        const init: RequestOptions = {
            method: requestType,
            headers: new Headers({ "Content-Type": "application/json" }),
        };

        if (cors) {
            init.mode = "cors";
            init.credentials = "include";
        }

        if (body) {
            init.body = JSON.stringify(body);
        }

        if (["POST", "PUT", "PATCH", "DELETE"].includes(requestType)) {
            // TODO change header to an accepted header.
            init.headers.set("X-CSRFTOKEN", this.csrftoken || "");
        }

        return init;
    }

    fetchData(input: string, init?: RequestOptions = this.requestInit()) {
        return fetch(input, init)
            .then((response) => {
                this.csrftoken = response.headers.get("X-CSRFTOKEN");

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

    downloadFile(location: string, requestType?: string = "GET", body?: Object) {
        const form: HTMLFormElement = window.document.createElement("form");

        form.target = "_blank";
        form.action = this.getUri(location);
        form.method = requestType;

        if (body) {
            Object.entries(body).forEach(([key, val]: [string, string]) => {
                const input: HTMLInputElement = window.document.createElement("input");
                input.name = key;
                input.value = val;
                form.appendChild(input);
            });
        }

        window.document.body.appendChild(form);
        form.submit();
        window.document.body.removeChild(form);
    }

    getUri(location: string, version?: string = "v1.0") {
        if (!this.apiUrl) {
            throw new Error("API_URL is not defined.");
        }
        return `${this.apiUrl}/${version}/${location}`;
    }
}

export default BaseAPI;
