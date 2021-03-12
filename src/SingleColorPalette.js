import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import ColorBox from './ColorBox';
import styles from './styles/SingleColorPaletteStyles';

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
        let { emoji, paletteName, id } = this.props.palette;
        let { format } = this.state;
        let { classes } = this.props;
        let colorBoxes = this._shades.map(color => (
            <ColorBox 
                background={color[format]} 
                name={color.name} 
                key={color.name} 
                showingFullPalette={false}
            />
        ))
        return (
            <div className={classes.Palette}>
                <Navbar handleChange={this.changeFormat} showingAllColors={false}/>
                <div className={classes.colors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`}>Go Back</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        );
    }
}

export default withStyles(styles)(SingleColorPalette);