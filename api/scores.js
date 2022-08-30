import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getScoresByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/scores.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const tempScores = {};
      Object.values(response.data).forEach((element) => {
        tempScores[element.tile] = element.score;
      });
      resolve(tempScores);
    })
    .catch((error) => reject(error));
});

const deleteScoreByFirebaseKey = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/scores/${firebaseKey}.json`)
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const resetAllScoresByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/scores.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const firebaseKeys = [];
      Object.values(response.data).forEach((element) => {
        firebaseKeys.push(element.firebaseKey);
      });
      const deleteScorePromises = firebaseKeys.map((firebaseKey) => deleteScoreByFirebaseKey(firebaseKey));
      Promise.all(deleteScorePromises).then(resolve);
    })
    .catch((error) => reject(error));
});

export {
  getScoresByUid,
  deleteScoreByFirebaseKey,
  resetAllScoresByUid,
};
