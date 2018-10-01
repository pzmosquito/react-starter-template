/* eslint-disable */

import type DataStoreType from '../webui/stores/DataStore';
import type UIStoreType from '../webui/stores/UIStore';
import type { RouterStore as RouterStoreType } from 'mobx-router5';


// parcel HMR
declare var module: {
    hot: {
        accept: (callback: () => void) => void
    };
};

// stores
declare type DataStore = DataStoreType;
declare type UIStore = UIStoreType;
declare type RouterStore = RouterStoreType;
