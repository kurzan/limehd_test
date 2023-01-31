import { Channel } from '../channel/channel';
import styles from './channel-box.module.css';
import { ChannelsContext, FilterContext, FavoriteChannelsContext } from '../../services/appContext';
import { useContext, useMemo } from 'react';

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
    <div className={styles.container}>
      {filteredChannels && filteredChannels.map((channel) => <Channel number={channel.number} key={channel.number} name_ru={channel.name_ru} image={channel.image} fav={isFav(channel)} />)}
    </div>
  )
};