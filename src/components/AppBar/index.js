import React, { Component, Fragment } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  title: {

  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  link: {
    textDecoration: 'none',
    color: 'black',
    '&:visited': {
      color: 'black'
    }
  }
});

class AppBarComponent extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    isDrawerOpen: false
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleLogout = () => {
    this.props.onLogoutUser();
    this.handleMenuClose();
  }

  handleDrawerToggle = () => this.setState({ isDrawerOpen: !this.state.isDrawerOpen })
  handleDrawerClose = () => this.setState({ isDrawerOpen: false })

  render() {
    const { currentUser } = this.props;

    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Minha conta</MenuItem>
        <MenuItem onClick={this.handleLogout}>Sair</MenuItem>
      </Menu>
    );

    const renderDrawer = (
      <Drawer 
        open={this.state.isDrawerOpen}
        ModalProps={{ onBackdropClick: this.handleDrawerClose, onEscapeKeyDown: this.handleDrawerClose }}
        width={800}
        >
        <MenuItem><Link className={classes.link} to="/app/dashboard">Dashboard</Link></MenuItem>
      </Drawer>
    )

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <Fragment>
        <AppBar
          position="static"
        >
          <Toolbar>
            <IconButton onClick={this.handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              React App
            </Typography>
            <div className={classes.grow} />
            {!!currentUser && (
              <Fragment>
                <div className={classes.sectionDesktop}>
                  <IconButton color="inherit">
                    <Badge badgeContent={17} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </div>
                <div className={classes.sectionMobile}>
                  <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                    <MoreIcon />
                  </IconButton>
                </div>
              </Fragment>
            )}
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
        {renderDrawer}
      </Fragment>
    );
  }
}

export default withStyles(styles)(AppBarComponent)