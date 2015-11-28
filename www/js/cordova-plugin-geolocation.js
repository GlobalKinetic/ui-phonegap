/*!
 Copyright 2015 ManyWho, Inc.
 Licensed under the ManyWho License, Version 1.0 (the "License"); you may not use this
 file except in compliance with the License.
 You may obtain a copy of the License at: http://manywho.com/sharedsource
 Unless required by applicable law or agreed to in writing, software distributed under
 the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied. See the License for the specific language governing
 permissions and limitations under the License.

 This is a component wrapper for the Cordova Geolocation Plugin here:
 https://github.com/apache/cordova-plugin-geolocation
 */

(function (manywho) {

    //  Use this function to generate a unique identifier for the geolocation. This will make sure if we do more
    //  than one geolocation within the app, that there's no conflict with the objects overwriting each other.
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

    function convertGeolocationReverseToObjectData(country) {

        var objectData = null;

        if (country != null) {

            objectData = [];
            objectData.push({
                "externalId": generateUniqueIdentifier(),
                "developerName": "Geolocation Country",
                "isSelected": true,
                "properties": [
                    {
                        "developerName": "Name",
                        "contentValue": country.countryName
                    },
                    {
                        "developerName": "Code",
                        "contentValue": country.countryCode
                    }
                ]
            });

        }

        return objectData;

    }

    var cordovaPluginGeolocation = React.createClass({

        replaceContent: function() {

            manywho.log.info('Rendering Content for Cordova Plugin Geolocation: ' + this.props.id);

            var html = manywho.model.getComponent(this.props.id, this.props.flowKey).content
                .replace(/&quot;/g, '\"')
                .replace(/&#39;/g, '\'')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&');

            var node = this.getDOMNode();
            node.innerHTML = html;

            var imgs = node.querySelectorAll('img')
            if (imgs && imgs.length > 0) {

                for (var i = 0; i < imgs.length; i++) {

                    imgs[i].className += ' img-responsive';

                }

            }

        },

        componentDidMount: function () {

            var id = this.props.id;
            var flowKey = this.props.flowKey;
            var componentFunction = this;

            // Get the dom node for this component
            var node = this.getDOMNode();

            // Get the users current location
            navigator.geolocation.getCurrentPosition(
                function(position) {

                    // Assemble the geo names address to decode the lat/lng
                    var address = 'http://api.geonames.org/countryCodeJSON';
                    address += '?lat=' + position.coords.latitude;
                    address += '&lng=' + position.coords.longitude;
                    address += '&username=demo';

                    alert('getting position from: ' + address);

                    // Dispatch the request
                    $.getJSON(
                        {
                            url: address,
                            type: 'JSON'
                        },
                        function(country) {

                            // Get the model out for the UI
                            var model = manywho.model.getComponent(id, flowKey);

                            // Assign the country object result to this component in the state and push the event
                            manywho.state.setComponent(id, { objectData: convertGeolocationReverseToObjectData(country) }, flowKey, true);
                            manywho.component.handleEvent(componentFunction, model, flowKey);

                            // Replace the html with the country name
                            node.innerHTML = country.countryName;

                        },
                        function(error) {
                            alert(error.message);

                            manywho.log.info('Error getting current position: ' + error.message);
                        }
                    );

                }, function(error) {
                    alert(error.message);

                    manywho.log.info('Error getting current position: ' + error.message);
                }
            );

        },

        render: function () {

            manywho.log.info('Rendering Cordova Plugin Geolocation: ' + this.props.id);

            // We use the presentation class as we're going to write the location into content
            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "presentation", this.props.flowKey).join(' ');

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);

            if (model.isVisible == false) {

                classes += ' hidden';

            }

            return React.DOM.div({ className: classes, id: this.props.id }, null);

        }
    });

    manywho.component.register('cordova-plugin-geolocation', cordovaPluginGeolocation, ['cordova_plugin_geolocation']);

}(manywho));



