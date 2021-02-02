import { useState, useEffect } from 'react';
import fetchImg from '../services/fetchAPI';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query) {
      fetchImages();
    }
  }, [query]);

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  });

  const handleSubmitSearchbar = query => {
    setQuery(query);
    setImages([]);
    setCurrentPage(1);
    setError(null);
  };

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

  return (
    <>
      <Searchbar onSubmit={handleSubmitSearchbar} />
      <ImageGallery
        query={query}
        images={images}
        currentPage={currentPage}
        error={error}
        isLoading={isLoading}
        fetchImages={fetchImages}
      />
    </>
  );
};

export default App;
