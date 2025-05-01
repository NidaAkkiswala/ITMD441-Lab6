document.getElementById('getData').addEventListener('click', async () => {
    const select = document.getElementById('location');
    const coords = select.value;
    const dashboard = document.getElementById('dashboard');
  
    dashboard.innerHTML = '<p class="placeholder">Loading data...</p>';
  
    if (!coords) {
      dashboard.innerHTML = '<p class="placeholder">Please select a location.</p>';
      return;
    }
  
    const [lat, lng] = coords.split(',');
  
    try {
      const response = await fetch(`https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}&date=today`);
      const response2 = await fetch(`https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}&date=tomorrow`);
      const data = await response.json();
      const data2 = await response2.json();
  
      if (data.status !== 'OK' || data2.status !== 'OK') throw new Error('API error');
  
      const days = [data.results, data2.results];
      const labels = ['Today', 'Tomorrow'];
  
      dashboard.innerHTML = '';

      days.forEach((day, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <h3>${labels[index]}</h3>
          <p><strong>Sunrise:</strong> ${day.sunrise}</p>
          <p><strong>Sunset:</strong> ${day.sunset}</p>
          <p><strong>Dawn:</strong> ${day.dawn}</p>
          <p><strong>Dusk:</strong> ${day.dusk}</p>
          <p><strong>Solar Noon:</strong> ${day.solar_noon}</p>
          <p><strong>Day Length:</strong> ${day.day_length}</p>
          <p><strong>Timezone:</strong> ${day.timezone}</p>
          `;
        dashboard.appendChild(card);
      });
  
  
    } catch (err) {
      dashboard.innerHTML = '<p class="placeholder">Error fetching data. Please try again later.</p>';
      console.error(err);
    }
  });
  