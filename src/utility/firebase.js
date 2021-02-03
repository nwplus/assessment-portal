import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'
import { APPLICATION_STATUS } from '../constants'
import JSZip from 'jszip'
import download from 'downloadjs'

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
  try {
    const ref = storage.ref(`applicantResumes/${userId}`)
    return await ref.getDownloadURL()
  } catch (e) {
    return undefined
  }
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
      basicInfo: {
        firstName,
        lastName,
        email,
        educationLevel,
        phoneNumber,
        school,
        location,
        major,
        hackathonsAttended,
      },
      status: { applicationStatus },
    } = doc.data()
    const totalScore = doc.data().score?.totalScore ?? '?'
    const firstTimeHacker = hackathonsAttended === 0
    return [
      firstName,
      lastName,
      email,
      phoneNumber,
      school,
      educationLevel,
      location,
      totalScore,
      applicationStatus,
      major,
      hackathonsAttended,
      firstTimeHacker,
    ]
  })
  CSV.unshift([
    'First Name',
    'last Name',
    'Email',
    'Phone Number',
    'School Name',
    'Level of Study',
    'Country',
    'Total Score',
    'Application Status',
    'Major',
    '# of hackathons attended',
    'First time hacker?',
  ])
  return CSV
}

export const getAllResumes = async () => {
  const apps = await db
    .collection('Hackathons')
    .doc('nwHacks2021') // hardcode for event
    .collection('Applicants')
    .where('status.applicationStatus', '!=', 'inProgress')
    .get()

  const sharableApps = apps.docs.filter(app => {
    const {
      termsAndConditions: { shareWithSponsors },
    } = app.data()
    return shareWithSponsors
  })

  const namesAndIds = sharableApps.map(doc => {
    const {
      basicInfo: { firstName, lastName },
    } = doc.data()
    return {
      id: doc.id,
      name: `${firstName} ${lastName}`,
    }
  })

  const urlPromises = namesAndIds.map(async info => {
    const url = await getResumeFile(info.id)
    return { ...info, url }
  })

  const APPUrls = await Promise.all(urlPromises)

  const zip = new JSZip()
  const zipPromises = APPUrls.map(async ({ url, name }) => {
    const resume = (await fetch(url)).blob()
    zip.file(`${name}.pdf`, resume, { binary: true })
  })
  await Promise.all(zipPromises)
  const finishedZip = await zip.generateAsync({ type: 'blob' })
  download(finishedZip, 'Resumes', 'application/zip')
}

export const logout = () => {
  firebase.auth().signOut()
}
