import { Component } from 'react';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import LoaderComponent from './LoaderComponent';
import Button from './Button';
import Modal from './Modal';

import { apiService } from './services/apiService';

import styles from './searchImage.module.css';

class App extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    search: '',
    page: 1,
    modalOpen: false,
    modalContent: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (search !== prevState.search || page !== prevState.page) {
      this.setState({
        loading: true,
      });
      this.fetchPosts();
    }
  }

  onSubmit = e => {
    this.setState({
      images: [],
      search: e.query,
    });
  };

  async fetchPosts() {
    const { search, page } = this.state;
    try {
      const data = await apiService(page, search);
      this.setState(prevState => {
        return {
          images: [...prevState.images, ...data.hits],
          loading: false,
          error: null,
        };
      });
    } catch (error) {
      this.setState({
        error: error.message,
        loading: false,
      });
    }
  }

  changeSearch = search => {
    if (search) {
      this.setState({ search, images: [] });
    } else {
      this.setState({ images: [], error: 'Пожалуйста введите текст!' });
    }
  };

  onLoadMore = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  };

  showModal = image => {
    this.setState({
      modalOpen: true,
      modalContent: image,
    });
  };

  hideModal = () => {
    this.setState({
      modalOpen: false,
      modalContent: null,
    });
  };

  render() {
    const { changeSearch, onLoadMore, showModal, hideModal } = this;
    const { loading, error, images, search, modalOpen, modalContent } =
      this.state;

    return (
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <Searchbar onSubmit={changeSearch} />
        </div>
        {error && <p> {error}</p>}
        {!images.length && search && !loading && !error && (
          <p>По запросу ничего не найдено!</p>
        )}

        <ImageGallery onOpenModal={showModal} images={images} />
        {loading && <LoaderComponent />}
        {modalOpen && (
          <Modal handleClose={hideModal}>
            <div className={styles.imageBox}>
              <img src={modalContent.largeImageURL} alt={modalContent.tags} />
            </div>
          </Modal>
        )}
        {!loading && images.length >= 12 && !error && (
          <Button onLoadMore={onLoadMore} text="Load more" />
        )}
      </div>
    );
  }
}

export default App;
