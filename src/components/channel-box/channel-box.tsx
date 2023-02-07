import { Channel } from '../channel/channel';
import { ChannelsContext, FilterContext, FavoriteChannelsContext } from '../../services/appContext';
import { useContext, useMemo } from 'react';
import styled from 'styled-components';

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

  const isFav = (channel: any) => {

    for (let i = 0; i < favoritesChannels.length; i++) {
      if (favoritesChannels[i] === channel.number) {
        return true;
      }
    }
  }

  return (
    <ChannelsContainer>
      {filteredChannels && filteredChannels.map((channel) => <Channel number={channel.number} key={channel.number} name_ru={channel.name_ru} image={channel.image} fav={isFav(channel)} />)}
    </ChannelsContainer>
  )
};