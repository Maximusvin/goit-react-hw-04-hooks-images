import { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');

  const handleSubmitSearchbar = query => {
    setQuery(query);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmitSearchbar} />
      <ImageGallery query={query} />
    </>
  );
};

export default App;
