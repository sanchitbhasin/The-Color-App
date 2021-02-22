import React, {Component} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/styles';
import './ColorBox.css';

const styles = {
    ColorBox: {
        width: "20%",
        height: props => props.showingFullPalette ? "25%" : "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        "&:hover button": {
            opacity: "1",
            transition: "0.5s"
        }
    },
    copyText: {
        color: props => 
            chroma(props.background).luminance() >= 0.65 ? 'rgba(0,0,0,0.7)' : 'white'
    },
    colorName: {
        color: props => 
            chroma(props.background).luminance() <= 0.15 ? 'white' : 'black'
    },
    seeMore: {
        color: props => 
            chroma(props.background).luminance() >= 0.65 ? 'rgba(0,0,0,0.7)' : 'white',
        background: "rgba(255, 255, 255, 0.3)",
        position: "absolute",
        border: "none",
        right: "0",
        bottom: "0",
        width: "60px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px",
        textTransform: "uppercase"
    },
    copyButton: {
        color: props => 
            chroma(props.background).luminance() >= 0.65 ? 'rgba(0,0,0,0.7)' : 'white',
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        background: "rgba(255, 255, 255, 0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        textTransform: "uppercase",
        border: "none",
        textDecoration: "none",
        opacity: "0"
    }
};

class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = { copied: false }
        this.changeCopyState = this.changeCopyState.bind(this);
    }

    changeCopyState() {
        this.setState({ copied: true},() => {
            setTimeout(() => (this.setState({ copied: false })), 1500);
        });
    }

    render() {
        let {name, background, paletteId, id, showingFullPalette, classes} = this.props;
        let { copied } = this.state;

        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{ background }} className={classes.ColorBox}>
                    <div 
                        style={{ background }} 
                        className={`copy-overlay ${copied && "show"}`}
                    />
                    <div className={`copy-msg ${copied && "show"}`}>
                        <h1>copied!</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>
                            Copy
                        </button>
                    </div>
                    {showingFullPalette && 
                    <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
                        <span className={classes.seeMore}>More</span>
                    </Link>
                    }
                </div>
            </CopyToClipboard>
        );
    }
}

export default withStyles(styles)(ColorBox);