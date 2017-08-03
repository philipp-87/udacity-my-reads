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

  updateShelf = (selectedBook, updatedShelf) => {
    console.log(selectedBook.title + ' ' + selectedBook.shelf)
    console.log(updatedShelf)
    BooksAPI.update(selectedBook.id, updatedShelf).then(newBooks => {
      this.setState(state => {
        const updatedBooks = state.books.filter(book => book.id !== selectedBook.id).concat(selectedBook)
        updatedBooks.map(book => {
          book.shelf = book.id === selectedBook.id ? updatedShelf : book.shelf
          return book
        })
        return { books: updatedBooks }
      })
    })
  }

  render() {
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
            <SearchBooks books={this.state.books} onUpdateShelf={this.updateShelf} />}
        />
      </div>
    )
  }
}

export default BooksApp
