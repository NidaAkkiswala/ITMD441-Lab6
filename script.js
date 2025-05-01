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
  
    } catch (err) {
      dashboard.innerHTML = '<p class="placeholder">Error fetching data. Please try again later.</p>';
      console.error(err);
    }
  });
  