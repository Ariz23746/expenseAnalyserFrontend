import reactotron, {asyncStorage, networking} from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';

let Reactotron = null;
if (__DEV__) {
  Reactotron = reactotron
    .configure({
      name: 'expenseAnalyserFrontend',
      // host: '192.168.1.12',
    }) // controls connection & communication settings
    .useReactNative()
    .use(reactotronRedux())
    .use(networking())
    .use(asyncStorage()) // add all built-in react native plugins
    // add all built-in redux features // add all built-in saga features
    .connect(); // let's connect!
  console.tron = Reactotron;
} else {
  console.tron = {
    log: () => {},
    warn: () => {},
    error: () => {},
  };
}

export default Reactotron;
