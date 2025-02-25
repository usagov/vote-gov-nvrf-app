import DOMPurify from "dompurify";
import { useState, useEffect } from "react";

DOMPurify.setConfig({ADD_ATTR: ['target']});

const lang = document.documentElement.lang;
const locale = lang !== "en" ? `/${lang}` : '';

export function fetchData(filename, setContent, setError) {
  const url = `${BASEURL}${locale}/nvrf/assets/${filename}`;
  const cache = localStorage.getItem(url);

  // set state from cache
  if (cache) {
    console.log("fetch from cache");
    setContent(JSON.parse(cache));
  } else {
  // set state from api fetch
  console.log("fetch from url");
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