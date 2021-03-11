import sizes from "./sizes";
import bg from './bg.svg';

export default {
    "@global": {
        ".fade-exit": {
            opacity: "1"
        },
        ".fade-exit-active": {
            opacity: "0",
            transition: "opacity 500ms ease-out"
        },
        ".item-enter": {
            opacity: "0"
        },
        ".item-enter-active": {
            opacity: "1",
            transition: "opacity 500ms ease-in"
        }
    },
    root: {
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: "#2d91ee",
        backgroundImage: `url(${bg})`,
        /* background by SVGBackgrounds.com */
        overflow: "scroll"
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "Wrap",
        flexWrap: "wrap",
        [sizes.down("xs")]: {
            width: "60%"
        }
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        color: "white",
        alignItems: "center",
        "& a": {
            color: "white"
        }
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: 'repeat(3, 30%)',
        gridGap: "2.5rem",
        [sizes.down("md")]: {
            gridTemplateColumns: "repeat(2, 50%)"
        },
        [sizes.down("xs")]: {
            gridTemplateColumns: "repeat(1, 100%)",
            gridGap: "1rem"
        }
    }
};