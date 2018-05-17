import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import SubPagingMenu from '../../common/PageElements/SubPagingMenu';
import { SingleSelect, CreatableSingleSelect, MultiSelect, MultiSelecttest } from 'pyrene';
import SelectUsage from './SelectUsage';
import CodePage from '../../common/CodePage';
import '../../../css/componentPage.css';

const SelectPage = ({ match }) => (
  <div className="page">
    <div styleName="header">
      <div styleName="title">Selection</div>
      <div styleName="description">
        Selection elements are used primarily on ....
      </div>

      <SubPagingMenu currentPageUrl={match.url} />
    </div>

    <div styleName="topicContent">
      <Route path={`${match.url}/:topicName`} component={Topic} />
      <Route exact path={match.url} render={() => <Redirect to={`${match.url}/code`} />} />
    </div>
  </div>
);

const testOptions = [
  { value: 'chocolate', label: 'Chocolate', valid: true },
  { value: 'strawberry', label: 'Strawberry', valid: true },
  { value: 'vanilla', label: 'Vanilla', valid: true },
  { value: 'bacon', label: 'Bacon', valid: false },
  { value: 'cookiedough', label: 'Cookie Dough', valid: true },
  { value: 'beer', label: 'Beer', valid: true },
  { value: 'cottoncandy', label: 'Cotton Candy', valid: true },
  { value: 'crab', label: 'Crab', valid: true },
  { value: 'greentea', label: 'Green Tea', valid: true },
  { value: 'mango', label: 'Mango', valid: true },
  { value: 'tuttifrutti', label: 'Tutti Frutti', valid: true },
  { value: 'grape', label: 'Grape', valid: true },
  { value: 'coconutmilk', label: 'Coconut Milk', valid: true },
  { value: 'dulce', label: 'Dulce de Leche', valid: true },
  { value: 'caramel', label: 'Caramel', valid: true },
  { value: 'banana', label: 'Banana', valid: true },
  { value: 'garlic', label: 'Garlic', valid: false },
  { value: 'twix', label: 'Twix', valid: true },
  { value: 'mintchocolatechip', label: 'Mint Chocolate Chip', valid: true },
  { value: 'spearmint', label: 'Spearmint', valid: true },
  { value: 'oyster', label: 'Oyster', valid: true },
  { value: 'pistachio', label: 'Pistachio', valid: true },
  { value: 'rice', label: 'Rice', valid: true },
  { value: 'chickenliver', label: 'Chicken Liver', valid: false },
  { value: 'superman', label: 'Superman', valid: true },
  { value: 'lucuma', label: 'Lucuma', valid: true },
  { value: 'bluemoon', label: 'Blue Moon', valid: true },
  { value: 'charcoal', label: 'Charcoal', valid: true },
  { value: 'cheesecake', label: 'Cheesecake', valid: true },
  { value: 'rumandraisin', label: 'Rum and Raisin', valid: true },
  { value: 'moosetracks', label: 'Moose Tracks', valid: true },
];

const Topic = ({ match }) => {
  switch (match.params.topicName) {
    case 'code':
      return (
        <React.Fragment>
          <CodePage component={SingleSelect} startProps={{
            title: 'Single-Select',
            placeholder: 'Choose your favorite ice cream',
            helperLabel: 'Ice cream is delicious',
            options: testOptions
          }}
          />
          <CodePage component={CreatableSingleSelect} startProps={{
            title: 'Creatable-Single-Select',
            placeholder: 'Choose your favorite ice cream',
            helperLabel: 'Ice cream is delicious',
            options: testOptions
          }}
          />
          <CodePage component={MultiSelect} startProps={{
            title: 'Multi-Select',
            placeholder: 'Choose your favorite ice cream',
            helperLabel: 'Ice cream is delicious',
            defaultValue: [testOptions[1], testOptions[2]],
            options: testOptions
          }}
          />
          <CodePage component={MultiSelecttest} startProps={{
            title: 'Multi-Select-Test',
            placeholder: 'Please choose your phone number',
            helperLabel: 'Ice cream is delicious',
            defaultValue: testOptions,
            options: testOptions
          }}
          />
        </React.Fragment>
      );
    case 'usage':
      return <SelectUsage />;
    default:
      return <h3>{match.params.topicName}</h3>;
  }
};


SelectPage.displayName = 'SelectPage';

export default SelectPage;
