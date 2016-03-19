var SerialPort = require("serialport").SerialPort
var PUBNUB = require("pubnub")
var serialPort = new SerialPort("/dev/cu.SLAB_USBtoUART", {
  baudrate: 9600
},false);

var channel = 'eon-map-123456'

var me = {
  icon: {
    'marker-color': 'blue'
  }
};
var them = {
  icon: {
    'marker-color': 'green'
  }
};
var pn = PUBNUB.init({
  publish_key: 'demo',
  subscribe_key: 'demo'
});

var new_torchys = [
  {
    latlng: [28.61899,77.198],
    marker: me
  },
  {
    latlng: [28.6177,77.2011],
    marker: them
  },
  {
    latlng: [28.6172,77.1910],
    marker: them
  },
  {
    latlng: [28.617748,77.195100],
    marker: them
  },
  {
    latlng: [28.6174,77.19544],
    marker: them
  },
  {
    latlng: [28.617467,77.2022],
    marker: them
  }
];


serialPort.open(function (error) {
  if ( error ) {
    console.log('failed to open: '+error);
  } else {
    console.log('open');
    serialPort.on('data', function(data) {
      console.log('data received: ' + data);
      pn.publish({
        channel: channel,
        message: new_torchys
      });
    });
    // serialPort.write("ls\n", function(err, results) {
    //   console.log('err ' + err);
    //   console.log('results ' + results);
    // });
  }
});
