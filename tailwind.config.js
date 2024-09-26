const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  // パージの対象ファイルを設定
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      // スプレッドで展開している前に、メインとしたいフォント名を追加する
      // フォント名にスペースがある場合は、'Noto\\ Sans\\ JP'のように \ (バックスラッシュ)でエスケープする
      // Serif 体がメインの場合は、 `...defaultTheme.fontFamily.serif` を展開する
      ja: [...defaultTheme.fontFamily.sans],
      en: [...defaultTheme.fontFamily.sans],
    },
    theme: {
      extend: {
        height: {
          screen: ['100vh', '100dvh'],
        },
        minHeight: {
          screen: ['100vh', '100dvh'],
        },
        maxHeight: {
          screen: ['100vh', '100dvh'],
        },
      },
    },
    extend: {
      colors: {
        // 開発で使用するカラーを設定する
        // `DEFAULT` で設定しているものは、`text-theme` や `bg-primary` のように使用できる
        // それ以外は、 `text-theme-light` や `bg-primary-dark` のように使用する
        // テキストなどに使うベースカラー
        theme: {
          light: '#F2F2F2',
          medium: '#EFEFEF',
          DEFAULT: '#000000',
          dark: '#4E4E4E',
          extend: {},
        },
        // メインカラー
        primary: {
          light: '#C5FF95',
          medium: '#5DEBD7',
          DEFAULT: '#00cdc9',
          dark: '#074173',
        },
        // エラー時のカラー
        error: {
          DEFAULT: '#db250c',
        },
        // サブカラー
        secondary: {
          // light: '',
          // medium: '',
          DEFAULT: '#06b6d4',
          // dark: '',
        },
        // アクセントカラー
        accent: {
          // light: '',
          // medium: '',
          DEFAULT: '#ff3236',
          dark: '#cd0004',
        },
        dayOfWeek: {
          DEFAULT: '#D9D9D9',
          SAT: '#00C1D2',
          SUN: '#FF3236',
        },
        day: {
          DEFAULT: '#FFFFFF',
          ACTIVE: '#00EFC1',
          INACTIVE: '#E8E8E8',
          VACANT: '#D9D9D9',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],

  variants: {
    extend: {},
  },
  plugins: [],
};
