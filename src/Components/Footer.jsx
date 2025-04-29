import { useContext } from 'react';
import { DataContext } from 'Context/DataProvider';
import { sanitizeDOM } from 'Utils/JsonHelper';

export default function Footer() {
  const { stateContent, stringContent } = useContext(DataContext);
  const lastUpdatedSanitized = sanitizeDOM(stateContent.data.nvrf_last_updated_date);
  let cardFooter = stringContent.data.nvrf_footer.replace("@state_name", stateContent.data.name).replace("@date", lastUpdatedSanitized);

  return (
    <div
      className="text-base margin-top-5 maxw-tablet margin-x-auto"
      dangerouslySetInnerHTML={{__html: sanitizeDOM(cardFooter)}}
    />
  )
}