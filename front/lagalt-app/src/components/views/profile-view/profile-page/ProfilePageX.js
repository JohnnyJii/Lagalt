import ProfileJumbotronX from './profile-jumbotron/ProfileJumbotronX'
import React from 'react'

function ProfilePageX(props) {
    return(
        <div>
            <ProfileJumbotronX
                setUserName={props.setUserName}
                dbuser={props.dbuser}
                user={props.user}
            />
        </div>
    )
}

export default ProfilePageX