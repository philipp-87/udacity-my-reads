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

    updateQuery = (query) => {
        this.setState({ query: query.trim() }, function () {
            this.searchForBooks()
        })
    }

    searchForBooks = () => {
        const { query } = this.state

        if (query) {
            BooksAPI.search(query, 20).then(searchResult => {
                if (typeof searchResult !== 'undefined' && Array.isArray(searchResult)) {
                    searchResult.sort(sortBy('title'))

                    for (const book of searchResult) {
                        book.shelf = 'none'
                    }

                    for (const book of this.props.books) {
                        searchResult = searchResult.map((b) => {
                            //if same book is found then overwrite shelf
                            if (book.id === b.id) {
                                b.shelf = book.shelf
                            }
                            return b
                        })
                    }

                    this.setState({ searchedBooks: searchResult });
                } else {
                    this.setState({ searchedBooks: null });
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
