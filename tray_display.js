var Tray = require('tray');
var moment = require('moment');
var Menu = require('menu');

function TrayDisplay() {
  this._tray = new Tray("./imgs/ready.png");
  this._createMenu("No Project");
}

TrayDisplay.prototype = {

  _createMenu : function(projectStatus) {
    var menu = Menu.buildFromTemplate([
      { label: projectStatus, type: 'normal', enabled : false },
      { type: 'separator' },
      { label: 'Quit', type: 'normal', click : function() { app.quit(); } }
    ]);
    this._tray.setContextMenu(menu);
  },

  setStatus : function(projectName, status) {
    var img, label;

    if (status === "success") {
      img = "./imgs/green.png";
      label = ": success at ";
    } else if (status === "error") {
      img = "./imgs/red.png";
      label = ": error at ";
    }

    if (!img) {
      console.log("Unknown status: " + status);
      return;
    }

    this._tray.setImage(img);
    this._createMenu(projectName + label + this._nowTimestamp());
  },

  _nowTimestamp : function() {
    return moment().format('M/D/YYYY, h:mm:ss A');
  }

}

module.exports = TrayDisplay;