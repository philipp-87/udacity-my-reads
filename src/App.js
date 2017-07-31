import React from 'react';
import { Route } from 'react-router-dom';
import ListCategories from './ListCategories';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(result => {
      this.setState({
        books: result
      })
    });
  }

  getBooks(books) {
    let newBooks = []

    for (const book of books) {
      BooksAPI.get(book).then(result => {
        newBooks.push(result)

      });
    }
    console.log(newBooks)
  }

  updateShelf = (book, value) => {
    let newBooks = []
    BooksAPI.update(book, value).then(result => {
      const currentlyReading = result.currentlyReading
      const wantToRead = result.wantToRead
      const read = result.read

      newBooks = [...currentlyReading, ...wantToRead, ...read]
      console.log(newBooks)
      this.getBooks(newBooks)

    });
  }

  render() {
    console.log(this.state.books)
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() =>
            <ListCategories books={this.state.books} onUpdateShelf={this.updateShelf} />}
        />
        <Route
          path="/search"
          render={({ history }) =>
            <SearchBooks onUpdateShelf={this.updateShelf} />}
        />
      </div>
    )
  }
}

export default BooksApp
