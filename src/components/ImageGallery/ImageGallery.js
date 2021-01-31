import { useState, useEffect } from 'react';
import fetchImg from '../../services/fetchAPI';

import Button from '../Button/Button';
import ImageGalleryItem from './ImageGalleryItem';
import Modal from '../Modal/Modal';
import s from './ImageGallery.module.css';

export default function ImageGallery({ query }) {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);

  useEffect(() => {
    if (query) {
      setImages([]);
      setCurrentPage(1);
      setError(null);
      fetchImages();
    }
  }, [query]);

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  });

  const fetchImages = () => {
    const options = {
      query,
      currentPage,
    };

    setIsLoading(true);

    fetchImg(options)
      .then(
        images => setImages(prevState => [...prevState, ...images]),
        setCurrentPage(prevState => prevState + 1),
      )
      .catch(err => setError(err))
      .finally(() => setIsLoading(false));
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
    setLargeImageURL(null);
  };

  const handleModalImage = url => {
    toggleModal();
    setLargeImageURL(url);
  };

  const showButton = images.length > 0;

  return (
    <>
      {error && <h2>{error}</h2>}
      <ul className={s.imageGallery}>
        {images.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            onToggleModal={handleModalImage}
            largeImageURL={largeImageURL}
          />
        ))}
      </ul>

      {showButton && <Button onClick={fetchImages} isLoading={isLoading} />}

      {showModal && (
        <Modal onCloseModal={toggleModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
    </>
  );
}
