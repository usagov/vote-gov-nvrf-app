import DOMPurify from "dompurify";

DOMPurify.setConfig({ADD_ATTR: ['target']});

export async function fetchData(url, setContent, setError) {
  const cache = localStorage.getItem(url);
  const lastUpdatedKey = `last_updated_date_${url}`;
  const lastUpdatedDate = localStorage.getItem(lastUpdatedKey);
  
  try {
    // get last updated date of json endpoint
    let response = await fetch(url);
    let lastModified = response.headers.get('last-modified');

    // set content from cache
    if (cache && (lastUpdatedDate === lastModified)) {
      setContent(JSON.parse(cache));
      console.log('cache');
    }
    // set content and localStorage from api fetch
    else {
      let json = await response.json();
      localStorage.setItem(url, JSON.stringify(json));
      localStorage.setItem(lastUpdatedKey, date);
      setContent(json);
      console.log('api fetch');
    }
  }
  catch(e){
    setError(true);
  }
}

export const sanitizeDOM = (data) => DOMPurify.sanitize(data);