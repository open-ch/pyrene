import React from 'react';
import { ArrowButton } from 'pyrene';
import CodePage from '../../common/CodePage';
import '../../../css/componentPage.css';

const ButtonPage = ({ match }) => (
  <div className="page">
    <div styleName="header">
      <div styleName="title">Button</div>
      <div styleName="description">
          Buttons are used primarily on action items.
          Some examples include Add, Start, Save, Delete.
          Do not use Buttons as navigational elements.
          Instead, use Links because it takes the user to a new page and is not associated with an action.
          Each page may have one to two primary buttons. Any remaining calls-to-action are represented as secondary buttons.
      </div>
    </div>

    <div styleName="topicContent">
      <CodePage component={ArrowButton} startProps={{}} />
    </div>
  </div>
);

ButtonPage.displayName = 'ButtonPage';

export default ButtonPage;
