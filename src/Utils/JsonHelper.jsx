import DOMPurify from "dompurify";
DOMPurify.setConfig({ADD_ATTR: ['target']});

export const fetchData = async(filename, setContent) => {
    const locale = document.documentElement.lang;
    const path = (locale == 'en') ? `api/nvrf/${filename}`: `${locale}/api/nvrf/${filename}`;
    const response = await fetch(path).then(response => response.json());
    setContent(response);
}

export const sanitizeDOM = (data) => DOMPurify.sanitize(data);