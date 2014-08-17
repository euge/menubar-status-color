var Tray = require('tray');
var moment = require('moment');
var Menu = require('menu');
var app = require('app');

function imgForColor(color) {
  return __dirname + "/imgs/" + color + ".png";
}

function TrayDisplay() {
  this._tray = new Tray(imgForColor("grey"));
  this._createMenu("No Project");
}

TrayDisplay.prototype = {

  _createMenu : function(projectStatus) {
    var menu = Menu.buildFromTemplate([
      {
        label: projectStatus,
        type: 'normal',
        enabled : false
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        type: 'normal',
        click : function() {
          app.quit();
        }
      }
    ]);
    this._tray.setContextMenu(menu);
  },

  setStatus : function(color, label) {
    this._tray.setImage(imgForColor(color));
    this._createMenu(label + " at " + this._nowTimestamp());
  },

  _nowTimestamp : function() {
    return moment().format('M/D/YYYY, h:mm:ss A');
  }

}

module.exports = TrayDisplay;