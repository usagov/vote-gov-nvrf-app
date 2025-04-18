import { useContext } from 'react';
import { DataContext } from 'Context/DataProvider';
import { sanitizeDOM } from 'Utils/JsonHelper';

export default function Footer() {
  const { stateContent, cardContent } = useContext(DataContext);
  const lastUpdatedSanitized = sanitizeDOM(stateContent.data.nvrf_last_updated_date);
  let cardFooter = cardContent.data.find(item => item.uuid === "5922e06c-ac2f-475d-ab10-abfdeb65de43");
  cardFooter = cardFooter.body.replace("@state_name", stateContent.data.name).replace("@date", lastUpdatedSanitized);

  return (
    <div
      className="text-base margin-top-5 maxw-tablet margin-x-auto"
      dangerouslySetInnerHTML={{__html: sanitizeDOM(cardFooter)}}
    />
  )
}