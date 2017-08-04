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

  // All books which are currently in your shelfs are returned by the BooksAPI 
  componentDidMount() {
    BooksAPI.getAll().then(result => {
      this.setState({
        books: result
      });
    });
  }

  // When a book shelf is changed in the ListCategories or SearchBooks component, updateShelf() checks if your selected books isn't in your ListCategories
  // component. If it's not the book moves to ListCategories with the selected shelf value. If it's in your ListCategories the shelf of the selected book is updated.  
  updateShelf = (selectedBook, updatedShelf) => {
    BooksAPI.update(selectedBook.id, updatedShelf).then(newBooks => {
      this.setState(state => {
        const updatedBooks = state.books.filter(book => book.id !== selectedBook.id).concat(selectedBook);
        updatedBooks.map(book => {
          book.shelf = book.id === selectedBook.id ? updatedShelf : book.shelf;
          return book;
        });
        return { books: updatedBooks };
      });
    })
  }

  // UI for the application
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

export default BooksApp;
