import DayOfWeek from '@/components/calendar/parts/DayOfWeek';
import DaysToSetOpen from '@/components/calendar/parts/DaysToSetOpen';

type Props = {
  year: number;
  month: number;
};

const setOpenDay = (day: number) => {
  console.log(day);
};

const CalenderToSetOpen = (props: Props) => {
  const { year, month } = props;

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-center text-2xl">
        {year}年 {month}月
      </h1>
      <DayOfWeek />
      <DaysToSetOpen year={year} month={month} setOpenDay={setOpenDay} />
    </div>
  );
};

export default CalenderToSetOpen;
