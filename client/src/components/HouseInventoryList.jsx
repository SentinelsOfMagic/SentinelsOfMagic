import React from 'react';
import HouseInventoryListItem from './HouseInventoryListItem.jsx';

const AddItem = () => {
  return (<p>AddItem</p>);
};

var HouseInventoryList = (props) => {
  return (
    <div>
      <AddItem />
      {props.items.map((item, index) =>
        <HouseInventoryListItem
        item = {item}
        key = {index}
        />
      )}
    </div>
  );
};

export default HouseInventoryList;
