import React, { Component } from 'react'
import axios from 'axios'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';

class CreateUserX extends Component {
    constructor(props) {
        super(props)
        this.user = this.props.user.uid
        this.setRedirect = this.props.setRedirect
        this.setDbUser = this.props.setDbUser
        this.state = {
            id: 0,
            googleid: this.user,
            username: '',
            firstname: '',
            lastname: '',
            eMail: '',
            description: '',
            imageSource: '',
            redirect: false
        }
    }
    
    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault()
        let config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
          }
        const form = this.state
        axios.post(`https://lagalt-server.herokuapp.com/api/v1/users`, form, config)
            .then(response => {
                this.setDbUser(response.data)
                this.setState({redirect: true})
                this.setRedirect(false)
            }
            )
            .catch(error => {
                console.log(error)
            })
    }

    render () {
        const { username, eMail, firstname, lastname, description, imageSource } = this.state
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/profile' />;
        } else {
            return(
                <div>
                    <Form onSubmit={this.submitHandler}>
                        <Row>
                            <Col>
                                <Form.Control name="username" placeholder="Username" value={username} onChange={this.changeHandler}/>
                            </Col>
                            <Col>
                                <Form.Control name="eMail" placeholder="Email" value={eMail} onChange={this.changeHandler}/>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col>
                                <Form.Control name="firstname" placeholder="First Name" value={firstname} onChange={this.changeHandler}/>
                            </Col>
                            <Col>
                                <Form.Control name="lastname" placeholder="Last Name" value={lastname} onChange={this.changeHandler}/>
                            </Col>
                        </Row>
                        <br />
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>About You</Form.Label>
                            <Form.Control name="description" as="textarea" rows={3} value={description} onChange={this.changeHandler}/>
                            <Form.Control name="imageSource" placeholder="Link to your image (ie. LinkedIn)" value={imageSource} onChange={this.changeHandler}/>
                        </Form.Group>
                        <br/>
                        <Button variant="primary" type="submit">Update</Button>
                    </Form>
                </div>
             );
        }
    }
}

export default CreateUserX;