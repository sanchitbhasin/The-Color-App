import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import { arrayMove } from 'react-sortable-hoc';
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class NewPaletteForm extends Component {
    static defaultProps = {
      maxColors: 20
    }

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            colors: this.props.palettes[0].colors    // to start with some colors
        }
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeColor = this.removeColor.bind(this);
        this.clearColors = this.clearColors.bind(this);
        this.addRandomColor = this.addRandomColor.bind(this);
    }

    removeColor(colorName) {
      this.setState({
        colors: this.state.colors.filter(color => color.name !== colorName)
      })
    }

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleSubmit(newPaletteName) {
      let newPalette = {
        paletteName: newPaletteName,
        id: newPaletteName.toLowerCase().replace(/ /g, "-"),
        colors: this.state.colors
      }
      this.props.savePalette(newPalette);
      // redirect to "root"
      this.props.history.push("/");
    }

    addNewColor(newColor) {
      this.setState({colors: [...this.state.colors, newColor]});
    }

    onSortEnd = ({oldIndex, newIndex}) => {
      this.setState(({colors}) => ({
        colors: arrayMove(colors, oldIndex, newIndex),
      }));
    };

    clearColors() {
      this.setState({ colors: [] });
    }

    addRandomColor() {
      let rand = Math.floor(Math.random() * (this.props.palettes.length));
      let palette = this.props.palettes[rand];
      rand = Math.floor(Math.random() * (palette.colors.length));
      let randColor = palette.colors[rand];
      this.setState({
        colors: [...this.state.colors, randColor]
      });
    }

    render() {
        const { classes, maxColors, palettes } = this.props;
        const { open, colors } = this.state;
        let paletteIsFull = colors.length >= maxColors

        return (
            <div className={classes.root}>
                <PaletteFormNav
                  open={open}
                  handleSubmit={this.handleSubmit}
                  handleDrawerOpen={this.handleDrawerOpen}
                  palettes={palettes}
                />
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                >
                  <div className={classes.drawerHeader}>
                      <IconButton onClick={this.handleDrawerClose}>
                          <ChevronLeftIcon />
                      </IconButton>
                  </div>
                  <Divider />
                  <Typography variant='h4'>Design your Palette</Typography>
                  <div>
                      <Button 
                        variant='contained' 
                        color='secondary'
                        onClick={this.clearColors}
                      >
                        Clear Palette
                      </Button>
                      <Button 
                        variant='contained' 
                        color='primary'
                        onClick={this.addRandomColor}
                        disabled={paletteIsFull}
                      >
                        Random Color
                      </Button>
                  </div>
                  <ColorPickerForm
                    paletteIsFull={paletteIsFull}
                    addNewColor={this.addNewColor}
                    colors={colors}
                  />
                    
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    
                    <DraggableColorList
                      colors={ colors }
                      removeColor={this.removeColor}
                      axis="xy"
                      onSortEnd={this.onSortEnd}
                    />

                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);