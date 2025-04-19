import { useQuery } from '@tanstack/react-query';

const BASE_URL = 'https://vote.gov';

export function useFetchData(url, uuid, first=false) {
  const { data, isError, isLoading } = useQuery({
    queryKey: [url + uuid],
    queryFn: async () => {
      const response = await fetch(BASE_URL + url);
      const fetchedData = await response.json();
      // If UUID is provided, filter data by UUID.
      const finalData = uuid ? fetchedData.find(item => item.uuid === uuid)
        : first ? fetchedData[0]
        : fetchedData;
      return finalData;
    }
  });

  return {data, isError, isLoading}
}