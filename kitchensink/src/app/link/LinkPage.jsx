import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import SubPagingMenu from '../common/PageElements/SubPagingMenu';
import { Link } from 'pyrene';
import LinkUsage from './LinkUsage';
import CodePage from '../common/CodePage';
import '../../css/componentPage.css';

const LinkPage = ({ match }) => (
    <div className="page">
      <div styleName="header">
        <div styleName="title">Link</div>
        <div styleName="description">
          Links are used primarily on ....
        </div>

        <SubPagingMenu currentPageUrl={match.url}/>
      </div>

      <div styleName="topicContent">
        <Route path={`${match.url}/:topicName`} component={Topic} />
        <Route exact={true} path={match.url} render={() => <Redirect to={`${match.url}/code`}/>} />
      </div>
    </div>
);

const Topic = ({ match }) => {
  switch (match.params.topicName) {
    case 'code':
      return <CodePage component={Link} startProps={{ label: 'Click Me', path: '#' }} />;
    case 'usage':
      return <LinkUsage />;
    default:
      return <h3>{match.params.topicName}</h3>
  }
};



LinkPage.displayName = 'LinkPage';

LinkPage.propTypes = {
};

LinkPage.defaultProps = {
};

export default LinkPage;