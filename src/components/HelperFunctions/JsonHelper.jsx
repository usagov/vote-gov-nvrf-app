import DOMPurify from "dompurify";
DOMPurify.setConfig({ADD_ATTR: ['target']});

export const fetchData = async(filename, setContent) => {
    const locale = document.documentElement.lang;
    const path = `data/${locale}/${filename}`;
    const response = await fetch(path).then(response => response.json());
    setContent(response);
}

export const cleanString = (string) => {
    var output = "";
    var detected = false;
    for (var i = 0; i < string.length - 5; i++) {
        if (string[i] == '<') detected = true;
        if (!detected) output += string[i]; 
        if (string[i] == '>') detected = false;
    }
    return output;
}

export const sanitizeDOM = (data) => DOMPurify.sanitize(data);