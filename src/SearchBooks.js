import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import Book from './Book';
import PropTypes from 'prop-types'

class SearchBooks extends Component {

    static propTypes = {
        onUpdateShelf: PropTypes.func,
        books: PropTypes.array
    }

    state = {
        query: '',
        searchedBooks: []
    }

    // Sets the state of query and then calls searchForBooks with the query
    updateQuery(query) {
        query = query.trim()
        this.setState({ query })
        this.searchForBooks(query)
    }

    // Gets called with a query. 
    searchForBooks = (query) => {
        if (query) {
            BooksAPI.search(query, 20).then(searchResult => {
                if (Array.isArray(searchResult)) {

                    searchResult.map(bookInSearchResult => {
                        for (const book of this.props.books) {
                            bookInSearchResult.shelf = 'moveTo'
                            if (bookInSearchResult.id === book.id) {
                                bookInSearchResult.shelf = book.shelf
                            }
                            return bookInSearchResult
                        }
                        return bookInSearchResult
                    })
                    searchResult.sort(sortBy('title'))
                    this.setState({ searchedBooks: searchResult });
                } else {
                    this.setState({ searchedBooks: null });
                    console.log('No result for "' + query + '". Please review "SEARCH_TERMS.md" for all available search terms.')
                }
            });
        } else {
            return null;
        }
    }

    render() {
        const { query, searchedBooks } = this.state
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to="/"
                        className="close-search"
                    >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />

                    </div>
                </div>
                {searchedBooks && query && (
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {searchedBooks.map((book) => (
                                <Book
                                    book={book}
                                    key={book.id}
                                    onUpdateShelf={this.props.onUpdateShelf}
                                />
                            ))}
                        </ol>
                    </div>
                )}
            </div>
        )
    }
}

export default SearchBooks;
