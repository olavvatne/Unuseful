import React from 'react';
import Trianglify from 'trianglify';

class PolygonWallpaper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      variance: Math.random()*100,
      cellSize: 100,
      seed: this._getARandomSeed()
    };
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener("resize", () => this.updateDimensions());
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.updateDimensions());
  }

  updateDimensions() {
    console.log("update");
    const d = document;
    const body = d.getElementsByTagName('body')[0];
    const width = window.innerWidth || d.documentElement.clientWidth || body.clientWidth;
    const height = window.innerHeight|| d.documentElement.clientHeight|| body.clientHeight;

    this.setState({width: width, height: height});
  }
  _getARandomSeed() {
    return Math.random().toString(36).substring(7);
  }
  _varianceChange(event) {
    console.log("ABC");
    this.setState({variance: parseFloat(event.target.value)});
  }

  _sizeChange(event) {
    console.log("TEST");
    this.setState({cellSize: parseInt(event.target.value)});
  }

  render() {
    console.log(this.state.cellSize);
    const pattern = Trianglify({
  		width: this.state.width,
  		height: this.state.height,
      variance: this.state.variance / 100,
      seed: this.state.seed,
      cell_size: this.state.cellSize,
  	});

    return (
      <div>
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
        <a className="download-btn" href={pattern.png()} download>
          <button className="mui-btn mui-btn--fab">+</button>
        </a>
        <div className="control-panel">
          <a>2556x1440</a>
          <a>1920x1080</a>
          <h3>Variance</h3>
          <input className="input-range" type="range" min="0" max="100" value={this.state.variance} onChange={(e) => this._varianceChange(e) } />

          <h3>Size</h3>
          <input className="input-range" type="range" min="40" max="200" value={this.state.cellSize} onChange={(e) => this._sizeChange(e) } />
        </div>
      </div>
    );
  }
}

module.exports = PolygonWallpaper;
