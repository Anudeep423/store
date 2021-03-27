import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {signIn} from "./helper/auth"
import {Redirect} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signin({history}) {
  const classes = useStyles();
  const [values,setValues] = useState({ email : "" , password : "" , error : "", user : "" , role : 5 , success : false })

  const {email,password,error,success,role,user} = values;

  const handleChange = (e) => {
      setValues({...values,[e.target.name] :  e.target.value  })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(values).then(res =>  {  
      if(res.error){
      setValues({...values, error : res.error })
      }else{
        console.log("GEtting USer",res)
        localStorage.setItem("JWT", JSON.stringify(res))
        setValues( { email : "" , password : "" , error : "", user : res.user , role : res.role , success : false  } )
        console.log(res);
        setValues({email : "" , password : "" , error : "",res : res.role , success : true})
      }
    } ).catch(err => {console.log(err)})
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value = {email}
            onChange = {handleChange}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            onChange = {handleChange}
            value = {password}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
              
            </Grid>
          </Grid>
        </form>
        { JSON.stringify(values) }
        {error ?  <h4 style = {{color : "red"}}  > {error} </h4> : "" }
        {role === 0 ? history.push("/customer" , user ) : "" }
        {role === 1 ? <Redirect to =  "/seller"  />  : ""  }

      </div>
     
    </Container>
  );
}