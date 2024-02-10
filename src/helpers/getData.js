import axios from 'axios';

// istek için gerekli ayarlar
const options = {
  headers: {
    'X-RapidAPI-Key':
      'Enter here your API key',
    'X-RapidAPI-Host': 'yt-api.p.rapidapi.com',
  },
  params: {
    lang: 'tr',
    geo: 'TR',
  },
};

// Yapılalan bütün isteklerin ortak olan başlangıç oaranını belirle
axios.defaults.baseURL = 'https://yt-api.p.rapidapi.com';

// Parametre olarak aldığı url'e istek atıp
// Geriye elde ettiği verileri döndüren
export const getData = async (endpoint) => {
  try {
    // AP isteği at
    const res = await axios.get(endpoint, options);

    // Fonksiyonun çağrıldığı yere veriyi döndür
    return res.data;
  } catch (err) {
    console.log('Verileri çekerken bir sorun oluştu', err);
  }
};
