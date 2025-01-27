import DOMPurify from "dompurify";

DOMPurify.setConfig({ADD_ATTR: ['target']});

const lang = document.documentElement.lang;
const locale = lang !== "en" ? `/${lang}` : '';

export const fetchData = async (filename, setContent, setError) => {
  //harcoded ssg-test link
  const path = `https://ssg-test.vote.gov${locale}/nvrf/assets/${filename}`;
  const response = await fetch(path)
    .then(response => response.json())
    .catch(() => setError(true));
  setContent(response);
}

export const fetchStateData = async (state, setContent, setError) => {
  //harcoded ssg-test link
  const path = `https://ssg-test.vote.gov${locale}/nvrf/assets/state/${state}/data.json`;
  const response = await fetch(path)
    .then(response => response.json())
    .catch(() => setError(true));
  setContent(response);
}

export const fetchStaticData = async (filename, setContent, setError) => {
  const path = `${BASEURL}/data${locale}/nvrf/${filename}`;
  const response = await fetch(path)
    .then(response => response.json())
    .catch(() => setError(true));
  setContent(response);
}

export const sanitizeDOM = (data) => DOMPurify.sanitize(data);