import axios from 'axios'

export default axios.get({
    baseUrl: 'https://lagalt-server.herokuapp.com/api/v1/projects'
});