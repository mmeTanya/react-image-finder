import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { animateScroll as scroll } from 'react-scroll';
import { toast } from 'react-toastify';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import Loading from '../Loading';
import Modal from '../Modal';
import { FetchImages } from 'services/api';
import './ImageGallery.css';

class ImageGallery extends Component {
  state = {
    images: [],
    status: 'IDLE',
    page: 1,
    error: null,
    loading: false,
    showModal: false,
    showButton: false,
    activeImage: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      await this.setState({ status: 'PENDING', images: [], page: 1 });
      await this.handleRanderPage();
      return;
    }
  }

  handleRanderPage = async () => {
    try {
      await this.setState({ loading: true });
      const data = await FetchImages(this.props.query, this.state.page);

      if (data.hits.length !== 0) {
        if (this.state.page >= Math.ceil(data.totalHits / 12)) {
          await this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            status: 'RESOLVED',
            loading: false,
            showButton: false,
          }));
          toast("We're sorry, but you've reached the end of search results");
        }
         else {
          await this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            status: 'RESOLVED',
            loading: false,
            showButton: true,
          }));
        }

        await scroll.scrollToBottom();
        return;
      }
      this.setState({ status: 'REJECTED', loading: false });
      return;
    } catch (error) {
      this.setState({ error, status: 'REJECTED', loading: false });
    }
  };

  handleRanderNextPage = async () => {
    await this.setState(prevState => ({
      page: prevState.page + 1,
    }));

    await this.handleRanderPage();
  };

  handleOpenModal = index => {
    this.setState({
      showModal: true,
      activeImage: this.state.images.find(image => image.id === index),
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { images, status, loading, showModal, activeImage, showButton } =
      this.state;

    if (status === 'IDLE') {
      return <p className="text">Please, enter the name of a pictures</p>;
    }

    if (status === 'PENDING') {
      return <Loading />;
    }

    if (status === 'RESOLVED') {
      if (loading) {
        return (
          <>
            <ul className="ImageGallery">
              {images.map(image => (
                <ImageGalleryItem
                  image={image}
                  key={image.id}
                  onCliked={this.handleOpenModal}
                />
              ))}
            </ul>
            <Loading />
          </>
        );
      }
      return (
        <>
          <ul className="ImageGallery">
            {images.map(image => (
              <ImageGalleryItem
                image={image}
                key={image.id}
                onClicked={this.handleOpenModal}
              />
            ))}
          </ul>
          {showButton && <Button onClicked={this.handleRanderNextPage} />}
          {showModal && (
            <Modal modulImage={activeImage} onClose={this.handleCloseModal} />
          )}
        </>
      );
    }

    if (status === 'REJECTED') {
      return (
        <p className="text">
          Sorry, we do not find the pictures with a name {this.props.query}
        </p>
      );
    }
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};
