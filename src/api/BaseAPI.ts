class BaseAPI {
    private apiUrl = "";

    requestInit(method = "GET", body = {}, cors = true) {
        const init: RequestInit = {
            method,
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

    async fetchData(input: RequestInfo, init = this.requestInit()) {
        const response = await fetch(input, init);

        if (!response.ok) {
            throw response;
        }

        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new TypeError("Returned data is not in JSON format.");
        }

        return response.json();
    }

    downloadFile(path: string, method = "GET", body = {}) {
        const form = window.document.createElement("form");

        form.target = "_blank";
        form.action = this.getUri(path);
        form.method = method;

        if (body) {
            Object.entries(body).forEach(([key, val]) => {
                const input = window.document.createElement("input");
                input.name = key;
                input.value = val.toString();
                form.appendChild(input);
            });
        }

        window.document.body.appendChild(form);
        form.submit();
        window.document.body.removeChild(form);
    }

    private getUri(path: string, version = "v1.0") {
        if (!this.apiUrl) {
            throw new Error("API_URL is not defined.");
        }
        return `${this.apiUrl}/${version}/${path}`;
    }
}

export default BaseAPI;
