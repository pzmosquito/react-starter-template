import { RouterStore } from 'mobx-router5';
import DataStore from './DataStore';
import UIStore from './UIStore';

const dataStore = new DataStore();
const uiStore = new UIStore();
const routerStore = new RouterStore();

export {
    dataStore,
    uiStore,
    routerStore
};
