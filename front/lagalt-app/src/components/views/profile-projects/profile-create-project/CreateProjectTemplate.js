import React, { Component } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'


class CreateProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            industry: '',
            description: '',
            gitlink: ''
        }
    }
    
    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault()
        axios.post("https://lagalt-server.herokuapp.com/api/v1/projects", this.state)
            .then(response => {
                console.log(response)
                alert("Created a new project successfully!")
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const { title, industry, description, gitlink } = this.state
        return (
            <div>
                <Form onSubmit={this.submitHandler}>
                    <Form.Label>Project Title</Form.Label>
                    <Form.Control name="title" type="text" placeholder="Project title" value={title} onChange={this.changeHandler} />
                    <br/>
                    <Form.Label>Industry</Form.Label>
                    <Form.Control name="industry" type="text" placeholder="Project industry" value={industry} onChange={this.changeHandler} />
                    <br/>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Project Description</Form.Label>
                    <Form.Control name="description" as="textarea" rows={3} value={description} onChange={this.changeHandler}/>
                </Form.Group>
                    <Form.Label>Git Link</Form.Label>
                    <Form.Control name="gitlink" type="text" placeholder="Github repo link" value={gitlink} onChange={this.changeHandler} />
                    <br/>
                <Button variant="primary" type="submit">Create</Button>
            </Form>
            </div>
        )
    }
}

export default CreateProject;