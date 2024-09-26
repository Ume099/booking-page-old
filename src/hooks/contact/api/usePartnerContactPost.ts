import { useBackdrop } from '@/hooks/common/useBackdrop';
import { apiContact } from '@/lib/api/contact';
import { PartnerContactFormParam } from '@/lib/type/contact';

type Executer = {
  execute: (param: PartnerContactFormParam) => Promise<boolean>;
};

export const usePartnerContactPost = (): Executer => {
  const { openBackdrop, closeBackdrop } = useBackdrop();
  return {
    execute: async (param: PartnerContactFormParam): Promise<boolean> => {
      openBackdrop('送信中');
      let ret = true;
      try {
        await apiContact.partnerContactSend(param);
      } catch (e) {
        ret = false;
      }
      closeBackdrop();
      return ret;
    },
  };
};
