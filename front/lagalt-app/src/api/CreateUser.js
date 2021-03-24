import React, { Component } from 'react'
import Axios from 'axios'

class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            username: '',
            firstname: '',
            lastname: '',
            projects: [],
            imagesource: '',
            skills: '',
            description: '',
            email: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handSubmit = this.handSubmit.bind(this);
    }

    handSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        Axios.post("https://lagalt-server.herokuapp.com/api/v1/users", this.state).then(alert(JSON.stringify(this.state) + "was created")
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
                    Email:
                    <input
                    name="email"
                    type="text"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    />
                </label>
                <br></br>
                <label>
                    Brukernavn:
                    <input
                    name="username"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    />
                </label>
                <br></br>
                <label>
                    Rolle:
                    <input
                    name="role"
                    type="text"
                    value={this.state.role}
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

export default CreateUser