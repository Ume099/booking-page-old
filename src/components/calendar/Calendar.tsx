import DayOfWeek from '@/components/calendar/parts/DayOfWeek';
import Days from '@/components/calendar/parts/Days';

type Props = {
  year: number;
  month: number;
};

// カレンダー部分のコンポーネント。機能ははDayコンポーネントに集約
const Calendar = (props: Props) => {
  const { year, month } = props;

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-center text-2xl">
        {year}年 {month}月
      </h1>
      <DayOfWeek />
      <Days year={year} month={month} />
    </div>
  );
};

export default Calendar;
