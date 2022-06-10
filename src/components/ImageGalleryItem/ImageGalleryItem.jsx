import PropTypes from 'prop-types';
import styles from './imageGalleryItem.module.css';

function ImageGalleryItem({ image, onClick, largeImageURL, tags }) {
  return (
    <li className={styles.item}>
      <img
        className={styles.image}
        src={image}
        alt={tags}
        data-source={largeImageURL}
        onClick={onClick}
      />
    </li>
  );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
