import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createReport = (payload) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/reports.json`, payload)
    .then((response) => {
      const keyPayload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/reports/${response.data.name}.json`, keyPayload)
        .then((secondResponse) => resolve(secondResponse));
    })
    .catch((error) => reject(error));
});

export default createReport;
