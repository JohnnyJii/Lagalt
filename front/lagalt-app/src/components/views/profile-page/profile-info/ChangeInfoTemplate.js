import React, { Component } from 'react'
import axios from 'axios'
import { Form, Button, Row, Col } from 'react-bootstrap'

class ChangeInfoTemplate extends Component {
    constructor(props) {
        super(props)
        this.dbUser = this.props.dbUser
        this.state = {
            id: this.dbUser.id,
            googleid: this.dbUser.googleid,
            username: this.dbUser.username,
            firstName: this.dbUser.firstName,
            lastName: this.dbUser.lastName,
            imageSource: this.dbUser.imageSource,
            skills: this.dbUser.skills,
            description: this.dbUser.description,
            email: this.dbUser.email
        }
    }
    
    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
        console.log('this.dbUser',this.dbUser.id)
        console.log('this.state',this.state)
    }

    submitHandler = e => {
        e.preventDefault()
        const form = this.state
        console.log(form)
        axios.put(`https://lagalt-server.herokuapp.com/api/v1/users/${this.dbUser.id}`, form)
            .then(response => {
                console.log(response)
                alert("Updated your profile!")
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const { username, email, firstName, lastName, description } = this.state
        return (
            <div>
                <Form onSubmit={this.submitHandler}>
                    <Row>
                        <Col>
                            <Form.Control name="username" placeholder="Username" value={username} onChange={this.changeHandler}/>
                        </Col>
                        <Col>
                            <Form.Control name="email" placeholder="Email" value={email} onChange={this.changeHandler}/>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <Form.Control name="firstName" placeholder="First Name" value={firstName} onChange={this.changeHandler}/>
                        </Col>
                        <Col>
                            <Form.Control name="lastName" placeholder="Last Name" value={lastName} onChange={this.changeHandler}/>
                        </Col>
                    </Row>
                    <br />
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>About You</Form.Label>
                    <Form.Control name="description" as="textarea" rows={3} value={description} onChange={this.changeHandler}/>
                </Form.Group>

                    <Form.Label>Industry</Form.Label>
                    {['radio'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3" onChange={this.changeHandler}>
                            <Form.Check
                            inline name="industry"
                            label="Programming"
                            type={type}
                            value={"programming"} 
                            id={`inline-${type}-1`} />
                            <Form.Check 
                            inline name="industry" 
                            label="Movies and Art" 
                            type={type} 
                            value={"movies and art"} 
                            id={`inline-${type}-2`} />
                            <Form.Check 
                            inline name="industry" 
                            label="Music" 
                            type={type} 
                            value={"music"} 
                            id={`inline-${type}-3`} />
                            <Form.Check 
                            inline name="industry" 
                            label="Other" 
                            type={type}
                            value={"other"} 
                            id={`inline-${type}-4`} />
                        </div>
                    ))}
                    <br/>
                <Button variant="primary" type="submit">Create</Button>
                </Form>
            </div>
        )
    }
}

export default ChangeInfoTemplate;