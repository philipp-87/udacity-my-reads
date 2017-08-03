import React from 'react';
import PropTypes from 'prop-types'


class Book extends React.Component {
    static propTypes = {
        book: PropTypes.object,
        onUpdateShelf: PropTypes.func,
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
        this.props.onUpdateShelf(this.props.book, event.target.value)
    }

    render() {
        const { book } = this.props

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: (book.imageLinks !== undefined ? `url(${book.imageLinks.thumbnail})` : null) }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={this.handleChange} value={book.shelf}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{[book.authors].join(", ")}</div>
                </div>
            </li>
        )
    }
}

export default Book