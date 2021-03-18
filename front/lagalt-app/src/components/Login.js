import React from "react"
import { Link } from 'react-router-dom'
import { Card, Logo, Form, Input, Button } from '../components/AuthForm'
import FacebookLogin from 'react-facebook-login'
import Facebook from '../loginbuttons/Facebook'
import GoogleLogin from "../loginbuttons/Google"


function Login() {
  const responseFacebook = (response) => {
    console.log(response);
  }

  return (
      <div>
        <Card>
            <Form>
                <Input type="email" placeholder="email" />
                <Input type="password" placeholder="password" />
                <Button>Sign In</Button>
            </Form>
            <Link to="/signup">Don't have an account?</Link>
        </Card>
        <Card>
          <Facebook onClick={() => alert("test")} />
          <GoogleLogin onClick={() => alert("testgoogle")} />
        </Card>
    </div>
  );
}

export default Login;