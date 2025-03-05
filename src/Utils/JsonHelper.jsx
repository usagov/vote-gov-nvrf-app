import DOMPurify from "dompurify";

DOMPurify.setConfig({ADD_ATTR: ['target']});

export const fetchData = async (path, setContent, setError) => {
  const response = await fetch(path)
    .then(response => response.json())
    .catch(() => setError(true));
  setContent(response);
}

export const sanitizeDOM = (data) => DOMPurify.sanitize(data);