import ProfileProjectsGridX from './ProfileProjectsGridX'
import CreateProjectX from './CreateProjectX';
import { Button } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function ProfileProjectsX(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const dbuserid = props.dbuser.id
    const [posts, setPosts] = useState({});
    const [load, setLoad] = useState(false)

    useEffect(() => {
        async function fetchUserProjects() {
            try {
                const userResponse = await axios(`https://lagalt-server.herokuapp.com/api/v1/users/${dbuserid}/projects`);
                setPosts(userResponse.data);
            } catch (error)  {
                console.log(error)
            }
        }
        if (dbuserid) {
            fetchUserProjects();
            setLoad(false)
        }
    }, [dbuserid, load]);

    return (
        <div>
            <div style={{textAlign: "center"}}>
                <CreateProjectX
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    dbuser={props.dbuser.id}
                    setload={setLoad}
                    posts={posts}
                    setposts={setPosts} />
                <Button
                    variant="primary"
                    onClick={() => setModalShow(true)}>
                    Create Project
                </Button>
            </div>
                <ProfileProjectsGridX
                    posts={posts} />
        </div>
    )
}

export default ProfileProjectsX