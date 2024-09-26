export const formMessages = {
  required: (item: string): string => `${item}を入力してください`,
  max: (item: string, length: number): string => `${item}は${length}文字以内で入力してください`,
  email: '正しいメールアドレスを入力してください',
  tel: '正しい電話番号を入力してください',
};
