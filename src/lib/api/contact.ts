import axios from 'axios';

import { ContactFormParam, LPFormParam, PartnerContactFormParam } from '@/lib/type/contact';

export const apiContact = {
  // 通常問い合わせフォーム
  contactSend: async (param: ContactFormParam): Promise<void> => {
    await axios.post(`/api/contact`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: param,
    });
  },
  // 販売パートナー申請フォーム
  partnerContactSend: async (param: PartnerContactFormParam): Promise<void> => {
    await axios.post(`/api/contact/partner`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: param,
    });
  },
  // LP のフォーム
  lpContactSend: async (param: LPFormParam): Promise<void> => {
    await axios.post(`/api/contact/lp`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: param,
    });
  },
};
