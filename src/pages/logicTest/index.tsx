import ButtonOriginal from '@/components/common/parts/ButtonOriginal';

const TestObj = {
  classChangeInfo: {
    arrayValue: {
      values: [
        {
          mapValue: {
            fields: {
              classBefChange: {
                stringValue: '2024_8_3-13:00~13:50',
                valueType: 'stringValue',
              },
              classAftChange: {
                stringValue: '2024_10_3-14:00~14:50',
                valueType: 'stringValue',
              },
              order: {
                integerValue: '0',
                valueType: 'integerValue',
              },
            },
          },
          valueType: 'mapValue',
        },
        {
          mapValue: {
            fields: {
              classBefChange: {
                stringValue: '2024_10_3-13:00~13:50',
                valueType: 'stringValue',
              },
              classAftChange: {
                stringValue: '2024_10_3-13:00~13:50',
                valueType: 'stringValue',
              },
            },
          },
          valueType: 'mapValue',
        },
      ],
    },
    valueType: 'arrayValue',
  },
  standardClass: {
    stringValue: '14:00 ~ 14:50',
    valueType: 'stringValue',
  },
  standardDay: {
    stringValue: '土',
    valueType: 'stringValue',
  },
};

// APIの詰め替え用クラス
class fetchStudentClassInfoResponse {
  constructor(obj) {
    this.classChangeInfoList = TestObj.classChangeInfo.arrayValue.values.map((val) => {
      return {
        classBefChange: val.mapValue.fields.classBefChange.stringValue,
        classAftChange: val.mapValue.fields.classAftChange.stringValue,
        order: val.mapValue.fields.order?.integerValue,
      };
    });
    this.classAftChange = TestObj.classChangeInfo.arrayValue.values.map(
      (val) => val.mapValue.fields.classBefChange,
    );
    this.standardInfo = obj.standardClass.stringValue;
    this.standardDay = obj.standardDay.stringValue;
  }
}

const test = new fetchStudentClassInfoResponse(TestObj);

export default function ApiTest() {
  return (
    <>
      <ButtonOriginal
        variant="error-secondary"
        label="Open"
        className="z-0 !flex !items-center !rounded-full !text-center text-4xl"
        onClick={() => console.log(test.classAftChange)}
      />
      <div class="ml-4 mt-4">{String(test.classChangeInfoList[0].order)}</div>
    </>
  );
}
