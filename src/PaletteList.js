import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteListStyles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';

class PaletteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteDialogeOpen: false,
            deletingId: ""
        }
        this.openDialoge = this.openDialoge.bind(this);
        this.closeDialoge = this.closeDialoge.bind(this);
        this.goToPalette = this.goToPalette.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    openDialoge(id) {
        this.setState({ deleteDialogeOpen: true, deletingId: id });
    }

    closeDialoge() {
        this.setState({ deleteDialogeOpen: false });
    }

    goToPalette(id) {
        this.props.history.push(`/palette/${id}`);
    }

    handleDelete() {
        this.props.deletePalette(this.state.deletingId);
        this.closeDialoge();
    }

    render() {
        const { palettes, classes } = this.props;
        const { deleteDialogeOpen } = this.state;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Colors</h1>
                        <Link to="/palette/new">Create Palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map(palette => (
                            <CSSTransition classNames='fade' timeout={500} key={palette.id}>
                                <MiniPalette 
                                    key={palette.id}
                                    {...palette} 
                                    goToPalette={this.goToPalette}
                                    openDialoge={this.openDialoge}
                                    id={palette.id}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
                <Dialog open={deleteDialogeOpen} onClose={this.closeDialoge}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <List>
                        <ListItem button onClick={this.handleDelete}>
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor: blue[100], color: blue[600]}}>
                                    <CheckIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText>Delete</ListItemText>
                        </ListItem>
                        <ListItem button onClick={this.closeDialoge}>
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor: red[100], color: red[600]}}>
                                    <CloseIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText>Cancel</ListItemText>
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(PaletteList);