import Container from '@/components/common/parts/Container';
import MyImage from '@/components/common/parts/MyImage';
import { Routes } from '@/lib/data/routes';

const LPForm = (): JSX.Element => {
  // 入力フォーム
  return (
    <Container maxWidth="max-w-3xl" className="pb-20">
      {/* 公式LINE への誘導 */}
      <p className="text-base sm:text-lg">
        無料体験会への参加希望・ご質問がある方は公式ラインまたはメール送信フォームよりお問い合わせください。
      </p>

      <div className="flex w-full flex-col items-center justify-center py-14">
        <a
          href={Routes.OfficialLINE.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex w-full flex-row items-center justify-center gap-2 rounded-full border-4 border-theme bg-white px-10 py-4 text-center text-base font-bold text-theme shadow-[6px_6px_6px_#00000033] duration-300 hover:-translate-y-1 hover:shadow-[10px_10px_10px_#00000033] sm:w-auto sm:px-20 sm:py-6 sm:text-2xl xl:text-3xl"
        >
          <MyImage
            src="/util/LINE_official_icon.png"
            width={1200}
            height={360}
            alt=""
            className="w-32 sm:w-48"
          />
          で相談する
        </a>
        <p className="mt-10 text-left text-base sm:text-center sm:text-lg">
          チャットで質問にお答えします。気軽にご質問ください。
        </p>
      </div>

      <div className="my-20 flex flex-row items-center gap-4">
        <span className="block h-[1px] w-full bg-theme" />
        <p className="shrink-0">または</p>
        <span className="block h-[1px] w-full bg-theme" />
      </div>

      {/* メールへの誘導 */}
      <h3 className="mb-14 text-center text-2xl font-bold">メールでお問い合わせ</h3>
      <p className="text-base sm:text-lg">
        メールでのやり取りをご希望の方は、以下のフォームよりお問い合わせください。
      </p>
      <div className="max-w-[750px]">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfKZ9ugX_cKK_r0YxqPLycCl7FGP4lDXZKblqsnpcdFiTgdPA/viewform?embedded=true"
          width="100%"
          height="1994"
        >
          読み込んでいます…
        </iframe>
      </div>
    </Container>
  );
};

export default LPForm;
