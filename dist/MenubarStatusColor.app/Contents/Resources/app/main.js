var app = require('app');
var dgram = require('dgram');
var EventEmitter = require("events").EventEmitter;
var TrayDisplay = require("./tray_display");
var _ = require("underscore")._;


function Server(port) {
  this._port = port;
  this._server = dgram.createSocket("udp4");
  this._trayDisplay = new TrayDisplay();
  this._initHandling();
  this._server.bind(this._port);
}

Server.prototype = {

  _initHandling : function() {
    var self = this;

    this._server.on("error", function(err) {
      console.log(err);
      app.quit();
    });

    this._server.on("message", function(buffer) {
      var json, msg = buffer.toString();
      try {
        json = JSON.parse(msg);
      } catch (e) {
        console.log("Error parsing JSON: " + msg);
        return;
      }

      self._trayDisplay.setStatus(json.color, json.label);
    });
  }
}

app.on("window-all-closed", function() {
  if (process.platform !== "darwin") app.quit();
});

app.on("ready", function() {
  var server = new Server("8373");
});