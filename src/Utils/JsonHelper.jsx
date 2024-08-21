import DOMPurify from "dompurify";
DOMPurify.setConfig({ADD_ATTR: ['target']});

export const fetchData = async(filename, setContent) => {
    const locale = document.documentElement.lang;
    const assetsPath = "/nvrf/assets/"
    const path = (locale == 'en') ? `${assetsPath}${filename}`: `${locale}${assetsPath}${filename}`;
    const response = await fetch(path).then(response => response.json());
    setContent(response);
}

export const sanitizeDOM = (data) => DOMPurify.sanitize(data);