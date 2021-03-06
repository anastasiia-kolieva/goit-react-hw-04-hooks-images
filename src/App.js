import { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import './App.module.css';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import imageAPI from './services/images-api';
import s from './App.module.css';

export default function App() {
  const [imagesArray, setImagesArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pageCords, setPageCords] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [clickedImageUrl, setClickedImageUrl] = useState('');

  useEffect(() => {
    if (!searchQuery) {
      // Первый рендер, searchQuery это пустая строка, не делаем fetch
      return;
    }
    setImagesArray([]);
    fetchImages();
  }, [searchQuery]);

  const onChangeSearchWord = searchWord => {
    setSearchQuery(searchWord);
    setCurrentPage(1);
    setImagesArray([]);
  };

  const fetchImages = () => {
    const cords = document.documentElement.scrollHeight;
    setIsLoading(true);
    setPageCords(cords);

    window.scrollTo({
      top: pageCords,
      behavior: 'smooth',
    });

    imageAPI
      .fetchImages(searchQuery, currentPage)
      .then(data => {
        setImagesArray(prevImages => [...prevImages, ...data.hits]);
        setCurrentPage(prevPage => prevPage + 1);
      })
      .catch(() =>
        alert({
          text: 'Error! Please try again.',
        }),
      )
      .finally(() => setIsLoading(false));
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onImageClick = event => {
    if (event.target.nodeName !== 'IMG') {
      console.log('Did not push on the image!');
      return;
    }
    setClickedImageUrl(event.target.dataset.url);
    toggleModal();
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={onChangeSearchWord} />
      <ImageGallery
        imagesArray={imagesArray}
        handlerImageClick={onImageClick}
      />
      {isLoading && (
        <div className={s.loaderWrapper}>
          <Loader type="Hearts" color="#00BFFF" height={80} width={80} />
        </div>
      )}
      {imagesArray.length > 0 && <Button onClickHandle={fetchImages} />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img
            src={clickedImageUrl}
            alt=""
            width="1200"
            height="800"
            onClick={toggleModal}
          />
        </Modal>
      )}
    </div>
  );
}

// class App extends Component {
//   state = {
//     imagesArray: [],
//     currentPage: 1,
//     searchQuery: '',
//     isLoading: false,
//     // верхние кординаты страницы(для скрола)
//     pageCords: 0,
//     showModal: false,
//     clickedImageUrl: '',
//   };

//   componentDidUpdate(prevProps, prevState) {
//     // необходимо при пролистывании(нажатия на кнопку"догрузить"). Сохранение слова-поиска асинхронно, а функция
//     // фетча синхронна, потому выполняется первее.
//     // вызов функции fetchImages будет только тогда когда в searchImage будет новое значение
//     if (prevState.searchQuery !== this.state.searchQuery) {
//       this.setState({ imagesArray: [] }, this.fetchImages);
//     }
//   }

//   onChangeSearchWord = searchWord => {
//     // когда получаем слово для поиска картинки, сохраняем в стейт это слово для последующего
//     // перелистывания(нажатия на кнопку"догрузить")
//     // сбрасываем в исходное состояние currentPage и imagesArray, в случае нового ввода нового слова поиска
//     this.setState({ searchQuery: searchWord, currentPage: 1, imagesArray: [] });
//   };

//   fetchImages = () => {
//     const { currentPage, searchQuery, pageCords } = this.state;
//     const cords = document.documentElement.scrollHeight;
//     // загрузщик + новые кординаты для скрола
//     this.setState({ isLoading: true, pageCords: cords });
//     // scroll
//     window.scrollTo({
//       top: pageCords,
//       behavior: 'smooth',
//     });

//     fetch(
//       `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${keyApi}&image_type=photo&orientation=horizontal&per_page=12`,
//     )
//       .then(responce => responce.json())
//       .then(data => {
//         this.setState(prevState => ({
//           imagesArray: [...prevState.imagesArray, ...data.hits],
//           // увеличить отображаемую страницуна +1
//           currentPage: prevState.currentPage + 1,
//         }));
//       })
//       .catch(() =>
//         alert({
//           text: 'Error! Please try again.',
//         }),
//       )
//       .finally(() => this.setState({ isLoading: false }));
//   };

//   // метод для инверсии значения showModal
//   toggleModal = () => {
//     this.setState(state => ({
//       showModal: !state.showModal,
//     }));
//   };

//   onImageClick = event => {
//     // Проверка клика ИМЕННО по изображению
//     if (event.target.nodeName !== 'IMG') {
//       console.log('Did not push on the image!');
//       return;
//     }

//     // получила ссылку на нажатую картинку
//     // записываю ссылку на нажатую картинку в state.clickedImageUrl
//     this.setState({ clickedImageUrl: event.target.dataset.url });
//     // открываю модалку
//     this.toggleModal();
//   };

//   render() {
//     const { imagesArray, isLoading, showModal, clickedImageUrl } = this.state;
//     return (
//       <div className={s.App}>
//         <Searchbar onSubmit={this.onChangeSearchWord} />
//         <ImageGallery
//           imagesArray={imagesArray}
//           handlerImageClick={this.onImageClick}
//         />
//         {isLoading && (
//           <div className={s.loaderWrapper}>
//             <Loader type="Hearts" color="#00BFFF" height={80} width={80} />
//           </div>
//         )}
//         {imagesArray.length > 0 && <Button onClickHandle={this.fetchImages} />}
//         {showModal && (
//           <Modal onClose={this.toggleModal}>
//             <img
//               src={clickedImageUrl}
//               alt=""
//               width="1200"
//               height="800"
//               onClick={this.toggleModal}
//             />
//           </Modal>
//         )}
//       </div>
//     );
//   }
// }

// export default App;
