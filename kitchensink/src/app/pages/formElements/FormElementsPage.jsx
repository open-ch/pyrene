import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import SubPagingMenu from '../../common/PageElements/SubPagingMenu/SubPagingMenu';
import { Link } from 'pyrene';
import { Checkbox } from 'pyrene';
import { RadioSelection } from 'pyrene';
import { TextField } from 'pyrene';
import { TextArea } from 'pyrene';
import FormElementsUsage from './FormElementsUsage';
import CodePage from '../../common/CodePage';
import '../../../css/componentPage.css';

const FormElementsPage = ({ match }) => (
  <div className="page">
    <div styleName="header">
      <div styleName="title">Form elements</div>
      <div styleName="description">
         Form elements are used primarily on ....
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
      return (
        <React.Fragment>
          <CodePage component={Checkbox} startProps={{ label: 'Click Me'}} />
          <CodePage component={RadioSelection} startProps={{radioLabels:['option 1', 'option 2', 'option 3'], selectedOption: 'option 1' }} />
          <CodePage component={TextField} startProps={{ title: 'Field Label', placeholder: 'Placeholder Text', helperLabel: 'Helper text for instructions', width: 499 }} />
          <CodePage component={TextArea} startProps={{ title: 'Label', placeholder: 'Placeholder Text', helperLabel: 'Helper text for instructions', width: 499, rows: 3, maxLength: 50 }} />
        </React.Fragment>
      );
    case 'usage':
      return <FormElementsUsage />;
    default:
      return <h3>{match.params.topicName}</h3>;
  }
};


FormElementsPage.displayName = 'FormElementsPage';

export default FormElementsPage;
