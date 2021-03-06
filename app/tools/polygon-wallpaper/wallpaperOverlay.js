import React from 'react';
import PropTypes from 'prop-types';

class WallpaperOverlay extends React.Component {

    _getArea(screenIdx) {
      const pxPerScreen = Math.floor(this.props.fullWidth / this.props.screens);

      // Create a sub-canvas from master canvas containing entire wallpaper. Lazy generation
      // of png image from sub canvas. When user clicks button.
      const wallPaperUrl = () => WallpaperOverlay.getDataURLSubImage(
        this.props.canvas,
        pxPerScreen*screenIdx,
        0,
        pxPerScreen,
        this.props.fullHeight);

      const saveAction = () => {WallpaperOverlay.saveAs(wallPaperUrl(), 'wallpaper' + screenIdx)};

      //Vertical sep, only if more than one screen
      const sep = this.props.screens > 1 && screenIdx < this.props.screens - 1 ? "separator" : "";
      return (
        <div key={"screen" + screenIdx} className={"screen " + sep} style={{width: pxPerScreen, left: pxPerScreen*(screenIdx)}}>
          <button className="mui-btn mui-btn--fab download-btn" onClick={saveAction}>
            <i className="fa fa-download" aria-hidden="true"></i>
          </button>
        </div>
      );
    }

    render() {
      let sepDownComp = [];
      for(var i = 0; i<this.props.screens; i++) {
        sepDownComp.push(this._getArea(i));
      }
      return (
          <div>
            {sepDownComp}
          </div>
      );
    }
}

WallpaperOverlay.propTypes = {
  screens: PropTypes.number.isRequired,
  canvas: PropTypes.object.isRequired,
  fullWidth: PropTypes.number.isRequired,
  fullHeight: PropTypes.number.isRequired,
};

WallpaperOverlay.getDataURLSubImage = function(canvas,x,y,w,h) {
  var can = document.createElement("canvas");
  can.width = w;
  can.height = h;
  var ctx = can.getContext("2d");
  ctx.drawImage(canvas,-x,-y);
  return can.toDataURL("image/png");
};

// Helper to do download button with data content generated last-minute.
WallpaperOverlay.saveAs = function(uri, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;

      //Firefox requires the link to be in the body
      document.body.appendChild(link);

      //simulate click
      link.click();

      //remove the link when done
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  };

WallpaperOverlay.ReadableName = [
  [''],
  ['left', 'right'],
  ['left', 'center', 'right'],
  ['left', 'center-left', 'center-right', 'right'],
];

module.exports = WallpaperOverlay;
