export type ReqBody<T> = {
  method: string;
  headers: object;
  body: T;
};

// お問い合わせページ用の API が受け取るパラメータ
export type ContactFormParam = {
  name: string;
  email: string;
  tel: string;
  company: string;
  body: string;
};

// お問い合わせページ用の API が受け取るパラメータ
export type PartnerContactFormParam = {
  name: string;
  email: string;
  tel: string;
  company: string;
  body?: string;
};

// LP のフォーム用 API が受け取るパラメータ
export type LPFormParam = {
  name: string;
  email: string;
  tel: string;
  company: string;
  business?: string;
  howDidYouKnow: string[];
  body?: string;
};
