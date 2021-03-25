import React, { Component } from 'react'
import axios from 'axios'

class CreateProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
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
        console.log(this.state)
        axios.post("https://lagalt-server.herokuapp.com/api/v1/projects", this.state)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const { id, title, industry, description, gitlink } = this.state
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                <label>ID:
                    <input
                    name="id"
                    type="text"
                    value={id}
                    onChange={this.changeHandler}
                    />
                </label>
                <label>Title:
                    <input
                    name="title"
                    type="text"
                    value={title}
                    onChange={this.changeHandler}
                    />
                </label>
                <label>Industry:
                    <input
                    name="industry"
                    type="text"
                    value={industry}
                    onChange={this.changeHandler}
                    />
                </label>
                <label>Description:
                    <textarea
                    name="description"
                    type="text"
                    value={description}
                    onChange={this.changeHandler}
                    />
                </label>
                <label>Gitlink:
                    <input
                    name="gitlink"
                    type="text"
                    value={gitlink}
                    onChange={this.changeHandler}
                    />
                </label>
                <button type="submit">Create</button>
                </form>
            </div>
        )
    }
}

export default CreateProject;