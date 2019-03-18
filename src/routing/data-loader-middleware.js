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

export default () => (toState: Object, fromState: Object, done: Function) => {
    if (Object.prototype.hasOwnProperty.call(dataLoader, toState.name)) {
        const dl = dataLoader[toState.name];

        if (dl.loginRequired) {
            api.user.auth()
                .then(() => {
                    dl.loader({ toState, fromState, loadData, done });
                })
                .catch(() => {
                    // handle auth error
                    done();
                });
        }
        else {
            dl.loader({ toState, fromState, loadData, done });
        }
    }
    else {
        done();
    }
};
