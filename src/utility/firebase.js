import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
}

const app = firebase.initializeApp(config)
export default app

export const db = firebase.firestore()
export const storage = firebase.storage()

export const getAllApplicants = async (website, callback) => {
  return db
    .collection('Hackathons')
    .doc(website) // hardcode for event
    .collection('Applicants')
    .where('status.applicationStatus', '==', 'applied')
    .onSnapshot(snap => {
      callback(snap.docs.map(doc => doc.data()))
    })
}

function calculateTotalScore(hackerScore) {
  // summing up values score
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  return Object.values(hackerScore).reduce(reducer)
}

export const updateApplicantScore = async (website, applicantID, object, adminEmail) => {
  const totalScore = calculateTotalScore(object)
  console.log(object)
  console.log(totalScore)
  db.collection('Hackathons')
    .doc(website) // hardcode for event
    .collection('Applicants')
    .doc(applicantID)
    .update({
      score: {
        scores: {
          ...object,
        },
        totalScore,
        lastUpdated: firebase.firestore.Timestamp.now(),
        lastUpdatedBy: adminEmail,
      },
    })
}

export const getResumeFile = async userId => {
  const ref = storage.ref(`applicantResumes/${userId}`)
  return await ref.getDownloadURL()
}
