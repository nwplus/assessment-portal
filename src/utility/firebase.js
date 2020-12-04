import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

const config = {
  apiKey: process.env.REACT_APP_DEV_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_DEV_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DEV_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_DEV_PUBLIC_FIREBASE_PROJECT_ID,
  measurementId: process.env.REACT_APP_DEV_PUBLIC_FIREBASE_MEASUREMENT_ID,
  appId: process.env.REACT_APP_DEV_PUBLIC_FIREBASE_APP_ID,
  storageBucket: process.env.REACT_APP_DEV_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_DEV_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
}

const app = firebase.initializeApp(config)
export default app

export const db = firebase.firestore()
export const storage = firebase.storage()

export const getAllApplicants = async website => {
  const refs = await db
    .collection('Hackathons')
    .doc(website) // hardcode for event
    .collection('Applicants')
    .get()
  const applicants = {}
  refs.docs.forEach(doc => {
    applicants[doc.id] = doc.data()
  })
  return applicants
}

export const updateApplicantScore = async (website, applicantID, object) =>{
  db.collection('Hackathons')
    .doc(website) // hardcode for event
    .collection('Applicants')
    .doc(applicantID)
    .update(object)
}
