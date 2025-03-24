const baseURL = 'https://api.pubg.com/shards/steam';

export const request = (endpoint: `/${string}`) => {
  const apiKey = process.env.EXPO_PUBLIC_PUBG_API_KEY;

  if (!apiKey) {
    return Promise.reject('Api Key not defined.');
  }

  return fetch(baseURL + endpoint, {
    headers: {
      Accept: 'application/vnd.api+json',
      Authorization: `Bearer ${apiKey}`,
    },
    keepalive: false
  });
};
