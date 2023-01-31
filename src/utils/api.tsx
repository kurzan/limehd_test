export const PLAYLIST_URL = 'https://limehd.tv/api/v4/playlist';

export const apiRequest = (url: string) => {

  return fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status)
    })
};
