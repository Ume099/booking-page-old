import { useBackdrop } from '@/hooks/common/useBackdrop';
import { apiContact } from '@/lib/api/contact';
import { LPFormParam } from '@/lib/type/contact';

type Executer = {
  execute: (param: LPFormParam) => Promise<boolean>;
};

export const useLPFormPost = (): Executer => {
  const { openBackdrop, closeBackdrop } = useBackdrop();
  return {
    execute: async (param: LPFormParam): Promise<boolean> => {
      openBackdrop('送信中');
      let ret = true;
      try {
        await apiContact.lpContactSend(param);
      } catch (e) {
        ret = false;
      }
      closeBackdrop();
      return ret;
    },
  };
};
