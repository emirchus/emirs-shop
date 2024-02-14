import { useState, useEffect } from 'react';
import useEventListener from './use-event-listener';

export default function useMediaQuery(mediaQuery: string) {
  const [isMatch, setIsMatch] = useState(false);
  const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList | null | undefined>(null);

  useEffect(() => {
    const list = window.matchMedia(mediaQuery);
    setMediaQueryList(list);
    setIsMatch(list.matches);
  }, [mediaQuery]);

  useEventListener(
    'change',
    e => setIsMatch((e as unknown as MediaQueryList).matches),
    mediaQueryList
  );

  return isMatch;
}
