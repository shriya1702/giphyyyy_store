/**
 * @format
 */
import { decode } from 'base-64';
global.atob = decode;

import { AppRegistry, Text, TextInput } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

// // Override Text scaling
// if (Text.defaultProps) {
//   Text.defaultProps.allowFontScaling = false;
// } else {
//   Text.defaultProps = {};
//   Text.defaultProps.allowFontScaling = false;
// }

// // Override Text style
if (Text.defaultProps) {
    Text.defaultProps.style = { color: '#000' }; // Set default text color to black
} else {
    Text.defaultProps = {};
    Text.defaultProps.style = { color: '#000' }; // Set default text color to black
}

// // Override Textinput scaling in input fields
// if (TextInput.defaultProps) {
//   TextInput.defaultProps.allowFontScaling = false;
// } else {
//   TextInput.defaultProps = {};
//   TextInput.defaultProps.allowFontScaling = false;
// }

// // Override TextInput style
if (TextInput.defaultProps) {
    TextInput.defaultProps.style = { color: '#000' }; // Set default text color to black
} else {
    TextInput.defaultProps = {};
    TextInput.defaultProps.style = { color: '#000' }; // Set default text color to black
}

AppRegistry.registerComponent(appName, () => App);
