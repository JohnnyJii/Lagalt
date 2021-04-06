import React, { Component } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'

class CreateProjectTemplateX extends Component {
    constructor(props) {
        super(props)
        this.setPosts = this.props.setposts
        this.setLoad = this.props.setload
        this.dbuserid = props.dbuser
        this.state = {
            id: 0,
            title: '',
            industry: '',
            description: '',
            progress: '',
            skills: [],
            tags: [],
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
        let config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
          }
        const form = this.state
        axios.post("https://lagalt-server.herokuapp.com/api/v1/projects", form, config)
            .then(response => {
                this.setPosts(response.data)
                this.setLoad(true)
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
                                label="Game Development"
                                type={type}
                                value={"Game Development"} 
                                id={`inline-${type}-1`}
                            />

                            <Form.Check 
                                inline name="industry" 
                                label="Film" 
                                type={type} 
                                value={"Film"} 
                                id={`inline-${type}-2`}
                            />

                            <Form.Check 
                                inline name="industry" 
                                label="Music" 
                                type={type} 
                                value={"Music"} 
                                id={`inline-${type}-3`}
                            />

                            <Form.Check 
                                inline name="industry" 
                                label="Web Development" 
                                type={type}
                                value={"Web Development"} 
                                id={`inline-${type}-4`}
                            />
                        </div>
                    ))}
                    <Form.Label>Progress</Form.Label>
                    {['radio'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3" onChange={this.changeHandler}>

                            <Form.Check
                                inline name="progress"
                                label="Founding"
                                type={type}
                                value={"Founding"} 
                                id={`inline-${type}-5`}
                            />

                            <Form.Check 
                                inline name="progress" 
                                label="In Progress" 
                                type={type} 
                                value={"In Progress"} 
                                id={`inline-${type}-6`}
                            />

                            <Form.Check 
                                inline name="progress" 
                                label="Stalled" 
                                type={type} 
                                value={"Stalled"} 
                                id={`inline-${type}-7`}
                            />

                            <Form.Check 
                                inline name="progress" 
                                label="Completed" 
                                type={type}
                                value={"Completed"} 
                                id={`inline-${type}-8`}
                            />
                            
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

export default CreateProjectTemplateX;