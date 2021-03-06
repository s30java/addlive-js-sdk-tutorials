/**
 * @fileoverview
 * @TODO file description
 *
 * @author Tadeusz Kozak
 * @date 26-06-2012 10:37
 */

(function () {
  'use strict';


  /**
   * Document ready callback - starts the AddLive platform initialization.
   */
  function onDomReady () {
    console.log('DOM loaded');

    // assuming the initAddLiveLogging and initDevicesSelects
    // are exposed via ADLT namespace.
    // (check shared-assets/scripts.js)
    ADLT.initAddLiveLogging();
    ADLT.initDevicesSelects();
    // Initializes the AddLive SDK.
    initializeAddLive();
  }

  /**
   * Initializes the AddLive SDK.
   */
  function initializeAddLive() {
    ADLT.initializeAddLiveQuick(onPlatformReady,
        {applicationId:ADLT.APP_ID});
  }

  function onPlatformReady () {
    // assuming the populateDevicesOfType is exposed via ADLT namespace.
    // (check shared-assets/scripts.js)
    ADLT.populateDevicesOfType('#camSelect', 'VideoCapture');
    startLocalVideo();
  }

  function startLocalVideo () {
    var resultHandler = function (sinkId) {
      console.log('Local preview started. Rendering the sink with id: ' + sinkId);
      ADL.renderSink({
        sinkId:sinkId,
        containerId:'renderContainer'
      });

      ADL.renderSink({
        sinkId:sinkId,
        containerId:'renderContainerWindowed',
        windowless:false
      });


      ADL.renderSink({
        sinkId:sinkId,
        containerId:'renderContainerMirror',
        mirror:true
      });

      ADL.renderSink({
        sinkId:sinkId,
        containerId:'renderContainerBicubic',
        filterType:ADL.VideoScalingFilter.BICUBIC
      });
    };
    ADL.getService().startLocalVideo(ADL.createResponder(resultHandler));
  }

  /**
   * Register the document ready handler.
   */
  $(onDomReady);
})();