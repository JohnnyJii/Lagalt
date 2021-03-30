import React from 'react'
import './Search.css'
import axios from 'axios'
import Loader from '../../../assets/loader.gif'
import PageNavigation from './PageNavigation'

class Search extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			query: '',
            results: {},
            loading: false,
            message: '',
			error: '',
			totalResults: 0,
			totalPages: 0,
			currentPageNo: 0,
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
            axios.get(searchUrl, {
				cancelToken: this.cancel.token 
			})
            .then((res) => { 
				const total = res.data.total;
				const totalPageCount = this.getPageCount(total, 10);
				const resultNotFoundMSG = !res.data.hits.length ? 'there are no more resultus, try again...' : '';
            this.setState({
                results: res.data.hits,
				totalResults: res.data.total,
				currentPageNo: updatedPageNo,
				totalPages: totalPageCount,
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
		this.setState({ query, results: {}, totalResults: 0, totalPages: 0, currentPageNo: 0, message: '' } );
	} else {
		this.setState({ query, loading: true, message: '' }, () => {
			this.fetchSearchResults(1, query);
		});
	}
};

	getPageCount = (total, denominator) => {
		const divisible = total % denominator === 0;
		const valueToBeAdded = divisible ? 0 : 1;
		return Math.floor(total / denominator) + valueToBeAdded;
	}

	handlePageClick = (type) => {
		Event.preventDefault();
		const updatedPageNo = 'prev' === type 
				? this.state.currentPageNo - 1
				: this.state.currentPageNo + 1;
			if (!this.state.loading) {
				this.setState({ loading: true, message: ''}, () => {
					this.fetchSearchResults(updatedPageNo, this.state.query);
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
									<img className="image" src={result.previewURL} alt={result.user} />
								</div>
							</a>
						);
					})}
				</div>
			);
		}
	}; 

	render() {
        const { query, loading, currentPageNo, totalPages} = this.state;
		const showPrevLink = 1 < currentPageNo;
		const showNextLink = totalPages > currentPageNo;

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
               <img  src={Loader} className={`search-loading ${loading ? 'show' : 'hide' }`}  alt="loader"/>
					{this.renderSearchResults() }
				<PageNavigation 
					loading={loading}
					showPrevLink={showPrevLink}
					showNextLink={showNextLink}
					handlePrevClick={ () => this.handlePageClick('prev')}
					handleNextClick={ () => this.handlePageClick('next')} 
				/>
			</div>
			)
	}
}
export default Search;