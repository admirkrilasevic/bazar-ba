import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import Item from "./Item";
import { Row, Col } from "react-bootstrap";
import { fetchItems } from '../../utils/ItemService';
import { ITEM_SORT, DIRECTION } from "../../constants";

function InfiniteScrollComponent() {
  const [items, setItems] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(async () => {
    const itemsFromServer = await fetchItems(page, 4, ITEM_SORT.DATE, DIRECTION.DESCENDING);
    setItems([...items, ...itemsFromServer.content]);
    setHasMoreItems(!itemsFromServer.last);
  }, [page]);

  const fetchData = async () => {
    setPage(page+1);
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={hasMoreItems}
    >
      <div className="container-fluid">
        <Row>
          {items.map((item) => {
            return (
              <Col xs={3}>
                <Item 
                  key={item.id}
                  id={item.id}
                  photo={item.photos}
                  name={item.name}
                  price={item.price}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    </InfiniteScroll>
  );
}

export default InfiniteScrollComponent;
