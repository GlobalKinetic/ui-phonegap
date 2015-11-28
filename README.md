ManyWho PhoneGap UI
===================

This UI project allows you to embed your flows into a PhoneGap application. We have also added a couple of components as examples
of the kinds of things you can do with ManyWho when combined with the native bridging capabilities of PhoneGap. The two components are:

### Cordova Plugin Geolocation
https://github.com/apache/cordova-plugin-geolocation

### PhoneGap Plugin Barcode Scanner
https://github.com/cfjedimaster/Cordova-Examples/tree/master/barcode

## Usage

This repo is linked to our HTML5 player UI code repo here: https://github.com/manywho/ManyWho_HTML5_Players2. This allows 
you to easily debug any UI issues and easily extend the UI to include new capabilities as we have included with the above
two additional PhoneGap/Cordova plugins.

For the purposes of this project, we are assuming you have a valid Flow built on the ManyWho platform. To link this code to
your Flow, amend www/index.html:

```javascript
// Values specific to the flow
var tenantId = ''; // ADD YOUR TENANT ID HERE
var flowId = ''; // ADD YOUR FLOW ID HERE
```

#### Building

To build, you should include the files in this repo in your PhoneGap project. We have not included the standard PhoneGap 
template directories here.

To install PhoneGap on your machine:
```bash
$ sudo npm install -g phonegap@latest
```

To use the local iOS Simulator (optional)
```bash
$ sudo npm install ios-sim -g
```

Though the UI code included in this project is compatible with Android/Windows phones also.

#### Running

This is a standard PhoneGap structure. To run the app, use:
```bash
$ phonegap run ios
```

## Contributing

Contribution are welcome to the project - whether they are feature requests, improvements or bug fixes! Refer to 
[CONTRIBUTING.md](CONTRIBUTING.md) for our contribution requirements.

## License

This service is released under the [MIT License](http://opensource.org/licenses/mit-license.php).
