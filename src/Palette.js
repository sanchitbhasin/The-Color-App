import React, {Component} from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import './Palette.css';

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = { level: 500, format: 'hex' }
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }

    changeLevel(newLevel) {
        this.setState({level: newLevel});
    }

    changeFormat(val) {
        this.setState({format: val});
    }

    render() {
        let { level, format } = this.state;
        let { colors } = this.props.palette;
        let colorBoxes = colors[level].map(color => (
            <ColorBox background={color[format]} name={color.name}/>
        ));
        return (
            <div className="Palette">
                <Navbar 
                    level={level} 
                    changeLevel={this.changeLevel} 
                    handleChange={this.changeFormat}
                />
                {/* Navbar goes here */}
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
                {/* footer goes here */}
            </div>
        );
    }
}

export default Palette;