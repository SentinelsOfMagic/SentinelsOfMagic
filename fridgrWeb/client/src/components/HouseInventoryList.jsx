import React from 'react';
import HouseInventoryListItem from './HouseInventoryListItem.jsx';
import { GridList, GridTile } from 'material-ui/GridList';

var HouseInventoryList = (props) => {
  return (
    <GridList cellHeight="auto" cols={4} padding={15}>
      {props.items.map((item) =>
        <HouseInventoryListItem
        item={item}
        userId={props.userId}
        key={item.id}
        submitItem={props.submitItem}
        />
      )}
    </GridList>
  );
};

export default HouseInventoryList;
