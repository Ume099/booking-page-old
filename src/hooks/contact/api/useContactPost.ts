import { useBackdrop } from '@/hooks/common/useBackdrop';
import { apiContact } from '@/lib/api/contact';
import { ContactFormParam } from '@/lib/type/contact';

type Executer = {
  execute: (param: ContactFormParam) => Promise<boolean>;
};

export const useContactPost = (): Executer => {
  const { openBackdrop, closeBackdrop } = useBackdrop();
  return {
    execute: async (param: ContactFormParam): Promise<boolean> => {
      openBackdrop('送信中');
      let ret = true;
      try {
        await apiContact.contactSend(param);
      } catch (e) {
        ret = false;
      }
      closeBackdrop();
      return ret;
    },
  };
};
