import { Platform, PlatformType, usePlayerStore } from '~/store/player';
import { useCallback } from 'react';

const platformToRequestMapper = {
  [Platform.PC]: 'steam',
  [Platform.PS]: 'psn',
  [Platform.XBOX]: 'xbox',
};

const getBaseUrl = (platform: PlatformType) =>
  `https://api.pubg.com/shards/${platformToRequestMapper[platform]}`;

export const useRequest = (endpoint: `/${string}`) => {
  const apiKey = process.env.EXPO_PUBLIC_PUBG_API_KEY;
  const { platform } = usePlayerStore();

  return useCallback(async () => {
    if (!apiKey) {
      return Promise.reject('Api Key not defined.');
    }
    return await fetch(getBaseUrl(platform) + endpoint, {
      headers: {
        Accept: 'application/vnd.api+json',
        Authorization: `Bearer ${apiKey}`,
      },
      keepalive: false,
    });
  }, [platform, endpoint, apiKey]);
};
