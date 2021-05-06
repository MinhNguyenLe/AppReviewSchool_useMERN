import axios from 'axios';

export function search(string){
  const axiosData = async () => {
    const result = await axios.get(
      'http://localhost:9000/api/schools',
    );
    return result.data
  };
  axiosData();
}