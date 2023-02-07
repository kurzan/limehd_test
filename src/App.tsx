import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { AppHeader } from './components/app-header/app-header';
import { ChannelBox } from './components/channel-box/channel-box';
import { TChannel } from './components/channel/channel';

import { apiRequest, PLAYLIST_URL } from './utils/api';

import { ChannelsContext, FavoriteChannelsContext, FilterContext } from './services/appContext';

import { StateText } from './styles/components';

const Main = styled.main`
  height: 100%;
  width: 100%;
  padding-left: 24px;
  padding-right: 24px;
  background-color: #1A1A1A;
  box-sizing: border-box;
`;

interface IApiState {
  error?: boolean;
}

const ApiRequestState = styled(StateText)<IApiState>`
  color: ${({ error }) => error ? 'red' : 'white'};
`;


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
          <Main>
            {isLoading ? <ApiRequestState>Загружаем данные...</ApiRequestState> : null}
            {isError ? <ApiRequestState error>Произошла ошибка, попробуйте еще раз</ApiRequestState> : null}
            <FavoriteChannelsContext.Provider value={{ favoritesChannels, setFavoritesChannels }}>
              {channels && !isError && channels.length ? <ChannelBox /> : null}
            </FavoriteChannelsContext.Provider>
          </Main>
        </FilterContext.Provider>
      </ChannelsContext.Provider>
    </>
  );
}

export default App;
