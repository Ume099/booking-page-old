import MyImage from '@/components/common/parts/MyImage';

// 正規化したファイル名
// ex: 010_PC_2000x1000.png
type ImageSrc = `${string}_${string}x${string}.png`;

type ResponsiveLPImageProps = {
  id?: string;
  pcImageSrc: ImageSrc;
  spImageSrc: ImageSrc;
};

const ResponsiveLPImage = (props: ResponsiveLPImageProps): JSX.Element => {
  const { id, pcImageSrc, spImageSrc } = props;

  const [pcWidth, pcHeight] = getWidthHeight(pcImageSrc);
  const [spWidth, spHeight] = getWidthHeight(spImageSrc);

  return (
    <div id={id}>
      <MyImage
        src={pcImageSrc}
        width={pcWidth * 2}
        height={pcHeight * 2}
        alt=""
        placeholder="empty"
        divProps={{ className: 'hidden sm:block' }}
      />
      <MyImage
        src={spImageSrc}
        width={spWidth}
        height={spHeight}
        alt=""
        divProps={{ className: 'sm:hidden' }}
      />
    </div>
  );
};

export default ResponsiveLPImage;

// 画像のファイル名から width, height を取得する関数
const getWidthHeight = (src: ImageSrc): [number, number] => {
  const fileName = src.split('/').slice(-1)[0].split('.')[0];
  const resolution = fileName.split('_').slice(-1)[0].split('x');
  const width = Number(resolution[0]);
  const height = Number(resolution[1]);
  return [width, height];
};
