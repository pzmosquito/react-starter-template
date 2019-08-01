import UIStore from "./UIStore";


class AppStore {
    uiStore: UIStore;

    constructor() {
        this.uiStore = new UIStore(this);
    }
}

export default AppStore;
