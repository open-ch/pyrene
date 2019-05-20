import React, { Fragment } from 'react';

const examples = {};

const getPara = () => (
  <Fragment>
    {'some text '}
    <b>bold</b>
  </Fragment>
);

examples.props = {
  children: getPara(),
};

export default examples;
