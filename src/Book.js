import React from 'react';
import PropTypes from 'prop-types'


class Book extends React.Component {
    static propTypes = {
        backgroundImage: PropTypes.string,
        title: PropTypes.string,
        authors: PropTypes.string,
        id: PropTypes.string,
        onUpdateShelf: PropTypes.func,
        shelf: PropTypes.string
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
        this.props.onUpdateShelf({ id: this.props.id }, event.target.value)
    }

    render() {
        const { backgroundImage, title, authors } = this.props

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: backgroundImage }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={this.handleChange} value={this.props.shelf}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">{authors}</div>
                </div>
            </li>
        )
    }
}

export default Book