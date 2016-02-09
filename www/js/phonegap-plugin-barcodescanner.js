/*!
 Copyright 2015 ManyWho, Inc.
 Licensed under the ManyWho License, Version 1.0 (the "License"); you may not use this
 file except in compliance with the License.
 You may obtain a copy of the License at: http://manywho.com/sharedsource
 Unless required by applicable law or agreed to in writing, software distributed under
 the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied. See the License for the specific language governing
 permissions and limitations under the License.

 This is a component wrapper for the PhoneGap Barcode Scanner Plugin here:
 https://github.com/cfjedimaster/Cordova-Examples/tree/master/barcode
 */

(function (manywho) {

    //  Use this function to generate a unique identifier for the scan. This will make sure if we do more than one scan
    //  within the app, that there's no conflict with the objects overwriting each other.
    //  http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    //
    function generateUniqueIdentifier() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function convertScanToObjectData(scan) {

        var objectData = null;

        if (scan != null) {

            objectData = [];
            objectData.push({
                "externalId": generateUniqueIdentifier(),
                "developerName": "Barcode Scan",
                "isSelected": true,
                "properties": [
                    {
                        "developerName": "Text",
                        "contentValue": scan.text
                    },
                    {
                        "developerName": "Format",
                        "contentValue": scan.format
                    },
                    {
                        "developerName": "Cancelled",
                        "contentValue": scan.cancelled.toString()
                    }
                ]
            });

        }

        return objectData;

    }

    var phonegapPluginBarcodeScanner = React.createClass({

        componentDidMount: function () {

            var id = this.props.id;
            var flowKey = this.props.flowKey;
            var componentFunction = this;

            // Scan using the barcode scanner plugin
            cordova.plugins.barcodeScanner.scan(
                function (scan) {
                    manywho.log.info('Captured: ' + data);

                    // Get the model out for the UI
                    var model = manywho.model.getComponent(id, flowKey);

                    // Assign the scan object result to this component in the state and push the event
                    manywho.state.setComponent(id, { objectData: convertScanToObjectData(scan) }, flowKey, true);
                    manywho.component.handleEvent(componentFunction, model, flowKey);

                    // Get any outcomes bound to this component
                    var outcomes = manywho.model.getOutcomes(id, flowKey);

                    // If we have an outcome, grab the first and immediately navigate down that path
                    if (outcomes != null &&
                        outcomes.length > 0) {
                        var outcome = manywho.model.getOutcome(outcomes[0].id, flowKey);

                        manywho.engine.move(outcome, flowKey);
                    }
                },
                function (error) {
                    manywho.log.info('Error: ' + error);
                }
            );

        },

        render: function () {

            manywho.log.info('Rendering PhoneGap Plugin BarcodeScanner: ' + this.props.id);

            // Put a placeholder div into the UI - this could perhaps be used to tell the user if it's not supported
            return React.DOM.div({ id: this.props.id });

        }
    });

    manywho.component.register('phonegap-plugin-barcodescanner', phonegapPluginBarcodeScanner, ['phonegap_plugin_barcodescanner']);

}(manywho));
