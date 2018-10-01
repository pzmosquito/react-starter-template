// @flow
import '@babel/polyfill';
import { renderApp, router } from './components/App';


// enable HMR
if (module.hot) {
    module.hot.accept(renderApp);
}

// start router
router.start(renderApp);
