document.getElementById('getData').addEventListener('click', async () => {
    const select = document.getElementById('location');
    const coords = select.value;
    
    if (!coords) {
      alert('Please select a location');
      return;
    }
  
    const [lat, lng] = coords.split(',');
  
    try {
      const response = await fetch(`https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}&date=today`);
      const response2 = await fetch(`https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}&date=tomorrow`);
      const data = await response.json();
      const data2 = await response2.json();
  
      if (data.status !== 'OK' || data2.status !== 'OK') throw new Error('API error');
  
      const today = data.results;
      const tomorrow = data2.results;
  
      document.getElementById('today-sunrise').textContent = today.sunrise;
      document.getElementById('today-sunset').textContent = today.sunset;
      document.getElementById('today-dawn').textContent = today.dawn;
      document.getElementById('today-dusk').textContent = today.dusk;
      document.getElementById('today-noon').textContent = today.solar_noon;
      document.getElementById('today-length').textContent = today.day_length;
      document.getElementById('today-zone').textContent = today.timezone;

      document.getElementById('tomorrow-sunrise').textContent = tomorrow.sunrise;
      document.getElementById('tomorrow-sunset').textContent = tomorrow.sunset;
      document.getElementById('tomorrow-dawn').textContent = tomorrow.dawn;
      document.getElementById('tomorrow-dusk').textContent = tomorrow.dusk;
      document.getElementById('tomorrow-noon').textContent = tomorrow.solar_noon;
      document.getElementById('tomorrow-length').textContent = tomorrow.day_length;
      document.getElementById('tomorrow-zone').textContent = tomorrow.timezone;
  
    } catch (err) {
      alert('Error fetching data. Please try again later.');
      console.error(err);
    }
  });
  