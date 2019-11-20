import * as firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyBrdeP3HI0eqUjLpvMLyV7ef2uPoiKML7c",
  authDomain: "pork-pork.firebaseapp.com",
  databaseURL: "https://pork-pork.firebaseio.com",
  projectId: "pork-pork",
  storageBucket: "pork-pork.appspot.com",
  messagingSenderId: "977313781377",
  appId: "1:977313781377:web:9164ffad0725fe14d41f80",
  measurementId: "G-J84W3TCHQN"
};
var fire = null;
if (!firebase.apps.length) {
  fire = firebase.initializeApp(firebaseConfig);
} else {
  fire = firebase.apps[0];
}
export default fire;
