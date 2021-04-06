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
            portfolio: '',
            imageSource: '',
            redirect: false
        }
    }
    
    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault()
        const form = this.state
        console.log(form)
        axios.post(`https://lagalt-server.herokuapp.com/api/v1/users`, form)
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
        const { username, eMail, firstname, lastname, description, portfolio, imageSource } = this.state
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
                            <Form.Label style={{color: "white"}}>About You</Form.Label>
                            <Form.Control name="description" placeholder="About you" as="textarea" rows={3} value={description} onChange={this.changeHandler}/>
                            <Form.Control name="portfolio" placeholder="Previous projects, portfolio by own text" as="textarea" rows={3} value={portfolio} onChange={this.changeHandler}/>
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