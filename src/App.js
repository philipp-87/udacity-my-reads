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

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books })
      })
    })
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
