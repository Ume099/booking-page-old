type Props = {
  month: number;
  date: number;
  dayOfWeek: string;
  isOpen?: boolean;
  booking?: {
    isBooked?: boolean;
    capacity?: number;
    numOfTeachers: number;
    numOfStudents: number;
    isAvailable?: boolean;
  };
};

export const DayOfWeekList = ['月', '火', '水', '木', '金', '土', '日'];

export type classList = {
  key: string;
  isOpen: boolean;
  isAvailable: boolean;
  isBooked: boolean;
};

export type BookingDetail = {
  dayOfWeek: string;
  classes: classList[];
};

export type DAY_TYPE = {
  month: number;
  date: number;
  DayOfWeek: string;
  booking?: {
    isAvailable: boolean;
    isBooked: boolean;
    isOpen: boolean;
    isFixed: boolean;
    bookingDetail?: BookingDetail;
  };
};

const DayBookingFromSat13Obj: BookingDetail = {
  dayOfWeek: '土',
  classes: [
    {
      key: 'Sat_from10AM',
      isOpen: false,
      isAvailable: false,
      isBooked: false,
    },
    {
      key: 'Sat_from11AM',
      isOpen: false,
      isAvailable: false,
      isBooked: false,
    },
    {
      key: 'Sat_from13',
      isOpen: true,
      isAvailable: false,
      isBooked: false,
    },
    {
      key: 'Sat_from14',
      isOpen: true,
      isAvailable: false,
      isBooked: false,
    },
    {
      key: 'Sat_from15',
      isOpen: true,
      isAvailable: false,
      isBooked: false,
    },
    {
      key: 'Sat_from16',
      isOpen: true,
      isAvailable: false,
      isBooked: false,
    },
    {
      key: 'Sat_from17',
      isOpen: true,
      isAvailable: false,
      isBooked: false,
    },
  ],
};

export type MONTH_OF_YEAR_TYPE = {
  Month: number;
  monthDetail: {
    startWith: number;
    endRemain: number;
    dayDetail: DAY_TYPE[];
  };
};

export type DATES_OF_YEAR_TYPE = {
  year: number;
  yearDetail: MONTH_OF_YEAR_TYPE[];
};

