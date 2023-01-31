import styles from './channel.module.css';
import { FC, useContext, useState } from 'react';
import { FavoriteChannelsContext } from '../../services/appContext';

type TStar = {
  fav: boolean | undefined;
  onClick: () => void;
}

const Star: FC<TStar> = ({ fav, onClick }) => {

  const handler = () => {
    onClick()
  };

  return (
    <svg onClick={handler} className={!fav ? styles.not_visible : ''} width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.1033 2.48366C17.4701 1.74041 18.5299 1.74041 18.8967 2.48366L23.1554 11.1126C23.301 11.4077 23.5826 11.6123 23.9083 11.6596L33.4309 13.0433C34.2511 13.1625 34.5786 14.1705 33.9851 14.749L27.0945 21.4657C26.8588 21.6954 26.7513 22.0264 26.8069 22.3508L28.4336 31.8349C28.5737 32.6518 27.7162 33.2748 26.9826 32.8891L18.4654 28.4113C18.174 28.2582 17.826 28.2582 17.5347 28.4113L9.01742 32.8891C8.28379 33.2748 7.42636 32.6518 7.56647 31.8349L9.19312 22.3508C9.24875 22.0264 9.14121 21.6954 8.90552 21.4657L2.01492 14.749C1.4214 14.1705 1.74891 13.1625 2.56913 13.0433L12.0917 11.6596C12.4174 11.6123 12.699 11.4077 12.8446 11.1126L17.1033 2.48366Z" fill={fav === true ? "#FCCA18" : "#1A1A1A"} stroke={fav === true ? "#FCCA18" : "#BCC5CD"} strokeWidth="2" />
    </svg>
  )
}

export type TChannel = {
  name_ru: string;
  image: string;
  number: number;
  fav: boolean | undefined;
};

export const Channel: FC<TChannel> = ({ name_ru, image, number, fav }) => {

  const [favorite, setFavorite] = useState(fav);

  const { favoritesChannels, setFavoritesChannels } = useContext(FavoriteChannelsContext);

  const favHandler = () => {
    if (!favorite) {
      setFavorite(!favorite)
      setFavoritesChannels([...favoritesChannels, number]);
      window.localStorage.setItem('favorites', JSON.stringify([...favoritesChannels, number]));
    } else {
      setFavorite(!favorite)
      setFavoritesChannels([...favoritesChannels.filter(item => item !== number)]);
      window.localStorage.setItem('favorites', JSON.stringify([...favoritesChannels.filter(item => item !== number)]));
    }
  }

  return (
    <div className={styles.channel}>
      <div className={styles.star}>
        <Star fav={favorite} onClick={favHandler} />
      </div>
      <img src={image} alt={name_ru} width='120px' height='120px' />
      <p className={styles.channel_name}><span className={styles.number}>{`${number}.`} </span>{name_ru}</p>
    </div>
  )
};