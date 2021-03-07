import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

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
        let { paletteIsFull } = this.props;
        let { currColor, newColorName } = this.state;

        return (
            <div>
                <ChromePicker 
                    color={currColor}
                    onChange={this.handleColorChange}
                    // onChangeComplete={(color)=>console.log(color)}
                />
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <TextValidator 
                    value={newColorName}
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
                    style={{backgroundColor: 
                        paletteIsFull ? "grey" : currColor
                    }}
                    type="submit"
                    disabled={paletteIsFull}
                    >
                    {paletteIsFull ? "Palette Full" : "Add Color"}
                    </Button>
                </ValidatorForm>
            </div>
        )
    }
}

export default ColorPickerForm;