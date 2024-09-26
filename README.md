## 環境

`package.json` を参照ください。

## 開発に参加する

### 1. Homebrew をインストール

- mac の場合はすでにインストール済の場合がある。アップデートで最新バージョンにする。
- windows の場合は WSL2 でダウンロード

### 2. Homebrew で Volta を環境構築

npm マネージャーの Volta を環境構築する

`brew install volta`

で最新バージョンをインストール

### 3. 以下の記事を参考に、volta で npm, Next.js を環境構築する

https://sinpe-pgm.com/nextjs-volta-nodejs/

### 4. npm install で node_modules などをインストール

`npm install`で package.json と package-lock.json に沿って開発環境をインストールする

### 5. Firebase Admin のサービスアカウントページから秘密鍵の JSON ファイルを DL し、アプリのルートディレクトリに配置する

[紛失した場合はこちらから再生成できるが、古い鍵は使えなくなる](https://console.firebase.google.com/project/booking-page-dbb44/settings/serviceaccounts/adminsdk?hl=ja)

### 99. サイトマップを作製して Google Search Console に登録する

[ここからできる](https://ph-1ab.com/exclude-specific-url-in-next-sitemap/)
