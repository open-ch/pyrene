import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import SubPagingMenu from '../common/PageElements/SubPagingMenu';
import { Modal } from 'pyrene';
import ModalUsage from './ModalUsage';
import CodePage from '../common/CodePage';
import '../../css/componentPage.css';
import Table from '../common/Table';

const ModalPage = ({ match }) => (
  <div className="page">
    <div styleName="header">
      <div styleName="title">Modal</div>
      <div styleName="description">
          Modal dialogs are used primarily on ....
      </div>

      <SubPagingMenu currentPageUrl={match.url} />
    </div>

    <div styleName="topicContent">
      <Route path={`${match.url}/:topicName`} component={Topic} />
      <Route exact path={match.url} render={() => <Redirect to={`${match.url}/code`} />} />
    </div>
  </div>
);

const Topic = ({ match }) => {
  switch (match.params.topicName) {
    case 'code':
      return <Modal size={'small'} height titleLabel={'Title'} content={
        <Table cellWidthArray={['100px','200px']}
               headerElementArray={['Test','Test2']}
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
                 ['test1', 'test2']]}/>}/>;
    case 'usage':
      return <ModalUsage />;
    default:
      return <h3>{match.params.topicName}</h3>;
  }
};


ModalPage.displayName = 'ModalPage';

ModalPage.propTypes = {
};

ModalPage.defaultProps = {
};

export default ModalPage;
