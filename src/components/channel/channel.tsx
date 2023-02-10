import styled from 'styled-components';
import { FC, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { FavoriteChannelsContext } from '../../services/appContext';

type TStar = {
  fav: boolean | undefined;
  onClick: () => void;
}

const StarElement = styled.svg<TStar>`
  display: ${({ fav }) => fav ? 'inline' : 'none'}; 
`; 

const Star: FC<TStar> = ({ fav, onClick }) => {

  const handler = () => {
    onClick()
  };

  return (
    <StarElement fav={fav} onClick={handler} width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.1033 2.48366C17.4701 1.74041 18.5299 1.74041 18.8967 2.48366L23.1554 11.1126C23.301 11.4077 23.5826 11.6123 23.9083 11.6596L33.4309 13.0433C34.2511 13.1625 34.5786 14.1705 33.9851 14.749L27.0945 21.4657C26.8588 21.6954 26.7513 22.0264 26.8069 22.3508L28.4336 31.8349C28.5737 32.6518 27.7162 33.2748 26.9826 32.8891L18.4654 28.4113C18.174 28.2582 17.826 28.2582 17.5347 28.4113L9.01742 32.8891C8.28379 33.2748 7.42636 32.6518 7.56647 31.8349L9.19312 22.3508C9.24875 22.0264 9.14121 21.6954 8.90552 21.4657L2.01492 14.749C1.4214 14.1705 1.74891 13.1625 2.56913 13.0433L12.0917 11.6596C12.4174 11.6123 12.699 11.4077 12.8446 11.1126L17.1033 2.48366Z" fill={fav === true ? "#FCCA18" : "#1A1A1A"} stroke={fav === true ? "#FCCA18" : "#BCC5CD"} strokeWidth="2" />
    </StarElement>
  )
}

export type TChannel = {
  name_ru: string;
  image: string;
  number: number;
  fav: boolean | undefined;
  setFocus: any;
  focus: any;
};

const StarContainer = styled.div`
  position: absolute;
  right: 8.33%;
  top: 8.33%;
  cursor: pointer;
`;

const ChannelName = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  color: #BCC5CD;
  text-align: center;
`;

const ChannelNumber = styled.span`
  color: #8C9AA7;
`;

const ChannelContainer = styled.div`
  height: 260px;
  width: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #1A1A1A;
  border-radius: 24px;
  position: relative;

  &:focus,
  &:hover {
    background-color: #1D8CFF;
    outline: none;
  } 
  
  &:focus > ${StarContainer} svg,
  &:hover > ${StarContainer} svg {
    display: block;
    outline: none;
  }

  &:focus > ${ChannelName},
  &:hover > ${ChannelName} {
    color: white;
    outline: none;
  }

  &:active {
    background-color: #333;
    border-color: #333;
    color: #eee;
  }

`;


export const Channel: FC<TChannel> = ({ setFocus, focus, name_ru, image, number, fav }) => {

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

  const ref = useRef(null);

  useEffect(() => {
    if (focus) {
      //@ts-ignore
      ref.current.focus();
    }
  }, [focus]);

  const handleSelect = useCallback(() => {
    alert(`${name_ru}`);
    setFocus(number);
  }, [name_ru, number, setFocus]);

  return (
    <ChannelContainer tabIndex={focus ? 0 : -1} ref={ref} onClick={handleSelect} onKeyPress={handleSelect} >
      <StarContainer>
        <Star fav={favorite} onClick={favHandler} />
      </StarContainer>
      <img src={image} alt={name_ru} width='120px' height='120px' />
      <ChannelName><ChannelNumber>{`${number}.`}</ChannelNumber> {name_ru}</ChannelName>
    </ChannelContainer>
  )
};