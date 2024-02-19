export const getImgurImage = (src: string) => {
  // eslint-disable-next-line no-useless-escape
  const url = src.replaceAll(/[\[\]\"]/g, '');

  const urlRegexp =
    /^(https?:\/\/)?(www\.)?(i\.imgur\.com)\/[a-zA-Z0-9]+(\.jpeg|\.png|\.jpg|\.gif|\.svg)?/;

  if (!url.match(urlRegexp)) return 'https://via.placeholder.com/1000x1000';

  return url;
};
