import { DAY_STARTS_WITH_SUN } from '@/lib/date';

const DayOfWeek = () => {
  return (
    <div className="grid grid-cols-7 border-l border-t border-black">
      {DAY_STARTS_WITH_SUN.map((day) => (
        <div
          key={day}
          className={`border-r border-black py-2 text-center ${day === '日' ? 'bg-red-300' : ''} ${
            day === '土' ? 'bg-blue-300' : ''
          }`}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

export default DayOfWeek;
