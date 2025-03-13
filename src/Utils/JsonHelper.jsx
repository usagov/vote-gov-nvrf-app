import DOMPurify from "dompurify";

DOMPurify.setConfig({ADD_ATTR: ['target']});

// Set a fallback cache expiration time.
const cacheExpirationTime = 3600000; // 1 hour in milliseconds

export async function fetchData(url, setContent, setError) {
  const cacheKey = `cache_${url}`;
  const lastUpdatedKey = `last_updated_date_${url}`;
  const cacheExpirationKey = `cache_expiration_${url}`;

  const cache = localStorage.getItem(cacheKey);
  const lastUpdatedDate = localStorage.getItem(lastUpdatedKey);
  const cacheExpiration = localStorage.getItem(cacheExpirationKey);

  try {
    let lastModified;

    // Check if cache is fresh
    if (cache && lastUpdatedDate && cacheExpiration) {
      let response = await fetch(url, { method: 'HEAD' });
      lastModified = response.headers.get('last-modified');

      if (lastModified === lastUpdatedDate) {
        // Cache is fresh, set content from cache
        setContent(JSON.parse(cache));

        // Check if cache expiration time is valid
        if (cacheExpiration < Date.now()) {
          // Cache is expired, fetch new data from API
          const fetchedData = await fetchDataFromAPI(url);
          updateCache(url, fetchedData, lastModified);
          setContent(fetchedData);
        }

        return;
      }
    }

    // Fetch data from API and update cache
    const fetchedData = await fetchDataFromAPI(url);
    lastModified = fetchedData.headers.get('last-modified');

    if (!lastModified) {
      // Handle case where last-modified header is missing
      console.error('last-modified header is missing');
      lastModified = '';
    }

    updateCache(url, fetchedData.data, lastModified);
    setContent(fetchedData.data);
  } catch (e) {
    setError(true);
    console.error(e);
  }
}

async function fetchDataFromAPI(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return { data, headers: response.headers };
  } catch (e) {
    console.error(e);
    throw e;
  }
}

function updateCache(url, data, lastModified) {
  const cacheKey = `cache_${url}`;
  const lastUpdatedKey = `last_updated_date_${url}`;
  const cacheExpirationKey = `cache_expiration_${url}`;

  localStorage.setItem(cacheKey, JSON.stringify(data));
  localStorage.setItem(lastUpdatedKey, lastModified);
  localStorage.setItem(cacheExpirationKey, Date.now() + cacheExpirationTime);
}

export const sanitizeDOM = (data) => DOMPurify.sanitize(data);