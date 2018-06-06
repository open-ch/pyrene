import React from 'react';
import { Modal } from 'pyrene';
import '../../../css/componentPage.css';
import Table from '../../common/PageElements/Tables/Table';

const ModalPage = ({ match }) => (
  <div className="page">
    <div styleName="header">
      <div styleName="title">Modal</div>
      <div styleName="description">
          Modal dialogs are used primarily on ....
      </div>
    </div>

    <div styleName="topicContent">
      <Modal size={'small'} height titleLabel={'Title'} content={
        <Table cellWidthArray={['100px', '200px']}
          headerElementArray={['Test', 'Test2']}
          rowArray={[
            ['test1', 'test2'],
            ['test1', 'test2'],
            ['test1', 'test2'],
            ['test1', 'test2'],
            ['test1', 'test2'],
            ['test1', 'test2'],
            ['test1', 'test2'],
            ['test1', 'test2'],
            ['test1', 'test2'],
            ['test1', 'test2'],
            ['test1', 'test2'],
            ['test1', 'test2'],
            ['test1', 'test2']]}
        />}
      />;
    </div>
  </div>
);


ModalPage.displayName = 'ModalPage';

ModalPage.propTypes = {
};

ModalPage.defaultProps = {
};

export default ModalPage;
