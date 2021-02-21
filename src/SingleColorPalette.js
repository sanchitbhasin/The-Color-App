import React, {Component} from 'react';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import ColorBox from './ColorBox';

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.generateShades(this.props.palette.colors, this.props.colorId);
        this.state = { format: 'hex' }
        this.changeFormat = this.changeFormat.bind(this);
    }

    generateShades(allColors, colorToFilterBy) {
        let shades = [];
        for(let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            );
        }
        // to exclude '50' key
        return shades.slice(1);
    }

    changeFormat(val) {
        this.setState({format: val});
    }

    render() {
        let { emoji, paletteName } = this.props.palette;
        let { format } = this.state;
        let colorBoxes = this._shades.map(color => (
            <ColorBox 
                background={color[format]} 
                name={color.name} 
                key={color.id} 
                showMore={false}
            />
        ))
        return (
            <div className='Palette'>
                <Navbar handleChange={this.changeFormat} showingAllColors={false}/>
                <div className='Palette-colors'>
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        );
    }
}

export default SingleColorPalette;