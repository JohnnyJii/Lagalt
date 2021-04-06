import React, { Component } from 'react'
import axios from 'axios'
import { Form, Button, Row, Col } from 'react-bootstrap'

class ChangeInfoTemplateX extends Component {
    constructor(props) {
        super(props)
        this.dbuser = this.props.dbuser
        this.state = {
            id: this.dbuser.id,
            googleid: this.dbuser.googleid,
            username: this.dbuser.username,
            firstname: this.dbuser.firstname,
            lastname: this.dbuser.lastname,
            eMail: this.dbuser.eMail,
            imageSource: this.dbuser.imageSource,
            skills: this.dbuser.skills,
            description: this.dbuser.description,
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
        axios.put(`https://lagalt-server.herokuapp.com/api/v1/users/${this.dbuser.id}`, form, config)
            .then(response => {
                console.log(response)
                alert("Updated your profile!")
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const { username, eMail, firstname, lastname, description, imageSource } = this.state
        return (
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
        )
    }
}

export default ChangeInfoTemplateX;