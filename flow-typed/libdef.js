declare type DataLoader = {
    toState: Object,
    fromState: Object,
    loadData: Function,
    done: Function
};


declare type JSONType = null | string | number | boolean | {} | $ReadOnlyArray<mixed>;
