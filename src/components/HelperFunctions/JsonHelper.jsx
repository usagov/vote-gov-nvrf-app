export const fetchData = async(filename,setContent) => {
    const locale = document.documentElement.lang;
    const path = `src/data/${locale}/${filename}`;
    console.log(path);
    const response = await fetch(path).then(response => response.json());
    setContent(response);
}