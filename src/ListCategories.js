import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import PropTypes from 'prop-types'

class ListCategories extends Component {

    static propTypes = {
        onUpdateShelf: PropTypes.func,
        books: PropTypes.array
    }

    renderShelf(shelf, name) {

        const { books } = this.props

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{name}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.filter(book => book.shelf === shelf).map((book) => (
                            <Book
                                book={book}
                                key={book.id}
                                onUpdateShelf={this.props.onUpdateShelf}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {this.renderShelf('currentlyReading', 'Currently Reading')}
                        {this.renderShelf('wantToRead', 'Want To Read')}
                        {this.renderShelf('read', 'Read')}
                    </div>
                </div>
                <div className="open-search">
                    <Link
                        to="/search"
                    >Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ListCategories;
