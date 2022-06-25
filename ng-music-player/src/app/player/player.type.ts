export interface ISongList {
  id: string | number;
  title: string;
  artist: string;
  cover: string;
  url: string;
  favorite: boolean;
}

export type RepeatState = 'repeat one' | 'repeat all' | 'repeat off';
