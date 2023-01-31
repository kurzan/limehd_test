import { FC, useContext } from 'react';
import search_img from '../../images/search.svg';
import styles from './search.module.css';
import { FilterContext } from '../../services/appContext';

type TSearch = {
  placeholder: string;
};

export const Search: FC<TSearch> = ({ placeholder }) => {

  const { setFilter } = useContext(FilterContext);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <div className={styles.search}>
      <input type="text" className={styles.search_field} placeholder={placeholder} onChange={onChange} />
      <img src={search_img} alt="" className={styles.search_icon} />
    </div>
    )
};
