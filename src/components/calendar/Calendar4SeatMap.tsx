import DayOfWeek from '@/components/calendar/parts/DayOfWeek';
import Days4SeatMap from '@/components/calendar/parts/Days4SeatMap';

type Props = {
  year: number;
  month: number;
};

const Calendar4SeatMap = (props: Props) => {
  const { year, month } = props;

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-center text-2xl">
        {year}年 {month}月
      </h1>
      <Days4SeatMap year={year} month={month} />
    </div>
  );
};

export default Calendar4SeatMap;
