export type Blog = {
  id: string;
  content: string;
  title: string;
  image: {
    url?: string;
    height?: number;
    width?: number;
  };
  date: string;
  description: string;
};
