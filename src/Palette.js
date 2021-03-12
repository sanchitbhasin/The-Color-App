import React, {Component} from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteStyles';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';

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
        let { colors, paletteName, emoji, id } = this.props.palette;
        let { classes } = this.props;
        let colorBoxes = colors[level].map(color => (
            <ColorBox 
                background={color[format]} 
                name={color.name} 
                key={color.id} 
                paletteId={id}
                id={color.id}
                showingFullPalette
            />
        ));
        return (
            <div className={classes.Palette}>
                <Navbar 
                    level={level}
                    changeLevel={this.changeLevel} 
                    handleChange={this.changeFormat}
                    showingAllColors
                />
                <div className={classes.colors}>
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        );
    }
}

export default withStyles(styles)(Palette);