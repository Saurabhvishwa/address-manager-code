import React, { Component } from 'react';
import {Link} from 'react-router-dom';

// material-ui
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import withStyles from '@material-ui/styles/withStyles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    btnContainer:{
        margin:'0 auto',
        width:400,
        display:'flex',
        justifyContent:'space-between'
    },
})

class navigation extends Component {
    render() {
        const {classes} = this.props;
        return (
            <AppBar>
                <ToolBar>
                    <div className={classes.btnContainer}>
                        <Button variant='outlined' component={Link} to='/' color='inherit' className={classes.btn}>Add New Address</Button>
                        <Button variant='outlined' component={Link} to='/show' color='inherit'>Show Address </Button>
                    </div>
                </ToolBar>
                
            </AppBar>
        );
    }
}

export default withStyles(styles)(navigation);