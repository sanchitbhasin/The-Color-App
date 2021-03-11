import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete';

class MiniPalette extends Component {
    constructor(props) {
        super(props);
        this.deletePalette = this.deletePalette.bind(this);
    }

    deletePalette(e) {
        this.props.openDialoge(this.props.id);
        e.stopPropagation();
    }

    render() {
        let { classes, paletteName, emoji, colors } = this.props;
        let miniColorBoxes = colors.map((color) => (
            <div 
                className={classes.miniColor}
                style={{ backgroundColor: color.color }}
                key={color.name}
            />
        ))
        return (
            <div className={classes.root} onClick={this.props.handleClick}>
                <DeleteIcon 
                    className={classes.deleteIcon}
                    style={{transition: "all 0.3s ease-in-out"}}
                    onClick={this.deletePalette}
                />
                <div className={classes.colors}>{miniColorBoxes}</div>
                <h5 className={classes.title}>
                    {paletteName} <span className={classes.emoji}>{emoji}</span>
                </h5>
            </div>
        );
    }
}

export default withStyles(styles)(MiniPalette);