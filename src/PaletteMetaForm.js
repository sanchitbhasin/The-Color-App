import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

class PaletteMetaForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            stage: 'form',
            newPaletteName: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.showEmojiPicker = this.showEmojiPicker.bind(this);
        this.savePalette = this.savePalette.bind(this);
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

    showEmojiPicker() {
        this.setState({stage: "emoji"});
    }

    savePalette(emoji) {
        const newPalette = {
            name: this.state.newPaletteName,
            emoji: emoji.native
        };
        this.props.handleSubmit(newPalette);
    }

    render() {
        let { newPaletteName, stage } = this.state;
        let { hideForm } = this.props;
        
        return (
            <div>
                <Dialog open={stage==="emoji"} onClose={hideForm}>
                <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
                    <Picker title='Choose a Palette Emoji' onSelect={this.savePalette} />
                </Dialog>
                <Dialog 
                    open={stage==="form"}
                    onClose={hideForm} 
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                    <ValidatorForm onSubmit={this.showEmojiPicker}>
                        <DialogContent>
                            <DialogContentText>
                                Please enter a name for your beautiful Palette. Make sure it`s unique.
                            </DialogContentText>

                            <TextValidator 
                                label="Palette Name"
                                value={newPaletteName}
                                name="newPaletteName"
                                fullWidth
                                margin='normal'
                                onChange={this.handleChange}
                                validators={["required", "isPaletteNameUnique"]}
                                errorMessages={["this field is required", "Name already used"]}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={hideForm} color="primary">
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
            </div>
        );
    }
}

export default PaletteMetaForm;