import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteFooterStyles';

function PaletteFooter(props) {
    let {paletteName, emoji, classes} = props;
    return (
        <footer className={classes.PaletteFooter}>
            {paletteName}
            <span className={classes.emoji}>{emoji}</span>
        </footer>
    );
}

export default withStyles(styles)(PaletteFooter);