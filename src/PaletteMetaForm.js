import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


class PaletteMetaForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: true,
            newPaletteName: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule("isPaletteNameUnique", value => 
            this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    render() {
        let { newPaletteName } = this.state;
        const { open } = this.state;
        return (
            <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                <ValidatorForm 
                    onSubmit={() => this.props.handleSubmit(newPaletteName)}
                >
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your beautiful Palette. Make sure it`s unique.
                        </DialogContentText>
                        <TextValidator 
                            label="Palette Name"
                            value={this.state.newPaletteName}
                            name="newPaletteName"
                            fullWidth
                            margin='normal'
                            onChange={this.handleChange}
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["this field is required", "Name already used"]}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button 
                            variant="contained" 
                            color="primary"
                            type="submit"
                        >
                            Save Palette
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        );
    }
}

export default PaletteMetaForm;