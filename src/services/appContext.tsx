import { createContext } from "react";
import { TChannel } from "../components/channel/channel"; 

type TChannelsContext = {
  channels: TChannel[];
  setChannels: (action: any) => void;
};

type TFavoritesChannelsContext = {
  favoritesChannels: number[];
  setFavoritesChannels: (action: any) => void;
};

type TFilterContext = {
  filter: string;
  setFilter: (action: any) => void;
};


export const ChannelsContext = createContext<TChannelsContext>({} as TChannelsContext);
export const FilterContext = createContext<TFilterContext>({} as TFilterContext);
export const FavoriteChannelsContext = createContext<TFavoritesChannelsContext>({} as TFavoritesChannelsContext);