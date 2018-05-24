import React from 'react';
import PropTypes from 'prop-types';
import Paragraph from '../../common/PageElements/Paragraph';
import Table from '../../common/PageElements/Table';

import testImg from '../../../images/iconUsageTestIMG.png';

const SelectUsage = props => (
  <div className={'buttonCode_container'}>
    <Table
      cellWidthArray={['206px', 'auto']}
      headerElementArray={['button type', 'purpose']}
      rowArray={[
        ['primary', 'For all principle actions on a page. A page can have one to two primary buttons.'],
        ['secondary', 'For secondary actions such as ‘Discard’ in combination with a primary button.'],
        ['icon button', 'To draw more attention on what the button does. Icons are always paired with a label.'],
        ['Disabled Button', 'This is used when user cannot proceed until an input is collected.'],
        ['Ghost Button', 'When an action does not require primary dominance on the page.'],
        ['danger button', 'When an action has harmful intentions to the users data (delete, remove, etc).'],
        ['action button', 'Used for table actions. They are paired with icon and label.'],
        ['admin button', 'This is used when an action is accessible for MC Engineers only.'],

        ['combo button', 'When an action required by the user has more than one option,' +
        ' always use a a negative action button (secondary) paired with a positive action button (primary) in that order. ' +
        'Negative action buttons will be on the left. Positive action buttons should be on the right. ']

      ]}
    />
    <Paragraph title={'Labels'} content={
      <React.Fragment>
        <p>Button labels tell users what will happen when they click the button. Use verbs that describe the action, such as Add or Delete.
        Use <strong> ALL CAPS </strong> and keep it short and concise. Not more than three words for button labels. </p>
        <br />
        <p> For Action Buttons labels should be set in sentence case, with only the first word in a phrase and any proper nouns capitalized. </p>
        <br />
      For Combo Buttons, use specific labels, such as Save or Discard, instead of using OK and Cancel. This is particularly helpful when the user is confirming an action.
      </React.Fragment>
    }
    />
    <Paragraph title={'icon usage'} content={
      <React.Fragment>
        <p>Use SVG or our Iconfont. The icons have a size of 16x16px within buttons. <br />
          The icons always appear on the left side of the button label. <br />
          Icons have the same color value as the button label. <br /> </p>

        <img src={testImg} alt={'test'} />
      </React.Fragment>
    }
    />
  </div>
);


SelectUsage.displayName = 'SelectUsage';

SelectUsage.propTypes = {};

SelectUsage.defaultProps = {};

export default SelectUsage;
