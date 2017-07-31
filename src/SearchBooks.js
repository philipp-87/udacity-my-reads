import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import Book from './Book';
import PropTypes from 'prop-types'

class SearchBooks extends Component {

    static propTypes = {
        onUpdateShelf: PropTypes.func
    }

    state = {
        query: '',
        books: []
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() }, function () {
            this.searchForBooks();
        })
    }

    clearQuery = () => {
        this.setState({ query: '' })
    }

    searchForBooks = () => {
        let showingBooks
        const { query } = this.state
        const match = new RegExp(escapeRegExp(query), 'i')

        if (query) {
            BooksAPI.search(query, 20).then(result => {
                if (result.error) {
                    this.setState({ books: result.items })
                } else {
                    showingBooks = result.filter((book) => match.test(book.title))
                    showingBooks.sort(sortBy('title'))
                    console.log(showingBooks);
                    this.setState({ books: showingBooks });
                }
            });
        }

    }

    render() {
        const { query, books } = this.state

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to="/"
                        className="close-search"
                    >Close</Link>
                    <div className="search-books-input-wrapper">
                        {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />

                    </div>
                </div>
                {books && query && (
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {books.map((book) => (
                                <Book
                                    key={book.id}
                                    backgroundImage={(book.imageLinks !== undefined ? `url(${book.imageLinks.thumbnail})` : null)}
                                    title={book.title}
                                    authors={[book.authors].join(", ")}
                                    id={book.id}
                                    onUpdateShelf={this.props.onUpdateShelf}
                                    shelf={book.shelf}
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
