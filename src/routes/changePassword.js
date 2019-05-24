
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '../components/Snackbar';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { parse } from 'querystring'
import { changePassword } from "../redux/actions";

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
  },
  title: {
    flex: 1,
  },
  titleRow: {
    paddingTop: theme.spacing.unit * 9,
    paddingBottom: theme.spacing.unit * 2,
    display: 'flex',
    alignItems: 'center'
  },
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

class ChangePassword extends Component {

  constructor(props) {
    super(props)

    let query = this.props.location.search
    if (this.props.location.search.startsWith("?")) {
      query = this.props.location.search.slice(1, this.props.location.search.length)
    }

    const { token } = parse(query)
    console.log(token)
    this.state = {
      password: '',
      passwordConfirmation: '',
      snackbarMessage: '',
      snackbarOpen: false,
      snackbarVariant: '',
      token
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (!nextProps.auth.loading) {
      if (nextProps.auth.error) {
        this.showSnackbar('error', nextProps.auth.errorMessage)
      } else {
        this.showSnackbar('success', `Senha alterada com sucesso! Aguarde enquanto você é redirecionado para a tela de login...`)
        setTimeout(() => this.props.history.push('/login'), 2000)
        
      }
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault()
    const { password, passwordConfirmation, token } = this.state
    const { changePassword } = this.props
    if (password != passwordConfirmation) {
      return this.showSnackbar('error', "Os campos de senha e confirmação de senha não conferem.")
    }
    changePassword(password, token)
  }

  showSnackbar(variant, message) {
    console.log({variant, message})
    return this.setState({
      snackbarOpen: true,
      snackbarMessage: message,
      snackbarVariant: variant
    })
  }

  handleSnackbarClose = () => this.setState({ snackbarOpen: false })

  render() {
    const { classes, auth } = this.props;
    const { loading } = auth

    const { password, passwordConfirmation } = this.state
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Redefinição de Senha
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Nova senha</InputLabel>
              <Input id="password" name="password" onChange={this.handleChange} value={password} autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="passwordConfirmation">Confirmação de senha</InputLabel>
              <Input name="passwordConfirmation" type="passwordConfirmation" id="passwordConfirmation" onChange={this.handleChange} value={passwordConfirmation} />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
            >
              Enviar
            </Button>
          </form>
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

ChangePassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth }) => {
  return { auth };
}
export default withStyles(styles)(connect(mapStateToProps, { changePassword })(ChangePassword));