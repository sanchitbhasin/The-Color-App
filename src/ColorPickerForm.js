import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import styles from './styles/ColorPickerFormStyles';

class ColorPickerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currColor: "teal",
            newColorName: "",
        }
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule("isColorNameUnique", value => 
            this.props.colors.every(
              ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule("isColorUnique", value => 
            this.props.colors.every(
              ({ color }) => color !== this.state.currColor
            )
        );
    }

    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    handleColorChange(color) {
        this.setState({
          currColor: color.hex
        });
    };

    handleSubmit() {
        const newColor = {
            name: this.state.newColorName,
            color: this.state.currColor
        }
        this.props.addNewColor(newColor);
        this.setState({newColorName: ""});
    }

    render() {
        let { paletteIsFull, classes } = this.props;
        let { currColor, newColorName } = this.state;

        return (
            <div className={classes.root}>
                <ChromePicker 
                    color={currColor}
                    className={classes.picker}
                    onChange={this.handleColorChange}
                    // onChangeComplete={(color)=>console.log(color)}
                />
                <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
                    <TextValidator 
                        value={newColorName}
                        name="newColorName"
                        className={classes.colorNameInput}
                        placeholder="Color Name"
                        variant="filled"
                        margin="normal"
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
                        style={{backgroundColor: 
                            paletteIsFull ? "grey" : currColor
                        }}
                        type="submit"
                        disabled={paletteIsFull}
                        className={classes.addColor}
                    >
                        {paletteIsFull ? "Palette Full" : "Add Color"}
                    </Button>
                </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles)(ColorPickerForm);