import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing.unit*3,
    paddingRight: theme.spacing.unit*3,
  },
  title: {
    flex: 1,
  },
  titleRow: {
    paddingTop: theme.spacing.unit*9,
    paddingBottom: theme.spacing.unit*2,
    display: 'flex',
    alignItems: 'center'
  },
});

class Dashboard extends Component {
  state = {
    productEdit: false,
    categoryEdit: false,
    plantEdit: false
  };

  handleChange = event=>{
    const { checked, name } = event.target;
    this.setState({ [name]: checked });
  }; 

  render() {
    const { classes } = this.props;
    const { productEdit, categoryEdit, plantEdit } = this.state;

    return (
      <div className={classes.root}>

        <Typography component="h1" className={classes.title}>Dashboard</Typography>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);