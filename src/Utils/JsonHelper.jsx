import DOMPurify from "dompurify";

DOMPurify.setConfig({ ADD_ATTR: ["target"] });

export async function fetchData(url, setContent, setError) {
  const cache = localStorage.getItem(url);
  const lastUpdatedKey = `last_updated_date_${url}`;
  const lastUpdatedDate = localStorage.getItem(lastUpdatedKey);
  const cacheExpirationKey = `cache_expiration_${url}`;
  const cacheExpirationTime = 600000; // 1 hour in milliseconds
  const cacheExpiration = localStorage.getItem(cacheExpirationKey);

  try {
    // Get last updated date of json endpoint.
    let response = await fetch(url);
    let lastModified = response.headers.get("last-modified");
    // Check if the cache date is the latest version and that it has not expired.
    let validCache =
      lastUpdatedDate === lastModified &&
      cacheExpiration &&
      cacheExpiration > Date.now();

    // set content from cache
    if (cache && validCache) {
      setContent(JSON.parse(cache));
    }
    // set content and localStorage from api fetch
    else {
      let json = await response.json();
      localStorage.setItem(url, JSON.stringify(json));
      localStorage.setItem(lastUpdatedKey, lastModified);
      localStorage.setItem(
        cacheExpirationKey,
        Date.now() + cacheExpirationTime,
      );
      setContent(json);
    }
  } catch (e) {
    setError(true);
    console.error(e);
  }
}

export const sanitizeDOM = (data) => DOMPurify.sanitize(data);
