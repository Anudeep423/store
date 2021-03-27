import React,{useState, useEffect} from 'react';
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
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import { values } from 'lodash';
import {signUp} from "./helper/auth"
const axios = require('axios')

const currencies = [
  {
    value: 0,
    label: 'Customer',
  },
    {
      value: 1,
      label: 'Seller',
    },
  ];

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            marginTop: theme.spacing(4),
            margin: theme.spacing(3, 0, 2),
          width: '100ch',
        },
      },
  paper: {
    marginTop: theme.spacing(2),
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

export default function Signup() {
  const[path,setPath] = useState("")
  const classes = useStyles();
  const [values, setvalues] = React.useState({userName : "", email : "", photo : "", role : "", password : "",
    confirmPassword : "" ,formData : ""  , Success : false });

  useEffect( () => {
    setvalues({...values, formData: new FormData() })
    console.log("qwqwdddddddddddd")
  }, [])

  const {userName , email , role , password , photo , confirmPassword ,formData , Success } = values;

  const handleChange = (event) => {
    console.log(event.target.value)
    const value = event.target.name === "photo" ? event.target.files[0] : event.target.value;
    const name = event.target.name
    formData.set( name , value);
    setvalues({ ...values, [event.target.name]: value   });
  };
  const handleSubmit = (e) =>{ 
    e.preventDefault();

    if(!userName || !email || !password ){
        alert("Enter all fields")
        return ""
    }
     if(values.password !==  values.confirmPassword  ){
         alert("password and confirm pasword did not match")  
        return ""
        } 
        signUp(formData).then( res => {   setvalues({userName : "", email : "", photo : "", role : "", password : "",
        confirmPassword : "" ,formData : ""  , Success : true })   } ).catch(err => {console.log(err)}  )
      
      }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form  onSubmit = { (e) => {handleSubmit(e)}  }  className={classes.form}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="User Name"
          name="userName"
          value = {userName}
          onChange  = {handleChange}
          autoFocus
        />
        <Typography> Profile Pic :  </Typography>
             <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            placeholder = "Upload profile pic"
            name="photo"
            type="file"
            onChange  = {handleChange}
          />
           <TextField
            variant="outlined"
            margin="normal"
            select
            required
            fullWidth
            required
            name="role"
            value = {role}
            label="Role"
            onChange = {handleChange}
          > 
          {currencies.map((option,i) => (
            <MenuItem key={i} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
           </TextField>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value = {email}
            autoComplete="email"
            onChange  = {handleChange}
            autoFocus
          />  
       
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            value = {password}
            type="password"
            onChange  = {handleChange}
            autoComplete="current-password"
          />
          
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            value = {confirmPassword}
            onChange  = {handleChange}
            type="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled = {false}
            type = "submit"
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
              <Link href="/" variant="body2">
                {"Alreay have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

    {Success ? <h3  style = { {color : "green"} } >User succesfully Registered</h3> : "" }
    </Container>
  );
}