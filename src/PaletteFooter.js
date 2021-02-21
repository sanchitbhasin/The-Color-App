import React from 'react';

function PaletteFooter(props) {
    let {paletteName, emoji} = props;
    return (
        <footer className="Palette-footer">
            {paletteName}
            <span className="emoji">{emoji}</span>
        </footer>
    );
}

export default PaletteFooter;