async function fetchData() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '2c656a712fmsh3aed5d91c0da16ap1b86cdjsnfbc239e8b331',
      'X-RapidAPI-Host': 'youtube-to-mp3-converter2.p.rapidapi.com',
    },
  };

  const url = 'https://youtube-to-mp3-converter2.p.rapidapi.com/';

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error(error);
  }
}
