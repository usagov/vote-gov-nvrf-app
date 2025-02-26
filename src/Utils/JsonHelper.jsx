import DOMPurify from "dompurify";

DOMPurify.setConfig({ADD_ATTR: ['target']});

export function fetchData(url, setContent, setError) {
  const cache = localStorage.getItem(url);

  // set state from cache
  if (cache) {
    setContent(JSON.parse(cache));
  } else {
  // set state from api fetch
    fetch(url)
    .then(response => response.json())
    .then(json => {
      // set the json result in localStorage
      localStorage.setItem(url, JSON.stringify(json));
      setContent(json);
    })
    .catch(() => setError(true));
  }
}

export const sanitizeDOM = (data) => DOMPurify.sanitize(data);