export const DATES_OF_YEAR: DATES_OF_YEAR_TYPE = {
  year: 2024,
  yearDetail: [
    {
      Month: 7,
      monthDetail: {
        startWith: 0,
        endRemain: 4,
        dayDetail: [
          {
            month: 7,
            date: 1,
            DayOfWeek: '月',
          },
          {
            month: 7,
            date: 2,
            DayOfWeek: '火',
          },
          {
            month: 7,
            date: 3,
            DayOfWeek: '水',
          },
          {
            month: 7,
            date: 4,
            DayOfWeek: '木',
          },
          {
            month: 7,
            date: 5,
            DayOfWeek: '金',
          },
          {
            month: 7,
            date: 6,
            DayOfWeek: '土',
            booking: {
              isAvailable: false,
              isBooked: true,
              isOpen: true,
              isFixed: false,
              bookingDetail: DayBookingFromSat13Obj,
            },
          },
          {
            month: 7,
            date: 7,
            DayOfWeek: '日',
            booking: { isAvailable: true, isBooked: false, isOpen: true, isFixed: false },
          },
          {
            month: 7,
            date: 8,
            DayOfWeek: '月',
          },
          {
            month: 7,
            date: 9,
            DayOfWeek: '火',
          },
          {
            month: 7,
            date: 10,
            DayOfWeek: '水',
          },
          {
            month: 7,
            date: 11,
            DayOfWeek: '木',
          },
          {
            month: 7,
            date: 12,
            DayOfWeek: '金',
          },
          {
            month: 7,
            date: 13,
            DayOfWeek: '土',
            booking: {
              isAvailable: false,
              isBooked: true,
              isOpen: true,
              isFixed: false,
              bookingDetail: DayBookingFromSat13Obj,
            },
          },
          {
            month: 7,
            date: 14,
            DayOfWeek: '日',
            booking: { isAvailable: true, isBooked: false, isOpen: true, isFixed: false },
          },
          {
            month: 7,
            date: 15,
            DayOfWeek: '月',
          },
          {
            month: 7,
            date: 16,
            DayOfWeek: '火',
          },
          {
            month: 7,
            date: 17,
            DayOfWeek: '水',
          },
          {
            month: 7,
            date: 18,
            DayOfWeek: '木',
          },
          {
            month: 7,
            date: 19,
            DayOfWeek: '金',
          },
          {
            month: 7,
            date: 20,
            DayOfWeek: '土',
          },
          {
            month: 7,
            date: 21,
            DayOfWeek: '日',
          },
          {
            month: 7,
            date: 22,
            DayOfWeek: '月',
          },
          {
            month: 7,
            date: 23,
            DayOfWeek: '火',
          },
          {
            month: 7,
            date: 24,
            DayOfWeek: '水',
          },
          {
            month: 7,
            date: 25,
            DayOfWeek: '木',
          },
          {
            month: 7,
            date: 26,
            DayOfWeek: '金',
          },
          {
            month: 7,
            date: 27,
            DayOfWeek: '土',
            booking: {
              isAvailable: false,
              isBooked: true,
              isOpen: true,
              isFixed: false,
              bookingDetail: DayBookingFromSat13Obj,
            },
          },
          {
            month: 7,
            date: 28,
            DayOfWeek: '日',
            booking: { isAvailable: true, isBooked: false, isOpen: true, isFixed: false },
          },
          {
            month: 7,
            date: 29,
            DayOfWeek: '月',
          },
          {
            month: 7,
            date: 30,
            DayOfWeek: '火',
          },
          {
            month: 7,
            date: 31,
            DayOfWeek: '水',
          },
        ],
      },
    },
    {
      Month: 8,
      monthDetail: {
        startWith: 3,
        endRemain: 1,
        dayDetail: [
          {
            month: 8,
            date: 1,
            DayOfWeek: '木',
          },
          {
            month: 8,
            date: 2,
            DayOfWeek: '金',
          },
          {
            month: 8,
            date: 3,
            DayOfWeek: '土',
            booking: {
              isAvailable: false,
              isBooked: true,
              isOpen: true,
              isFixed: false,
              bookingDetail: DayBookingFromSat13Obj,
            },
          },
          {
            month: 8,
            date: 4,
            DayOfWeek: '日',
            booking: { isAvailable: true, isBooked: false, isOpen: true, isFixed: false },
          },
          {
            month: 8,
            date: 5,
            DayOfWeek: '月',
          },
          {
            month: 8,
            date: 6,
            DayOfWeek: '火',
          },
          {
            month: 8,
            date: 7,
            DayOfWeek: '水',
          },
          {
            month: 8,
            date: 8,
            DayOfWeek: '木',
          },
          {
            month: 8,
            date: 9,
            DayOfWeek: '金',
          },
          {
            month: 8,
            date: 10,
            DayOfWeek: '土',
            booking: {
              isAvailable: false,
              isBooked: true,
              isOpen: true,
              isFixed: false,
              bookingDetail: DayBookingFromSat13Obj,
            },
          },
          {
            month: 8,
            date: 11,
            DayOfWeek: '日',
            booking: { isAvailable: true, isBooked: false, isOpen: true, isFixed: false },
          },
          {
            month: 8,
            date: 12,
            DayOfWeek: '月',
          },
          {
            month: 8,
            date: 13,
            DayOfWeek: '火',
          },
          {
            month: 8,
            date: 14,
            DayOfWeek: '水',
          },
          {
            month: 8,
            date: 15,
            DayOfWeek: '木',
          },
          {
            month: 8,
            date: 16,
            DayOfWeek: '金',
          },
          {
            month: 8,
            date: 17,
            DayOfWeek: '土',
          },
          {
            month: 8,
            date: 18,
            DayOfWeek: '日',
            booking: { isAvailable: true, isBooked: false, isOpen: true, isFixed: false },
          },
          {
            month: 8,
            date: 19,
            DayOfWeek: '月',
          },
          {
            month: 8,
            date: 20,
            DayOfWeek: '火',
          },
          {
            month: 8,
            date: 21,
            DayOfWeek: '水',
          },
          {
            month: 8,
            date: 22,
            DayOfWeek: '木',
          },
          {
            month: 8,
            date: 23,
            DayOfWeek: '金',
          },
          {
            month: 8,
            date: 24,
            DayOfWeek: '土',
            booking: {
              isAvailable: false,
              isBooked: true,
              isOpen: true,
              isFixed: false,
              bookingDetail: DayBookingFromSat13Obj,
            },
          },
          {
            month: 8,
            date: 25,
            DayOfWeek: '日',
          },
          {
            month: 8,
            date: 26,
            DayOfWeek: '月',
          },
          {
            month: 8,
            date: 27,
            DayOfWeek: '火',
          },
          {
            month: 8,
            date: 28,
            DayOfWeek: '水',
          },
          {
            month: 8,
            date: 29,
            DayOfWeek: '木',
          },
          {
            month: 8,
            date: 30,
            DayOfWeek: '金',
          },
          {
            month: 8,
            date: 31,
            DayOfWeek: '土',
          },
        ],
      },
    },
    {
      Month: 9,
      monthDetail: {
        startWith: 6,
        endRemain: 6,
        dayDetail: [
          {
            month: 9,
            date: 1,
            DayOfWeek: '日',
          },
          {
            month: 9,
            date: 2,
            DayOfWeek: '月',
          },
          {
            month: 9,
            date: 3,
            DayOfWeek: '火',
          },
          {
            month: 9,
            date: 4,
            DayOfWeek: '水',
          },
          {
            month: 9,
            date: 5,
            DayOfWeek: '木',
          },
          {
            month: 9,
            date: 6,
            DayOfWeek: '金',
          },
          {
            month: 9,
            date: 7,
            DayOfWeek: '土',
            booking: {
              isAvailable: false,
              isBooked: true,
              isOpen: true,
              isFixed: false,
              bookingDetail: DayBookingFromSat13Obj,
            },
          },
          {
            month: 9,
            date: 8,
            DayOfWeek: '日',
            booking: { isAvailable: true, isBooked: false, isOpen: true, isFixed: false },
          },
          {
            month: 9,
            date: 9,
            DayOfWeek: '月',
          },
          {
            month: 9,
            date: 10,
            DayOfWeek: '火',
          },
          {
            month: 9,
            date: 11,
            DayOfWeek: '水',
          },
          {
            month: 9,
            date: 12,
            DayOfWeek: '木',
          },
          {
            month: 9,
            date: 13,
            DayOfWeek: '金',
          },
          {
            month: 9,
            date: 14,
            DayOfWeek: '土',
            booking: {
              isAvailable: false,
              isBooked: true,
              isOpen: true,
              isFixed: false,
              bookingDetail: DayBookingFromSat13Obj,
            },
          },
          {
            month: 9,
            date: 15,
            DayOfWeek: '日',
            booking: { isAvailable: true, isBooked: false, isOpen: true, isFixed: false },
          },
          {
            month: 9,
            date: 16,
            DayOfWeek: '月',
          },
          {
            month: 9,
            date: 17,
            DayOfWeek: '火',
          },
          {
            month: 9,
            date: 18,
            DayOfWeek: '水',
          },
          {
            month: 9,
            date: 19,
            DayOfWeek: '木',
          },
          {
            month: 9,
            date: 20,
            DayOfWeek: '金',
          },
          {
            month: 9,
            date: 21,
            DayOfWeek: '土',
          },
          {
            month: 9,
            date: 22,
            DayOfWeek: '日',
          },
          {
            month: 9,
            date: 23,
            DayOfWeek: '月',
          },
          {
            month: 9,
            date: 24,
            DayOfWeek: '火',
          },
          {
            month: 9,
            date: 25,
            DayOfWeek: '水',
          },
          {
            month: 9,
            date: 26,
            DayOfWeek: '木',
          },
          {
            month: 9,
            date: 27,
            DayOfWeek: '金',
          },
          {
            month: 9,
            date: 28,
            DayOfWeek: '土',
            booking: {
              isAvailable: false,
              isBooked: true,
              isOpen: true,
              isFixed: false,
              bookingDetail: DayBookingFromSat13Obj,
            },
          },
          {
            month: 9,
            date: 29,
            DayOfWeek: '日',
            booking: { isAvailable: true, isBooked: false, isOpen: true, isFixed: false },
          },
          {
            month: 9,
            date: 30,
            DayOfWeek: '月',
          },
        ],
      },
    },
    {
      Month: 10,
      monthDetail: {
        startWith: 1,
        endRemain: 3,
        dayDetail: [
          {
            month: 10,
            date: 1,
            DayOfWeek: '火',
          },
          {
            month: 10,
            date: 2,
            DayOfWeek: '水',
          },
          {
            month: 10,
            date: 3,
            DayOfWeek: '木',
          },
          {
            month: 10,
            date: 4,
            DayOfWeek: '金',
          },
          {
            month: 10,
            date: 5,
            DayOfWeek: '土',
            booking: {
              isAvailable: false,
              isBooked: true,
              isOpen: true,
              isFixed: false,
              bookingDetail: DayBookingFromSat13Obj,
            },
          },
          {
            month: 10,
            date: 6,
            DayOfWeek: '日',
            booking: { isAvailable: true, isBooked: false, isOpen: true, isFixed: false },
          },
          {
            month: 10,
            date: 7,
            DayOfWeek: '月',
          },
          {
            month: 10,
            date: 8,
            DayOfWeek: '火',
          },
          {
            month: 10,
            date: 9,
            DayOfWeek: '水',
          },
          {
            month: 10,
            date: 10,
            DayOfWeek: '木',
          },
          {
            month: 10,
            date: 11,
            DayOfWeek: '金',
          },
          {
            month: 10,
            date: 12,
            DayOfWeek: '土',
            booking: {
              isAvailable: false,
              isBooked: true,
              isOpen: true,
              isFixed: false,
              bookingDetail: DayBookingFromSat13Obj,
            },
          },
          {
            month: 10,
            date: 13,
            DayOfWeek: '日',
            booking: { isAvailable: true, isBooked: false, isOpen: true, isFixed: false },
          },
          {
            month: 10,
            date: 14,
            DayOfWeek: '月',
          },
          {
            month: 10,
            date: 15,
            DayOfWeek: '火',
          },
          {
            month: 10,
            date: 16,
            DayOfWeek: '水',
          },
          {
            month: 10,
            date: 17,
            DayOfWeek: '木',
          },
          {
            month: 10,
            date: 18,
            DayOfWeek: '金',
          },
          {
            month: 10,
            date: 19,
            DayOfWeek: '土',
          },
          {
            month: 10,
            date: 20,
            DayOfWeek: '日',
          },
          {
            month: 10,
            date: 21,
            DayOfWeek: '月',
          },
          {
            month: 10,
            date: 22,
            DayOfWeek: '火',
          },
          {
            month: 10,
            date: 23,
            DayOfWeek: '水',
          },
          {
            month: 10,
            date: 24,
            DayOfWeek: '木',
          },
          {
            month: 10,
            date: 25,
            DayOfWeek: '金',
          },
          {
            month: 10,
            date: 26,
            DayOfWeek: '土',
            booking: {
              isAvailable: false,
              isBooked: true,
              isOpen: true,
              isFixed: false,
              bookingDetail: DayBookingFromSat13Obj,
            },
          },
          {
            month: 10,
            date: 27,
            DayOfWeek: '日',
            booking: { isAvailable: true, isBooked: false, isOpen: true, isFixed: false },
          },
          {
            month: 10,
            date: 28,
            DayOfWeek: '月',
          },
          {
            month: 10,
            date: 29,
            DayOfWeek: '火',
          },
          {
            month: 10,
            date: 30,
            DayOfWeek: '水',
          },
          {
            month: 10,
            date: 31,
            DayOfWeek: '木',
          },
        ],
      },
    },
    {
      Month: 11,
      monthDetail: {
        startWith: 4,
        endRemain: 1,
        dayDetail: [
          {
            month: 11,
            date: 1,
            DayOfWeek: '金',
          },
          {
            month: 11,
            date: 2,
            DayOfWeek: '土',
            booking: {
              isAvailable: false,
              isBooked: true,
              isOpen: true,
              isFixed: false,
              bookingDetail: DayBookingFromSat13Obj,
            },
          },
          {
            month: 11,
            date: 3,
            DayOfWeek: '日',
            booking: { isAvailable: true, isBooked: false, isOpen: true, isFixed: false },
          },
          {
            month: 11,
            date: 4,
            DayOfWeek: '月',
          },
          {
            month: 11,
            date: 5,
            DayOfWeek: '火',
          },
          {
            month: 11,
            date: 6,
            DayOfWeek: '水',
          },
          {
            month: 11,
            date: 7,
            DayOfWeek: '木',
          },
          {
            month: 11,
            date: 8,
            DayOfWeek: '金',
          },
          {
            month: 11,
            date: 9,
            DayOfWeek: '土',
            booking: {
              isAvailable: false,
              isBooked: true,
              isOpen: true,
              isFixed: false,
              bookingDetail: DayBookingFromSat13Obj,
            },
          },
          {
            month: 11,
            date: 10,
            DayOfWeek: '日',
            booking: { isAvailable: true, isBooked: false, isOpen: true, isFixed: false },
          },
          {
            month: 11,
            date: 11,
            DayOfWeek: '月',
          },
          {
            month: 11,
            date: 12,
            DayOfWeek: '火',
          },
          {
            month: 11,
            date: 13,
            DayOfWeek: '水',
          },
          {
            month: 11,
            date: 14,
            DayOfWeek: '木',
          },
          {
            month: 11,
            date: 15,
            DayOfWeek: '金',
          },
          {
            month: 11,
            date: 16,
            DayOfWeek: '土',
          },
          {
            month: 11,
            date: 17,
            DayOfWeek: '日',
          },
          {
            month: 11,
            date: 18,
            DayOfWeek: '月',
          },
          {
            month: 11,
            date: 19,
            DayOfWeek: '火',
          },
          {
            month: 11,
            date: 20,
            DayOfWeek: '水',
          },
          {
            month: 11,
            date: 21,
            DayOfWeek: '木',
          },
          {
            month: 11,
            date: 22,
            DayOfWeek: '金',
          },
          {
            month: 11,
            date: 23,
            DayOfWeek: '土',
            booking: {
              isAvailable: false,
              isBooked: true,
              isOpen: true,
              isFixed: false,
              bookingDetail: DayBookingFromSat13Obj,
            },
          },
          {
            month: 11,
            date: 24,
            DayOfWeek: '日',
            booking: { isAvailable: true, isBooked: false, isOpen: true, isFixed: false },
          },
          {
            month: 11,
            date: 25,
            DayOfWeek: '月',
          },
          {
            month: 11,
            date: 26,
            DayOfWeek: '火',
          },
          {
            month: 11,
            date: 27,
            DayOfWeek: '水',
          },
          {
            month: 11,
            date: 28,
            DayOfWeek: '木',
          },
          {
            month: 11,
            date: 29,
            DayOfWeek: '金',
          },
          {
            month: 11,
            date: 30,
            DayOfWeek: '土',
          },
        ],
      },
    },
    {
      Month: 12,
      monthDetail: {
        startWith: 6,
        endRemain: 5,
        dayDetail: [
          {
            month: 12,
            date: 1,
            DayOfWeek: '日',
          },
          {
            month: 12,
            date: 2,
            DayOfWeek: '月',
          },
          {
            month: 12,
            date: 3,
            DayOfWeek: '火',
          },
          {
            month: 12,
            date: 4,
            DayOfWeek: '水',
          },
          {
            month: 12,
            date: 5,
            DayOfWeek: '木',
          },
          {
            month: 12,
            date: 6,
            DayOfWeek: '金',
          },
          {
            month: 12,
            date: 7,
            DayOfWeek: '土',
            booking: {
              isAvailable: false,
              isBooked: true,
              isOpen: true,
              isFixed: false,
              bookingDetail: DayBookingFromSat13Obj,
            },
          },
          {
            month: 12,
            date: 8,
            DayOfWeek: '日',
            booking: { isAvailable: true, isBooked: false, isOpen: true, isFixed: false },
          },
          {
            month: 12,
            date: 9,
            DayOfWeek: '月',
          },
          {
            month: 12,
            date: 10,
            DayOfWeek: '火',
          },
          {
            month: 12,
            date: 11,
            DayOfWeek: '水',
          },
          {
            month: 12,
            date: 12,
            DayOfWeek: '木',
          },
          {
            month: 12,
            date: 13,
            DayOfWeek: '金',
          },
          {
            month: 12,
            date: 14,
            DayOfWeek: '土',
            booking: {
              isAvailable: false,
              isBooked: true,
              isOpen: true,
              isFixed: false,
              bookingDetail: DayBookingFromSat13Obj,
            },
          },
          {
            month: 12,
            date: 15,
            DayOfWeek: '日',
            booking: { isAvailable: true, isBooked: false, isOpen: true, isFixed: false },
          },
          {
            month: 12,
            date: 16,
            DayOfWeek: '月',
          },
          {
            month: 12,
            date: 17,
            DayOfWeek: '火',
          },
          {
            month: 12,
            date: 18,
            DayOfWeek: '水',
          },
          {
            month: 12,
            date: 19,
            DayOfWeek: '木',
          },
          {
            month: 12,
            date: 20,
            DayOfWeek: '金',
          },
          {
            month: 12,
            date: 21,
            DayOfWeek: '土',
            booking: {
              isAvailable: false,
              isBooked: true,
              isOpen: true,
              isFixed: false,
              bookingDetail: DayBookingFromSat13Obj,
            },
          },
          {
            month: 12,
            date: 22,
            DayOfWeek: '日',
            booking: { isAvailable: true, isBooked: false, isOpen: true, isFixed: false },
          },
          {
            month: 12,
            date: 23,
            DayOfWeek: '月',
          },
          {
            month: 12,
            date: 24,
            DayOfWeek: '火',
          },
          {
            month: 12,
            date: 25,
            DayOfWeek: '水',
          },
          {
            month: 12,
            date: 26,
            DayOfWeek: '木',
          },
          {
            month: 12,
            date: 27,
            DayOfWeek: '金',
          },
          {
            month: 12,
            date: 28,
            DayOfWeek: '土',
          },
          {
            month: 12,
            date: 29,
            DayOfWeek: '日',
          },
          {
            month: 12,
            date: 30,
            DayOfWeek: '月',
          },
          {
            month: 12,
            date: 31,
            DayOfWeek: '火',
          },
        ],
      },
    },
  ],
};
