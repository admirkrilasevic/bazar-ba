import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemOverview from "../components/itemPage/ItemOverview";
import { fetchItemById } from "../utils/ItemService";


function ItemPage() {
    const { itemId } = useParams();
    const [item, setItem] = useState({});
  
    useEffect(async () => {
      const returnedItem = await fetchItemById(itemId);
      setItem(returnedItem);
      window.scrollTo(0,0);
    }, [itemId]);

    return (
        <ItemOverview {...item}/>
    );
}

export default ItemPage;
