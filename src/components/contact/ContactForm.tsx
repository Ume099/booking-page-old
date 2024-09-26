import Button from '@/components/common/parts/Button';
import InputRow from '@/components/common/parts/InputRow';
import RhfInput from '@/components/rhf/RhfInput';
import RhfTextarea from '@/components/rhf/RhfTextarea';
import { useContactForm } from '@/hooks/contact/useContactForm';

const ContactForm = (): JSX.Element => {
  const { control, handleClickSubmit } = useContactForm();

  // 入力フォーム
  return (
    <div>
      {/* お名前 */}
      <div>
        <InputRow label="お名前" isRequired>
          <RhfInput
            name="name"
            control={control}
            inputProps={{
              type: 'text',
              placeholder: '例）山田太郎',
              className: 'w-full',
            }}
          />
        </InputRow>
      </div>

      {/* メールアドレス */}
      <div className="mt-8">
        <InputRow label="メールアドレス" isRequired>
          <RhfInput
            name="email"
            control={control}
            inputProps={{
              type: 'email',
              placeholder: '例）example@gmail.com',
              className: 'w-full',
            }}
          />
        </InputRow>
      </div>

      {/* 電話番号 */}
      <div className="mt-8">
        <InputRow label="電話番号" isRequired>
          <RhfInput
            name="tel"
            control={control}
            inputProps={{
              type: 'tel',
              placeholder: '例）090-1234-5678',
              className: 'w-full',
            }}
          />
        </InputRow>
      </div>

      {/* 会社名・事業者名 */}
      <div className="mt-8">
        <InputRow label="会社名・事業者名" isRequired>
          <RhfInput
            name="company"
            control={control}
            inputProps={{
              type: 'text',
              placeholder: '例）株式会社〇〇',
              className: 'w-full',
            }}
          />
        </InputRow>
      </div>

      {/* お問い合わせ内容 */}
      <div className="mt-8">
        <InputRow label="お問い合わせ内容" isRequired>
          <RhfTextarea
            name="body"
            control={control}
            inputProps={{
              rows: 10,
              placeholder: '詳しいお問い合わせ内容を入力してください',
              className: 'w-full',
            }}
          />
        </InputRow>
      </div>

      {/* 送信ボタン */}
      <Button
        variant="primary"
        label="送信"
        onClick={handleClickSubmit}
        className="mx-auto mt-20 w-full max-w-xs"
      />
    </div>
  );
};

export default ContactForm;
