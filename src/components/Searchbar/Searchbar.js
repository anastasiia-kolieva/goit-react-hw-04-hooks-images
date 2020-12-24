import { useState } from 'react';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [searchWord, setSearchWord] = useState('');

  const handlerChange = event => {
    setSearchWord(event.target.value);
  };

  const handelSubmit = event => {
    event.preventDefault();

    onSubmit(searchWord);

    setSearchWord('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handelSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchWord}
          onChange={handlerChange}
        />
      </form>
    </header>
  );
}
// class Searchbar extends Component {
//   state = {
//     searchWord: '',
//   };

//   handlerChange = event => {
//     this.setState({ searchWord: event.target.value });
//   };

//   handelSubmit = event => {
//     event.preventDefault();

//     this.props.onSubmit(this.state.searchWord);

//     this.setState({ searchWord: '' });
//   };

//   render() {
//     return (
//       <header className={s.Searchbar}>
//         <form className={s.SearchForm} onSubmit={this.handelSubmit}>
//           <button type="submit" className={s.SearchFormButton}>
//             <span className={s.SearchFormButtonLabel}>Search</span>
//           </button>

//           <input
//             className={s.SearchFormInput}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.searchWord}
//             onChange={this.handlerChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }

// export default Searchbar;
