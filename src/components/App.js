import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    query: '',
  };

  handleFormSubmit = query => {
    this.setState({ query });
  };

  render() {
    return (
      <div className="container">
        <Searchbar onSubmited={this.handleFormSubmit} />
        <ImageGallery query={this.state.query} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
