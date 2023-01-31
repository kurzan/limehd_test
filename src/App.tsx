import { useEffect, useState } from 'react';
import styles from './App.module.css';

import { AppHeader } from './components/app-header/app-header';
import { ChannelBox } from './components/channel-box/channel-box';
import { TChannel } from './components/channel/channel';

import { apiRequest, PLAYLIST_URL } from './utils/api';

import { ChannelsContext, FavoriteChannelsContext, FilterContext } from './services/appContext';

function App() {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const [channels, setChannels] = useState<TChannel[]>([]);
  const [favoritesChannels, setFavoritesChannels] = useState<number[]>([]);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    apiRequest(PLAYLIST_URL)
      .then((data) => {
        setChannels(data.channels);
        setIsError(false);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    const fromLocalStorage = JSON.parse(window.localStorage.getItem('favorites') as any);
    setFavoritesChannels(fromLocalStorage ? fromLocalStorage : []);
  }, [])

  return (
    <>
      <ChannelsContext.Provider value={{ channels, setChannels }}>
        <FilterContext.Provider value={{ filter, setFilter }}>
          <AppHeader />
          <main className={styles.main}>
            {isLoading ? <p className={styles.loading} >Загружаем данные...</p> : null}
            {isError ? <p className={styles.error} >Произошла ошибка, попробуйте еще раз</p> : null}
            <FavoriteChannelsContext.Provider value={{ favoritesChannels, setFavoritesChannels }}>
              {channels && !isError && channels.length ? <ChannelBox /> : null}
            </FavoriteChannelsContext.Provider>
          </main>
        </FilterContext.Provider>
      </ChannelsContext.Provider>
    </>
  );
}

export default App;
