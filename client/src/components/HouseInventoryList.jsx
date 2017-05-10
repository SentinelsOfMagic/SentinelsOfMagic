import React from 'react';
import HouseInventoryListItem from './HouseInventoryListItem.jsx';

const AddItem = () => {
  return (<p>AddItem</p>);
};

var HouseInventoryList = (props) => {
  return (
    <div>
      {props.items.map((item, index) =>
        <HouseInventoryListItem
        item = {item}
        userId = {props.userId}
        key = {index}
        />
      )}
    </div>
  );
};

export default HouseInventoryList;
