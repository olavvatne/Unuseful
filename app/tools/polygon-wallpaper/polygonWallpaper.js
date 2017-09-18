import React from 'react';
import Trianglify from 'trianglify';
import UIButton from '../../common/UIButton';
import WallpaperOverlay from './wallpaperOverlay';
import UIText from '../../common/UIText';

class PolygonWallpaper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      screens: 1,
      autoSize: true,
      color: 'random',
      variance: Math.random()*100,
      cellSize: 100,
      seed: this._getARandomSeed()
    };
  }

  componentWillMount() {
    this._updateDimensions();
  }

  componentDidMount() {
    window.addEventListener("resize", () => this._updateDimensions());
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this._updateDimensions());
  }

  _updateDimensions(isAuto) {
    // If auto is false, only way to call and update width to browser dimensions is by sending true as first argument.
    if (this.state.autoSize || isAuto) {
      const d = document;
      const body = d.getElementsByTagName('body')[0];
      const width = window.innerWidth || d.documentElement.clientWidth || body.clientWidth;
      const height = window.innerHeight|| d.documentElement.clientHeight|| body.clientHeight;

      this.setState({width: width, height: height, autoSize: true});
    }
  }

  _setFixedImageSize(size) {
    this.refs.width.reset()
    this.refs.height.reset()
    this.setState({width: size.width, height: size.height, autoSize: false});
  }

  _setDynamicImageSize() {
    this.refs.height.reset()
    this.refs.width.reset()
    this._updateDimensions(true)
  }

  _setCustomImageSize(size) {
    let newState = {autoSize: false};
    if (size.width) {
      newState.width = parseInt(size.width);
    }
    if (size.height) {
      newState.height = parseInt(size.height);
    }
    this.setState(newState);
  }

  _getARandomSeed() {
    return Math.random().toString(36).substring(7);
  }
  _varianceChange(event) {
    this.setState({variance: parseFloat(event.target.value)});
  }

  _sizeChange(event) {
    this.setState({cellSize: parseInt(event.target.value)});
  }

  _randomColor() {
    const palette = Trianglify.colorbrewer;
    const keys = Object.keys(palette);
    this.setState({color: palette[keys[Math.floor(Math.random()*keys.length)]]})
  }

  renderSizeComponent(sizes) {
    return (
    <div className="screen-size-component">
      <a key={'fit'} onClick={() => this._setDynamicImageSize()}>Fit</a>
      { sizes.map((size) => {
        const s = size.width + "x" + size.height
        const isSelected = this.state.width === size.width && this.state.height === size.height;
        const arrowComp = isSelected ? "fa-caret-right" : "fa-min";
        return (
          <a key={s} onClick={() => this._setFixedImageSize(size)}>
            <i className={"fa " +  arrowComp} aria-hidden="true" /> {s}
          </a>
        );
      })
      }

    <UIText ref="width"
      labelText="Width"
      onChange={(val) => this._setCustomImageSize({width: val})}
      validationPattern="^[1-9]\d*$"/>
    <UIText ref="height"
      labelText="Height"
      onChange={(val) => this._setCustomImageSize({height: val})}
      validationPattern="^[1-9]\d*$" />
    </div>
    );
  }

  // Selection of number of monitors wallpaper should be split into
  renderScreenButton(nr) {
    // 4 screens - should render as icon x 4
    const nrOfIcons = nr <= 3 ? nr : 1;
    let screenIcons = [...Array(nrOfIcons)].map((x, i) =>
      <i  key={"i" + i} className="fa fa-desktop" aria-hidden="true">
       {nr > 3 ? <p className="monitor-text">{"x" + nr}</p> : null}
      </i>
   );
    // one of the button is always selected
    let cl = "mui-btn mui-btn--raised monitor-btn";
    if (nr === this.state.screens) {
      cl += " mui-btn--primary"
    }
    return (
      <button className={cl} onClick={() => {this.setState({screens: nr})}}>
        {screenIcons}
      </button>
    )
  }

  renderDownloadLink(screenIdx, canvas) {
    const pxPerScreen = Math.floor(this.state.width / this.state.screens);
    // Create a sub-canvas from master canvas containing entire wallpaper. Lazy generation
    // of png image from sub canvas. When user clicks button.
    const wallPaperUrl = () => WallpaperOverlay.getDataURLSubImage(
      canvas,
      pxPerScreen*screenIdx,
      0,
      pxPerScreen,
      this.state.height);

    const saveAction = () => {WallpaperOverlay.saveAs(wallPaperUrl(), 'wallpaper' + screenIdx)};
    const name = WallpaperOverlay.ReadableName[this.state.screens-1][screenIdx];
    return ( <a key={'sc' + screenIdx} style={{marginRight: "10px" }} href="#" onClick={saveAction}>Wallpaper {name}</a>);
  }

  render() {
    //Configures pattern. Every state change usually means a config parameter has changed.
    const pattern = Trianglify({
  		width: this.state.width,
  		height: this.state.height,
      stroke_width: 1.51,
      x_colors: this.state.color,
      y_colors: 'match_x',
      variance: this.state.variance / 100,
      seed: this.state.seed,
      cell_size: this.state.cellSize,
  	});
    const canv = pattern.canvas();
    const downloadLinks = [...Array(this.state.screens)].map((x, i) =>
      this.renderDownloadLink(i, canv)
    );

    return (
      <div>
        <WallpaperOverlay
          screens={this.state.screens}
          canvas={canv}
          fullWidth={this.state.width}
          fullHeight={this.state.height}
        />

        <svg
          width={pattern.opts.width}
          height={pattern.opts.height}
        >
          {
            pattern.polys.map((poly, index) => (
              <path
                key={index}
                d={`M${poly[1].join('L')}Z`}
                fill={poly[0]}
                stroke={poly[0]}
                strokeWidth={pattern.opts.stroke_width}
              />
            ))
          }
        </svg>

        <div className="control-panel">
          <div className="panel-content">
          <h3>Variance</h3>
          <input className="input-range" type="range" min="0" max="100" value={this.state.variance} onChange={(e) => this._varianceChange(e) } />

          <h3>Size</h3>
          <input className="input-range" type="range" min="40" max="200" value={this.state.cellSize} onChange={(e) => this._sizeChange(e) } />

          <h3>Color</h3>
          <UIButton
              label="Random"
              primary={false}
              onClick={() => {this._randomColor()}} />

          <h3>Monitor</h3>
          {this.renderScreenButton(1) }
          {this.renderScreenButton(2) }
          {this.renderScreenButton(3) }
          {this.renderScreenButton(4) }

          <h3>Screen size</h3>
          { this.renderSizeComponent(PolygonWallpaper.ScreenSizes) }

          <h3>Download</h3>
          { downloadLinks }

          </div>
        </div>
      </div>
    );
  }
}

PolygonWallpaper.ScreenSizes = [
  {
    width: 3440,
    height: 1440,
  },
  {
    width: 2556,
    height: 1440,
  },
  {
    width: 1920,
    height: 1080,
  },
  {
    width: 1366,
    height: 768,
  }
]

module.exports = PolygonWallpaper;
