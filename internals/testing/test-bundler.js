// needed for regenerator-runtime
// (ES7 generator support is required by redux-saga)
import 'babel-polyfill';

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-15');

Enzyme.configure({ adapter: new Adapter() });
