import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '../components/Snackbar';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';


import { loginUser, recoverPassword } from "../redux/actions";

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  linkText: {
    fontSize: 16,
    paddingBottom: 10,
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },
  icon: {
    fontSize: 18
  }
});

class Login extends Component {
  state = {
    email: '',
    password: '',
    remember: true,
    title: 'Login',
    recoveringPassword: false,
    snackbarMessage: '',
    snackbarOpen: false,
    snackbarVariant: '',
  };

  showSnackbar(variant, message) {
    return this.setState({
      snackbarOpen: true,
      snackbarMessage: message,
      snackbarVariant: variant
    })
  }

  componentWillReceiveProps(nextProps, nextState) {
    console.log(nextProps)
    if (!nextProps.auth.loading) {
      if (nextProps.auth.error) {
        this.showSnackbar('error', nextProps.auth.errorMessage)
      } else {
        this.showSnackbar('success', `Um email foi enviado para ${this.state.email} com as instruções para redefinição de senha`)
      }
    }
  }

  handleChange = event => {
    const { name, value, checked } = event.target;
    this.setState({
      [name]: value === undefined ? checked : value
    });
  };

  handleLogin = event => {
    event.preventDefault();
    const { email, password, remember } = this.state;
    const { loginUser, history } = this.props;
    loginUser({ email, password, remember }, history)
  };

  handleRecoverPassword = event => {
    event.preventDefault()
    const { email } = this.state
    const { recoverPassword, history } = this.props
    console.log({ email })
    recoverPassword(email, history)
  }

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackbarOpen: false });
  };

  passwordRecoveryForm = () => {
    const { auth, classes } = this.props;
    const { email } = this.state;
    const { loading } = auth;

    return (
      <form className={classes.form} onSubmit={this.handleRecoverPassword}>
        <Typography>Enviaremos um e-mail com um link para redefinição de senha</Typography>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">E-mail</InputLabel>
          <Input id="email" name="email" onChange={this.handleChange} value={email} autoComplete="email" autoFocus />
        </FormControl>
        <Typography onClick={() => this.setState({ recoveringPassword: false, title: "Login" })} className={classes.linkText}>
          <ArrowBackIos className={classes.icon} />
          Voltar
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={loading}
        >
          Enviar E-mail
        </Button>
      </form >
    )
  }

  loginForm = () => {
    const { auth, classes } = this.props;
    const { email, password, remember } = this.state;
    const { loading } = auth;
    return (
      <form className={classes.form} onSubmit={this.handleLogin}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">E-mail</InputLabel>
          <Input id="email" name="email" onChange={this.handleChange} value={email} autoComplete="email" autoFocus />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Senha</InputLabel>
          <Input name="password" type="password" id="password" onChange={this.handleChange} value={password} autoComplete="current-password" />
        </FormControl>
        <FormControlLabel
          control={<Checkbox name="remember" checked={remember} onChange={this.handleChange} />}
          label="Remember me"
        />
        <Typography onClick={() => this.setState({ recoveringPassword: true, title: "Recuperação de Senha" })} className={classes.linkText}>
          Esqueceu sua senha?
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={loading}
        >
          Entrar
    </Button>
      </form>
    )
  }

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {this.state.title}
          </Typography>
          {this.state.recoveringPassword ? this.passwordRecoveryForm() : this.loginForm()}
          <Snackbar
            open={this.state.snackbarOpen}
            message={this.state.snackbarMessage}
            variant={this.state.snackbarVariant}
            onClose={this.handleSnackbarClose}
            autoHideDuration={3000}
          />
        </Paper>
      </main>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  recoverPassword: PropTypes.func.isRequired,
  history: PropTypes.object,
};

const mapStateToProps = ({ auth }) => {
  return { auth };
}
export default withStyles(styles)(connect(mapStateToProps, { loginUser, recoverPassword })(Login));