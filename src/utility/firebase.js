import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'
import { APPLICATION_STATUS } from '../constants'

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
    .where('status.applicationStatus', '!=', 'inProgress')
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

export const updateApplicantStatus = async (userId, applicationStatus) => {
  return db
    .collection('Hackathons')
    .doc('nwHacks2021') // hardcode for event
    .collection('Applicants')
    .doc(userId)
    .update({
      'status.applicationStatus': applicationStatus,
    })
}

export const getApplicantsToAccept = async score => {
  const applicants = await db
    .collection('Hackathons')
    .doc('nwHacks2021')
    .collection('Applicants')
    .where('score.totalScore', '>=', score - 1)
    .get()
  return applicants.docs
    .filter(app => {
      const appStatus = app.data().status.applicationStatus
      const newHacker = app.data().basicInfo.hackathonsAttended === 0
      if (appStatus !== APPLICATION_STATUS.scored.text) return false
      if (newHacker) return true
      return app.data().score.totalScore >= score
    })
    .map(doc => doc.data())
}

export const getCSVData = async () => {
  const apps = await db
    .collection('Hackathons')
    .doc('nwHacks2021') // hardcode for event
    .collection('Applicants')
    .get()
  let CSV = apps.docs.map(doc => {
    const {
      basicInfo: { firstName, lastName, email },
      status: { applicationStatus },
    } = doc.data()
    const totalScore = doc.data().score?.totalScore ?? '?'
    return [firstName, lastName, email, totalScore, applicationStatus]
  })
  CSV.unshift(['firstName', 'lastName', 'email', 'total score', 'status'])
  return CSV
}

export const logout = () => {
  firebase.auth().signOut()
}
