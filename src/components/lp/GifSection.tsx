import MyImage from '@/components/common/parts/MyImage';

const GifSection = (): JSX.Element => {
  return (
    <div className="bg-primary-light px-6 pb-10 pt-0 sm:pb-20">
      <MyImage src="/lp/upload.gif" width={1000} height={652} alt="" className="mx-auto" />
    </div>
  );
};

export default GifSection;
