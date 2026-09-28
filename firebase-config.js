// إعدادات Firebase لتطبيق الويب. هذه القيم العامة لا تمنح صلاحية الوصول للبيانات؛ Firestore Rules هي التي تحميها.
window.firebaseConfig = {
  apiKey: "AIzaSyACWmujOWclP_dPJY2QgEaaBiVUcV5ae7I",
  authDomain: "algorthim-math.firebaseapp.com",
  projectId: "algorthim-math",
  storageBucket: "algorthim-math.firebasestorage.app",
  messagingSenderId: "860761158069",
  appId: "1:860761158069:web:c71b84979129be3529e9fc",
  measurementId: "G-ED4MP467MF"
};
if (window.firebase && !firebase.apps.length) firebase.initializeApp(window.firebaseConfig);
if (window.firebase) {
  window.schoolFirebase = { app: firebase.app(), auth: firebase.auth(), db: firebase.firestore() };
  window.schoolFirebase.db.enablePersistence({ synchronizeTabs: true }).catch(() => {});
}
