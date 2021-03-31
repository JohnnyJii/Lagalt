import React, { useState,  } from 'react'
import axios from 'axios'
import '../search/SearchBar.css'
import JSONDATA from '../../../api/JSON.json'



function SearchBar () {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="searchBar">
            <input 
                type="text"
                placeholder="text here"
                onChange={event => {setSearchTerm(event.target.value)}}
            />
            { JSONDATA.filter((val) => {
                if (searchTerm === "") {
                    return val
                } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                }
            }).map((val,  key) => {
                return <div className="search-title" key={key}>
                            <p> { val.title } </p>
                        </div>
            })}
        </div>
    )
};

export default SearchBar;