import BookingInfoBefChg from '@/components/common/parts/calendar/BookingInfoBefChg';

const TestComponents = () => {
  const date = new Date();
  const dateLocaled = date.toLocaleString();
  return (
    <div>
      BookingInfoBefChg:
      <div className="mt-4">
        <BookingInfoBefChg date={dateLocaled} />
      </div>
    </div>
  );
};

export default TestComponents;
