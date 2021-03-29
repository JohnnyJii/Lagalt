import React from 'react'
import './Search.css'
import axios from 'axios'
import Loader from '../../../assets/loader.gif'

class Search extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			query: '',
            results: {},
            loading: false,
            message: '',
		};
        this.cancel = '';
	}

    fetchSearchResults = (updatedPageNo = '', query ) => {
        const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : '';
        const searchUrl = `https://pixabay.com/api/?key=12413278-79b713c7e196c7a3defb5330e&q=${query}${pageNumber}`;

        if (this.cancel) {
            this.cancel.cancel();
        } 
        this.cancel = axios.CancelToken.source();
            axios.get(searchUrl, {cancelToken: this.cancel.token, })
            .then((res) => { const resultNotFoundMSG = !res.data.hits.length ? 'there are no more resultus, try again...' : '';
            this.setState({
                results: res.data.hits,
                message: resultNotFoundMSG,
                loading: false,
            });
        })
        .catch((error) => {
            if (axios.isCancel(error) || error) {
                this.setState({
                    loading: false,
                    message: 'failed to fetch results. Check connection.'
                });
            }
        });
    };

    handleOnInputChange = (event) => {
        const query = event.target.value;
        console.warn(query)
        if ( ! query ) {
		this.setState({ query, results: [], message: '' } );
	} else {
		this.setState({ query, loading: true, message: '' }, () => {
			this.fetchSearchResults(1, query);
		});
	}
};


renderSearchResults = () => {
	const {results} = this.state;
	if (Object.keys(results).length && results.length) {
		return (
			<div className="results-container">
				{results.map((result) => {
					return (
						<a key={result.id} href={result.previewURL} className="result-items">
							<h6 className="image-username">{result.user}</h6>
							<div className="image-wrapper">
								<img className="image" src={result.previewURL} alt={result.user}/>
							</div>
						</a>
					);
				})}
			</div>
		);
	}
}; 

	render() {
        const { query, loading} = this.state;
        console.warn(this.state);
		return (
			<div className="container">
				<label 
                    className="search-label" 
                    htmlFor="search-input">
					<input
						type="text"
						value={query}
                        name="query"
						id="search-input"
						placeholder="Search for project"
                        onChange={this.handleOnInputChange}
					/>
					<i className="fa fa-search search-icon" aria-hidden="true" />
				</label>
               {/* <img  src={Loader} className={`search-loading ${loading ? 'show' : 'hide' }`}  alt="loader"/> */}
				{this.renderSearchResults() }
			</div>
			)
	}
}
export default Search;