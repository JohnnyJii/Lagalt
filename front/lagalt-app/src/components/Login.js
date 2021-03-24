import React from "react"
import { Link } from 'react-router-dom'
import { Card, Form, Input, Button } from '../components/AuthForm'



function Login() {

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

        </Card>
    </div>
  );
}

export default Login;