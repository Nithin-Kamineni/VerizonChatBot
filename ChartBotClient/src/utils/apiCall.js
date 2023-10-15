import axios from 'axios';

async function apiCall(path, body) {
    let responseData=null;
    const apiUrl = 'http://127.0.0.1:8000/v1/api/chatbot/';
    // Make the Axios POST request
    await axios.post(apiUrl+path, body)
    .then((response) => {
    // Update the state with the response data
        responseData=response.data;
    })
    .catch((error) => {
    // Handle any errors here
    console.error('Error fetching data:', error);
    });
    return responseData;
}

export default apiCall;