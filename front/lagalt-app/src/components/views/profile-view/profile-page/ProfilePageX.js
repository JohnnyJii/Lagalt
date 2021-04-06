import ProfileJumbotronX from './profile-jumbotron/ProfileJumbotronX'
import React from 'react'

function ProfilePageX(props) {
    return(
        <div>
            <ProfileJumbotronX
                setUserName={props.setUserName}
                dbuser={props.dbuser}
                user={props.user}
                setload={props.setload}
            />
        </div>
    )
}

export default ProfilePageX