// @flow
import dataLoader from "../data-loaders";
import appStore from "../stores";
import api from "../api";


const loadData = (promises?: Array<Promise<any>> = []) => {
    const loadConstants = appStore.constants.status === -1;

    if (loadConstants) {
        promises.push(api.constant.getConstants());
        appStore.constants.status = 0;
    }

    return Promise.all(promises)
        .then((responses: Array<any>) => {
            if (loadConstants) {
                appStore.constants.data = responses.pop();
                appStore.constants.status = 1;
            }
            return responses;
        });
};

const requireLogin = (successFn: Function, errorFn?: Function) => {
    api.user.auth()
        .then(() => {
            successFn();
        })
        .catch(() => {
            if (errorFn) {
                errorFn();
            }
        });
};

export {
    loadData,
    requireLogin,
};

export default () => (toState: Object, fromState: Object, done: Function) => {
    if (Object.prototype.hasOwnProperty.call(dataLoader, toState.name)) {
        const dl = dataLoader[toState.name];
        const loaderFn = () => dl.loader({ toState, fromState, loadData, done });

        if (dl.loginRequired) {
            requireLogin(
                loaderFn,
                done,
            );
        }
        else {
            loaderFn();
        }
    }
    else {
        done();
    }
};
