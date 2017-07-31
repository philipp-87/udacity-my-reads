import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {


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
                console.log(result)
                if (result.error) {
                    this.setState({ books: result.items })
                } else {
                    showingBooks = result.filter((book) => match.test(book.title))
                    showingBooks.sort(sortBy('title'))
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
                                <div className="book" key={book.id}>
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: (book.imageLinks !== undefined ? `url(${book.imageLinks.thumbnail})` : null) }}></div>
                                        <div className="book-shelf-changer">
                                            <select>
                                                <option value="none" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors}</div>
                                </div>
                            ))}
                        </ol>
                    </div>
                )}
            </div>
        )
    }
}

export default SearchBooks;
