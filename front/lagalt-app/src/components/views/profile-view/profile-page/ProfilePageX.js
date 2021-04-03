import ProfileJumbotronX from './profile-jumbotron/ProfileJumbotronX'
import React from 'react'

function ProfilePageX(props) {

    return(
        <div>
            <ProfileJumbotronX
                dbuser={props.dbuser}
                user={props.user}
            />
        </div>
    )
}

export default ProfilePageX