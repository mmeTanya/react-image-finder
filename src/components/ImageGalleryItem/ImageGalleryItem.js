import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import './ImageGalleryItem.css';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  handleTogleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    const { image } = this.props;

    return (
      <li className="ImageGalleryItem" key={image.id}>
        <img
          src={image.webformatURL}
          alt={image.tags}
          loading="lazy"
          className="ImageGalleryItem-image"
          onClick={this.handleTogleModal}
        />
        {showModal && (
          <Modal
            src={image.largeImageURL}
            alt={image.tags}
            onClose={this.handleTogleModal}
          />
        )}
      </li>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
