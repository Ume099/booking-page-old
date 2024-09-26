import ButtonOriginal from '@/components/common/parts/ButtonOriginal';
import axios from 'axios';

const TEST_API_NAME = 'test';

const TEST_API_PATH = '/api/booking/fetchOpenDays';

const ApiEndPoint = TEST_API_PATH;

const API_POST = async () => {
  try {
    const response = await fetch(TEST_API_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        DummyEmail: '',
        biko: '',
        defaultPass: '',
        educationStage: '',
        uid: 'test',
        name: '',
        family: '',
        grade: '',
        standardDay: '',
        seatNumber: '',
        standardClass: '',
      }),
    });
  } catch (e) {
    console.log(e);
  }
};

const API_GET = async () => {
  try {
    const response = await axios.get('api/booking/fetchStudentClassInfo', {
      params: { collectionName: 'students', uid: userInfo.uid },
    });
  } catch (error) {
    console.log(error);
  }
};

const API_UPDATE = async () => {
  try {
    const response = await fetch('/api/booking/updateClassChangeInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collectionName: 'students',
        docId: 'test',
        classChangeInfoList: [
          {
            classBefChange: 'test',
            classAftChange: 'aa',
            order: 0,
          },
          {
            classBefChange: 'test',
            classAftChange: 'aa',
            order: 1,
          },
        ],
      }),
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

const API_DELETE = async () => {
  try {
    const response = await fetch('/api/booking/deleteOpenDays', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collectionName: 'test',
        fieldName: 'test',
        fieldValue: 'test',
      }),
    });
    console.log(response.data[0]._fieldsProto);
  } catch (e) {
    console.log(e);
  }
};

export default function ApiTest() {
  return (
    <>
      <div className="mx-40 mt-48 flex justify-center rounded-lg border-2 bg-gray-50 py-40">
        <ul className="grid gap-4">
          <h1 className="mb-4 text-4xl">API_TEST</h1>
          <li>
            <ButtonOriginal onClick={() => API_FUNCTION()} variant="primary" label="POST" />
          </li>
          <li>
            <ButtonOriginal onClick={() => API_GET()} variant="primary" label="GET" />
          </li>
          <li>
            <ButtonOriginal onClick={() => API_DELETE()} variant="primary" label="DELETE" />
          </li>
          <li>
            <ButtonOriginal onClick={() => API_UPDATE()} variant="primary" label="UPDATE" />
          </li>
        </ul>
      </div>
    </>
  );
}
