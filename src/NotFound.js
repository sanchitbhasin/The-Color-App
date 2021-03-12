import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import styles from './styles/NotFoundStyles';
import Scarecrow from './Scarecrow.png';

function NotFound(props) {
    let { classes } = props;
    return (
        <div className={classes.body}>
            <h5 className={classes.heading}>404 Not Found</h5>
            <div className={classes.container}>
                <div className={classes.subCont}>
                    <img className={classes.img} src={Scarecrow} alt="Scarecrow" />
                </div>
                <div className={classes.subCont}>
                    <div>
                        <h1 className={classes.h1}>
                            I have bad news for you
                        </h1>
                        <div className={classes.text}>
                            The page you are looking for might be removed or is temporarily unavailable.
                        </div>
                    </div>
                    <div>
                        <Link to='/' className={classes.btn}>BACK TO HOMEPAGE</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withStyles(styles)(NotFound);