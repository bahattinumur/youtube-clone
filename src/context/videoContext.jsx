import { createContext, useEffect, useState } from 'react';
import { categories } from './../constants/index';
import { getData } from './../helpers/getData';

//1) Context temelini oluştur
export const VideoContext = createContext();

//2) Sağlayıcıyı tanımla
export const VideoProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    categories[0]
  );
  const [videos, setVideos] = useState(null);

  // Kategori hr değiştiğnde API'de veriyi al
  useEffect(() => {
    // menü seçildiyse fonksiyonu durdur
    if (selectedCategory.type === 'menu') return;

    //  Önce kategorinin verilerini temizle
    setVideos(null);

    // Type'i home'ise home endpoint'ine istek at
    if (selectedCategory.type === 'home') {
      getData('/home').then((res) => setVideos(res.data));
    }

    // Type'i trending'ise home trending endpoint'ine istek at
    if (selectedCategory.type === 'trending') {
      getData('/trending').then((res) => setVideos(res.data));
    }

    // Type'i category ise o zaman search endpoint'ine istek at
    if (selectedCategory.type === 'category') {
      getData(`/search?query=${selectedCategory.name}`).then((res) =>
        setVideos(res.data)
      );
    }
  }, [selectedCategory]);

  return (
    <VideoContext.Provider
      value={{ videos, selectedCategory, setSelectedCategory }}
    >
      {children}
    </VideoContext.Provider>
  );
};
