import React from 'react';
import TreeTableRow from './TreeTableRow/TreeTableRow';
import uniqid from 'uniqid';

export default class TreeTableUtils {

  static generateRowsFromData = (data, columns, treeLevel) => {
    return data.map((rowData) => {
      return <TreeTableRow data={rowData} parent={rowData.hasOwnProperty('children')} treeLevel={treeLevel} columns={columns} key={uniqid()} />;
    });
  };

}