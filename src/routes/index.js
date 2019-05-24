import React, { Component, Fragment } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { checkSession, logoutUser } from "../redux/actions";

import AppBar from '../components/AppBar';

import Dashboard from './dashboard';
import { connect } from 'react-redux';

class MainApp extends Component {
  constructor(props){
    super(props);
    props.checkSession(props.auth.accessToken, props.history);
  }

  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  }

	render() {
    const { match, auth } = this.props;
    const { currentUser } = auth;

    return (
      <Fragment>
        <AppBar currentUser={currentUser} onLogoutUser={this.handleLogout} />
        
        <Switch>
          <Route path={`${match.url}/dashboard`} component={Dashboard} />
        </Switch>
      </Fragment>
    );
	}
}

MainApp.propTypes = {
  auth: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth }) => {
  return { auth };
}
export default withRouter(connect(mapStateToProps, { checkSession, logoutUser })(MainApp));