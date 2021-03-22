import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'

export default class LoginFacebook extends Component {
    state = {
        isLoggedIn: false,
        userId: '',
        name: '',
        email: '',
        picture: ''
    }

    responseFacebook = response => {
        this.setState({
            isLoggedIn: true,
            userId: response.userId,
            name: response.name,
            email: response.email,
            picture: response.picture.data.url
        });
        console.log(response);
    }

    componentClicked = () => console.log("test");

    render() {
        let fbContent;

        if (this.state.isLoggedIn) {
            fbContent = (
                <div style={{width: '300px', margin: 'auto', background: '#f4f4f4', padding: '20px'}}>
                    <img src={this.state.picture} alt={this.state.name} />
                    <h3>Welcome {this.state.name}</h3>
                    email: {this.state.email}
                </div>
            )
        } else {
            fbContent = (
                <FacebookLogin
                    appId="274965364077941"
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook}
                />
            )
        }
        return (
            <div>
                {fbContent}
            </div>
        )
    }
}
