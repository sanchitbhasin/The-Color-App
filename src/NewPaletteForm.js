import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import { colors } from '@material-ui/core';
import DraggableColorBox from './DraggableColorBox';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
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
    constructor(props) {
        super(props);
        this.state = {
            currColor: "#ddd",
            open: true,
            newColorName: "",
            colors: [],
            newPaletteName: ""
        }
        this.handleColorChange = this.handleColorChange.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      ValidatorForm.addValidationRule("isColorNameUnique", value => 
          this.state.colors.every(
            ({ name }) => name.toLowerCase() !== value.toLowerCase()
          )
      );
      ValidatorForm.addValidationRule("isColorUnique", value => 
          this.state.colors.every(
            ({ color }) => color !== this.state.currColor
          )
      );
      ValidatorForm.addValidationRule("isPaletteNameUnique", value => 
          this.props.palettes.every(
            ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
          )
      );
    }

    handleColorChange(color) {
      this.setState({
        currColor: color.hex
      });
    };

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

    handleSubmit() {
      let newName = this.state.newPaletteName;
      let newPalette = {
        paletteName: newName,
        id: newName.toLowerCase().replace(/ /g, "-"),
        colors: this.state.colors
      }
      this.props.savePalette(newPalette);
      // redirect to "root"
      this.props.history.push("/");
    }

    addNewColor() {
      const newColor = {
        name: this.state.newColorName,
        color: this.state.currColor
      }
      this.setState({colors: [...this.state.colors, newColor], newColorName: ""});
    }

    render() {
        const { classes } = this.props;
        const { open, currColor } = this.state;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color="default"
                    className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                          Persistant Drawer
                        </Typography>
                        <ValidatorForm onSubmit={this.handleSubmit}>
                          <TextValidator 
                            label="Palette Name"
                            value={this.state.newPaletteName}
                            name="newPaletteName"
                            onChange={this.handleChange}
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["this field is required", "Name already used"]}
                          />
                          <Button 
                            variant="contained" 
                            color="primary"
                            type="submit"
                          >
                            Save Palette
                          </Button>
                        </ValidatorForm>
                    </Toolbar>
                </AppBar>
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
                        <Button variant='contained' color='secondary'>Clear Palette</Button>
                        <Button variant='contained' color='primary'>Random Color</Button>
                    </div>
                    <ChromePicker 
                        color={currColor}
                        onChange={this.handleColorChange}
                        // onChangeComplete={(color)=>console.log(color)}
                    />
                    <ValidatorForm onSubmit={this.addNewColor}>
                      <TextValidator 
                        value={this.state.newColorName}
                        name="newColorName"
                        onChange={this.handleChange}
                        validators={['required', 'isColorNameUnique', 'isColorUnique']}
                        errorMessages={[
                          'this field is required', 
                          'color name must be unique', 
                          'color already taken'
                        ]}
                      />
                      <Button 
                        variant='contained' 
                        color='primary' 
                        style={{backgroundColor: currColor}}
                        type="submit"
                      >
                        Add Color
                      </Button>
                    </ValidatorForm>
                    
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    
                    {this.state.colors.map(color => (
                        <DraggableColorBox color={color.color} name={color.name}/>
                    ))}

                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);