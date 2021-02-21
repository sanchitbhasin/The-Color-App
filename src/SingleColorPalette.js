import React, {Component} from 'react';
import ColorBox from './ColorBox';

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.generateShades(this.props.palette.colors, this.props.colorId);
        console.log(this._shades);
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

    render() {
        let colorBoxes = this._shades.map(color => (
            <ColorBox 
                background={color.hex} 
                name={color.name} 
                key={color.id} 
                showMore={false}
            />
        ))
        return (
            <div className='Palette'>
                <h1>Single Color Palette</h1>
                <div className='Palette-colors'>
                    {colorBoxes}
                </div>
            </div>
        );
    }
}

export default SingleColorPalette;