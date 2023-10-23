export const fetchData = async(filename,setContent) => {
    const locale = document.documentElement.lang;
    const response = await import(`../../data/${locale}/${filename}`)
    console.log(response);
    setContent(response);
}