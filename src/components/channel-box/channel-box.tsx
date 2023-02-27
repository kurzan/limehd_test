import { Channel } from '../channel/channel';
import { ChannelsContext, FilterContext, FavoriteChannelsContext } from '../../services/appContext';
import { useContext, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { useFocus } from '../../hooks/useFocus';

const ChannelsContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: #1A1A1A;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;


export const ChannelBox = () => {

  const { channels } = useContext(ChannelsContext);
  const { filter } = useContext(FilterContext);
  const { favoritesChannels } = useContext(FavoriteChannelsContext);

  const filteredChannels = useMemo(
    () => {
      const searchValue = filter || '';
      return channels.filter(
        item => item.name_ru.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) > -1
      );
    },
    [channels, filter]
  );

  const {currentFocus, setCurrentFocus, setBoxPerRow} = useFocus(filteredChannels.length);


  const isFav = (channel: any) => {

    for (let i = 0; i < favoritesChannels.length; i++) {
      if (favoritesChannels[i] === channel.number) {
        return true;
      }
    }
  }

  const ref = useRef(null);

  useEffect(() => {

      //@ts-ignore
    const boxes = ref.current.children;
    
    let boxPerRow = 0;
    if (boxes.length > 1) {
      var i = 0,
        total = boxes.length,
        firstOffset = boxes[0].offsetTop;
      while (++i < total && boxes[i].offsetTop === firstOffset);
      boxPerRow = i;
    }

      //@ts-ignore
      setBoxPerRow(boxPerRow)


  }, [setBoxPerRow])

  return (
    <ChannelsContainer tabIndex={-1} ref={ref} >
      {filteredChannels && filteredChannels.map((channel, index) => 
        <Channel setFocus={setCurrentFocus} focus={currentFocus === index} number={channel.number} key={channel.number} name_ru={channel.name_ru} image={channel.image} fav={isFav(channel)} />)}
    </ChannelsContainer>
  )
};