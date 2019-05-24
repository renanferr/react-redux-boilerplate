import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import MainRoute from '../routes';
import login from '../routes/login'
import error from '../routes/error'
import changePassword from '../routes/changePassword'
const InitialPath = ({ component: Component, accessToken, ...props }) => (
  <Route {...props} render={props => accessToken ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />} />
);

class App extends Component {
  render() {
    const { location, match, accessToken } = this.props;
    if (location.pathname === '/' || location.pathname === '/app' || location.pathname === '/app/') {
      return (<Redirect to='/app/dashboard' />);
    }

    return (
      <Fragment>
        <Switch>
          <InitialPath path={`${match.url}app`} accessToken={accessToken} component={MainRoute} />
          <Route path={`/login`} component={login} />
          <Route path={`/changePassword`} component={changePassword} />
          <Route path={`/error`} component={error} />
          <Redirect to="/error" />
        </Switch>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { accessToken } = auth;
  return { accessToken };
};

export default connect(mapStateToProps, {})(App);