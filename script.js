document.addEventListener('DOMContentLoaded', () => {
  const missionariesContainer = document.getElementById('missionaries-container');
  let allMissionaries = [];

  // Load missionary data
  fetch('data/missionaries.json')
    .then(response => response.json())
    .then(data => {
      allMissionaries = data;
      initializeFilters();
      renderMissionaries(allMissionaries);
    })
    .catch(error => {
      console.error('Error loading data:', error);
      missionariesContainer.innerHTML = `
        <div class="col-12">
          <div class="alert alert-danger">
            Error loading missionary data. Please try again later.
          </div>
        </div>
      `;
    });

  // Initialize filters
  function initializeFilters() {
    // Extract unique values for filters
    const states = [...new Set(allMissionaries.map(m => m.region).filter(Boolean))].sort();
    const denominations = [...new Set(allMissionaries.map(m => m.denomination).filter(Boolean))].sort();
    const languages = extractUniqueLanguages();

    // Populate dropdowns
    populateDropdown('state-filter', states);
    populateDropdown('denomination-filter', denominations);
    populateDropdown('language-filter', languages);

    // Add event listeners
    document.getElementById('state-filter').addEventListener('change', filterMissionaries);
    document.getElementById('denomination-filter').addEventListener('change', filterMissionaries);
    document.getElementById('language-filter').addEventListener('change', filterMissionaries);
  }

  // Helper to extract unique languages
  function extractUniqueLanguages() {
    const allLanguages = [];
    allMissionaries.forEach(missionary => {
      if (missionary.languages) {
        missionary.languages.split(',').forEach(lang => {
          const cleanLang = lang.trim();
          if (cleanLang && !allLanguages.includes(cleanLang)) {
            allLanguages.push(cleanLang);
          }
        });
      }
    });
    return allLanguages.sort();
  }

  // Populate dropdown options
  function populateDropdown(id, options) {
    const dropdown = document.getElementById(id);
    options.forEach(option => {
      const optionEl = document.createElement('option');
      optionEl.value = option;
      optionEl.textContent = option;
      dropdown.appendChild(optionEl);
    });
  }

  // Filter missionaries based on selections
  function filterMissionaries() {
    const selectedState = document.getElementById('state-filter').value;
    const selectedDenomination = document.getElementById('denomination-filter').value;
    const selectedLanguage = document.getElementById('language-filter').value;

    const filtered = allMissionaries.filter(missionary => {
      // State filter
      if (selectedState && missionary.region !== selectedState) return false;
      
      // Denomination filter
      if (selectedDenomination && missionary.denomination !== selectedDenomination) return false;
      
      // Language filter
      if (selectedLanguage) {
        if (!missionary.languages) return false;
        const langList = missionary.languages.split(',').map(l => l.trim());
        if (!langList.includes(selectedLanguage)) return false;
      }
      
      return true;
    });

    renderMissionaries(filtered);
  }

  // Render missionary cards
  function renderMissionaries(missionaries) {
    if (missionaries.length === 0) {
      missionariesContainer.innerHTML = `
        <div class="col-12 text-center py-5">
          <h3>No missionaries found</h3>
          <p class="text-muted">Try adjusting your filters</p>
        </div>
      `;
      return;
    }

    missionariesContainer.innerHTML = '';
    
    missionaries.forEach(missionary => {
      const card = document.createElement('div');
      card.className = 'col-md-4 mb-4';
      card.innerHTML = `
        <div class="card h-100 missionary-card">
          <img src="images/${missionary.image}" 
               class="card-img-top" 
               alt="${missionary.name}"
               onerror="this.src='images/placeholder.jpg'">
          <div class="card-body">
            <h5 class="card-title">${missionary.name}</h5>
            <p class="card-text">
              <strong>Region:</strong> ${missionary.region || 'N/A'}<br>
              <strong>Denomination:</strong> ${missionary.denomination || 'N/A'}<br>
              <strong>Languages:</strong> ${missionary.languages || 'N/A'}
            </p>
            <p class="card-text">${missionary.work}</p>
          </div>
        </div>
      `;
      missionariesContainer.appendChild(card);
    });
  }
});
