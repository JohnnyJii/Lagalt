import React, { Component } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'

class CreateProject extends Component {
    constructor(props) {
        super(props)
        this.dbuserid = props.dbUser
        this.state = {
            title: '',
            industry: '',
            description: '',
            gitlink: '',
            user: {
                id: this.dbuserid
            }
        }
    }
    
    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault()
        const form = this.state
        axios.post("https://lagalt-server.herokuapp.com/api/v1/projects", form)
            .then(response => {
                console.log(response)
                alert("Created a new project successfully!")
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const { title, description, gitlink } = this.state
        return (
            <div>
                <Form onSubmit={this.submitHandler}>
                    <Form.Label>Project Title</Form.Label>
                    <Form.Control name="title" type="text" placeholder="Project title" value={title} onChange={this.changeHandler} />
                    <br/>
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