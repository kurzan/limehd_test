import { Search } from "../search/search";
import logo from '../../images/logo.png';
import styles from './app-header.module.css';

export const AppHeader = () => {
  return (
    <header className={styles.header} > 
      <img src={logo} alt="logo" />
      <Search placeholder='Поиск телеканалов'/>
    </header>
  )
};