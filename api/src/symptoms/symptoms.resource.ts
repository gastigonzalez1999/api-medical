import axios from "axios";

export default class SymptomsResource {
  public getSymptoms = async () => {
    const yourApiToken = '';
  const apiUrl = 'https://api.example.com/symptoms'; // Replace with the actual ApiMedic API endpoint

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${yourApiToken}` // Replace with your actual ApiMedic API token
      }
    });

    return response.data;
  } catch (error) {
    console.error('Fetching symptoms error:', error);
    throw new Error('Failed to fetch symptoms from ApiMedic');
  }
  };
}