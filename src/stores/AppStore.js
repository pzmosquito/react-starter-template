// @flow
import UIStore from "./UIStore";


class AppStore {
    uiStore: UIStore;

    constructor() {
        this.uiStore = new UIStore(this);
    }

    constants = {
        status: -1, // -1 for not initiated, 0 for pending, 1 for fulfilled.
        data: null,
    };
}

export default AppStore;
