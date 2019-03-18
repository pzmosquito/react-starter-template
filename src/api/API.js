// @flow
import BaseAPI from "./BaseAPI";


class API extends BaseAPI {
    constant = {
        getConstants: () => (
            Promise.resolve({})
        ),
    }

    user = {
        auth: () => (
            Promise.resolve(true)
        ),
        getUser: () => (
            Promise.resolve({})
        ),
    }
}


export default API;
