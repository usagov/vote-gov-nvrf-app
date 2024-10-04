import DOMPurify from "dompurify";
DOMPurify.setConfig({ADD_ATTR: ['target']});

export const fetchData = async(filename, setContent) => {
    const lang = document.documentElement.lang;
    const locale = lang !== "en" ? `${BASEURL}/${lang}` : BASEURL;
    const path = `${locale}/nvrf/assets/${filename}`;
    const response = await fetch(path).then(response => response.json());
    setContent(response);
}

export const fetchStaticData = async(filename, setContent) => {
    const lang = document.documentElement.lang;
    const locale = lang !== "en" ? `/${lang}` : "";
    const path = `${BASEURL}/data${locale}/${filename}`;
    const response = await fetch(path).then(response => response.json());
    setContent(response);
}

export const sanitizeDOM = (data) => DOMPurify.sanitize(data);