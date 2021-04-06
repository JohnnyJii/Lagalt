import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchBar.css';
import ProfileProjectsGridItemX from '../../profile-view/my-projects/my-projects-list/list-item/ProfileProjectsGridItemX';

function SearchBar () {
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`https://lagalt-server.herokuapp.com/api/v1/projects`)
        .then(response => {
            setData([...response.data]);
        })
        .catch(error => {
            console.log(error);
        });
       }, []);

    return (
        <div className="searchBar">
            <input
                type="text"
                placeholder="Search for projects"
                onChange={event => {setSearchTerm(event.target.value);}}
            />
            { data.filter((val) => {
                if (searchTerm === "") {
                    return val;
                } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val;
                } else {
                    return null;
                }
            }).map((val,  key) => {
                return(
                <div className="container" key={key}>
                    <ProfileProjectsGridItemX
                        key={val.id}
                        id={val.id}
                        industry={val.industry}
                        progress={val.progress}
                        title={val.title}
                        description={val.description}
                        gitlink={val.gitlink}
                        creator={val.user}
                    />
                </div>
                );
            })}
        </div>
    );
};

export default SearchBar;