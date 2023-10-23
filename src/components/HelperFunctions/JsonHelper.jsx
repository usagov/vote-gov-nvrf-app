export const fetchData = async(filename,setContent) => {
    const locale = document.documentElement.lang;
    const response = await fetch(`src/data/${locale}/${filename}`).then(response => response.json());
    setContent(response);
}