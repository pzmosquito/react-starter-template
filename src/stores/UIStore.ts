import AppStore from "./AppStore";


class UIStore {
    appStore: AppStore;

    constructor(appStore: AppStore) {
        this.appStore = appStore;
    }
}

export default UIStore;
