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

  updateShelf = (changedBook, newShelf) => {
    BooksAPI.update(changedBook, newShelf).then(newBooks => {
      this.setState(prevState => {
        return {
          books: prevState.books.map(book => {
            if (changedBook.id === book.id) {
              book.shelf = newShelf;
            }
            return book;
          })
        };
      });
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
