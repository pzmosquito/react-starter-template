// @flow
class HomeDataLoader {
    static register(toState: Object, fromState: Object, loader: Function, done: Function) {
        switch (toState.name) {
            case "home":
                loader().then(() => {
                    done();
                });
                break;
            default:
        }
    }
}

export default HomeDataLoader;
