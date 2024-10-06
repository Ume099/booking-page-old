import { getFirestore } from 'firebase-admin/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

const COLLECTION_NAME = 'students';

const db = getFirestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const {
    uid,
    familyName,
    givenName,
    familyNameFurigana,
    givenNameFurigana,
    currentGrade,
    defaultDay,
    defaultClass,
    studentClassification,
    gender,
    birthYear,
    birthMonth,
    birthDate,
    mainPhoneHolder,
    mainPhoneNumber,
    subPhoneHolder,
    subPhoneNumber,
    zipCode,
    toDoHuKen,
    toBanchi,
    buildingInfo,
    broOrSisUid,
    guardianGivenName,
    guradianFamilyName,
    guardianGivenNameFurigana,
    guradianFamilyNameFurigana,
    workPlace,
    workPhoneNumber,
    emergencyContact,
    emergencyPhoneNumber,
    teacher,
    NgTeacher: NgTeacher,
    subjects,
    ability,
    schoolDivision,
    schoolToDoHuKen,
    schoolCity,
    schoolName,
    period,
    group,
    payment,
    note,
    joinDate,
    classStardDate,
    exitDate,
  } = req.body;

  if (!uid) {
    res.status(400).json({ message: 'UID is required' });
    return;
  }
  try {
    const docRef = db.collection(COLLECTION_NAME).doc(uid);
    const insertData = {
      AUTHORITY: 'student',
      familyName: familyName || '',
      givenName: givenName || '',
      familyNameFurigana: familyNameFurigana || '',
      givenNameFurigana: givenNameFurigana || '',
      currentGrade: currentGrade || '',
      defaultDay: defaultDay || '',
      defaultClass: defaultClass || '',
      studentClassification: studentClassification || '',
      gender: gender || '',
      birthYear: birthYear || '',
      birthMonth: birthMonth || '',
      birthDate: birthDate || '',
      mainPhoneHolder: mainPhoneHolder || '',
      mainPhoneNumber: mainPhoneNumber || '',
      subPhoneHolder: subPhoneHolder || '',
      subPhoneNumber: subPhoneNumber || '',
      zipCode: zipCode || '',
      toDoHuKen: toDoHuKen || '',
      toBanchi: toBanchi || '',
      buildingInfo: buildingInfo || '',
      broOrSisUid: broOrSisUid || '',
      guardianGivenName: guardianGivenName || '',
      guradianFamilyName: guradianFamilyName || '',
      guardianGivenNameFurigana: guardianGivenNameFurigana || '',
      guradianFamilyNameFurigana: guradianFamilyNameFurigana || '',
      workPlace: workPlace || '',
      workPhoneNumber: workPhoneNumber || '',
      emergencyContact: emergencyContact || '',
      emergencyPhoneNumber: emergencyPhoneNumber || '',
      teacher: teacher || '',
      NgTeacher: NgTeacher || '',
      subjects: subjects || [],
      ability: ability || '',
      schoolDivision: schoolDivision || '',
      schoolToDoHuKen: schoolToDoHuKen || '',
      schoolCity: schoolCity || '',
      schoolName: schoolName || '',
      period: period || '',
      group: group || '',
      payment: payment || '',
      note: note || '',
      joinDate: joinDate || '',
      classStardDate: classStardDate || '',
      exitDate: exitDate || '',
    };
    await docRef.set(insertData);
    res.status(200).json({ message: 'Document successfully written!', data: insertData });
  } catch (error) {
    console.error('Error writing document: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
