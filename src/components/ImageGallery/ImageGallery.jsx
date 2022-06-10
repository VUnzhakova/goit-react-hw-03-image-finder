import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import styles from './imageGallery.module.css';

function ImageGallery({ images, onOpenModal }) {
  const element = images.map(image => (
    <ImageGalleryItem
      onClick={() => onOpenModal(image)}
      key={image.id}
      image={image.webformatURL}
    />
  ));
  return <ul className={styles.list}>{element}</ul>;
}

export default ImageGallery;

ImageGallery.defaultProps = {};
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
