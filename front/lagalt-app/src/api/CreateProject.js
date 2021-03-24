import React, { Component } from 'react'
import Axios from 'axios'

class CreateProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            industry: '',
            description: '',
            skills: '',
            user: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        Axios.post("https://lagalt-server.herokuapp.com/api/v1/projects", this.state).then(
            alert(JSON.stringify(this.state) + "was created")
        );
    }

    handleInputChange(event) {
        const target = event.target;
        const value = event.value;
        const name = event.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} style={{ color: "white" }}>
                <label>
                    Navn:
                    <input
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    />
                </label>
                <br></br>
                <label>
                    EierID:
                    <input
                    name="ownerId"
                    type="text"
                    value={this.state.ownerID}
                    onChange={this.handleInputChange}
                    />
                </label>
                <br></br>
                <label>
                    Status:
                    <input
                    name="status"
                    value={this.state.status}
                    onChange={this.handleInputChange}
                    />
                </label>
                <br></br>
                <label>
                    Beskrivelse:
                    <textarea
                    name="description"
                    type="text"
                    value={this.state.description}
                    onChange={this.handleInputChange}
                    />
                </label>
                <br></br>
                <input type="submit" value="Send" />
                </form>
            </div>
        )
    }
}

export default CreateProject;