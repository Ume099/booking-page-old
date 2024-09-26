export type Route = {
  key: string;
  url: string;
  title: string;
  description?: string;
};

export const Routes = {
  INDEX: {
    key: 'INDEX',
    url: '/',
    title: 'プライム｜福岡市のプログラミングスクール',
    description: 'プライムの予約サイトです',
  },
  BOOKING: {
    key: 'BOOKING',
    url: '/booking',
    title: '予約ページ',
    description: '予約ページです',
  },
} as const;

export type Routes = keyof typeof Routes;
