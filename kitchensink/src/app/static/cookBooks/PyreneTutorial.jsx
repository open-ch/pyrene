import React from 'react';
import '../../../css/componentPage.css';
import { Link } from 'pyrene/dist/pyrene.dev';
import CodeBox from '../../common/PageElements/HowTo/CodeBox/CodeBox';
import Paragraph from '../../common/PageElements/Paragraph/Paragraph';
import DescriptionBox from '../../common/PageElements/DescriptionBox/DescriptionBox';


const ComponentType = `/**
 * Description goes here.
 */
const Component = props => ( // Functionnal component if no state is needed
  <div styleName="componentContainer"> // Notice: styleName for styling, more in 'Styling'
    ...
  </div>
);

Component.displayName = 'Component';

Component.defaultProps = {
  prop: '',
  prop2: true,
  ...
};

Component.propTypes = {
  /**
   * Prop description.
   * Follow the prop description and naming conventions seen in other components!
   */
  prop: PropTypes.string,
  /**
   * Prop 2 description.
   * Follow the prop description and naming conventions seen in other components!
   */
   prop2: PropTypes.bool,
};

// Do not forget to export..
export default Component;`;

const CssExample = `@import '../../styles/colors.css';

.container {
  position: relative;
  display: inline-block;

  & .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.button {
  box-sizing: border-box;
  height: 32px;
  padding: 8px 16px;
  border-radius: 2px;
  border: none;
  display: flex;
  align-items: center;

  cursor: pointer;

  &.type-danger {
    background-color: var(--red-500);
    color: var(--neutral-000);

    &:hover {
      background-color: var(--red-600);
    }
  }

  &.type-ghost {
    background-color: var(--neutral-000);
    color: var(--blue-500);

    &:hover {
      background-color: var(--neutral-030);
    }
  }
}`;

const PyreneTutorial = () => (
  <div styleName="page">
    <div className="header">
      <div styleName="title">Pyrene Guide</div>
      <div styleName="description">
        <p>[pahy-reen] noun. A polycyclic, atomic component library, consisting of endless fused brainpower, found in coffee tea and believed to be the secret ingredient in the new stack.</p>
      </div>
      <div className="topicContent">
        <Paragraph title="General">
          <DescriptionBox>
            <p>Pyrene is the new React based component library to be used in future portal projects. In order to keep the library consistent there are few concepts that have to be respected when creating a new component.</p>
          </DescriptionBox>
        </Paragraph>
        <Paragraph title="Components">
          <DescriptionBox>
              When creating a new component try to see if it will need to store information in its state. If it does not need any state, keep it as a functional component. Further sort all props alphabetically in its propTypes declaration and add comments like shown to automatically create the docs in Kitchensink (the displayName is the title of the generated page).
          </DescriptionBox>
          <CodeBox>
            {ComponentType}
          </CodeBox>
          <DescriptionBox>
            Whenever creating a new component, try to avoid lifecycle methods at all cost.
            {' '}
            <strong>Stick to controlled components as much as possible, if you need lifecycle methods you are probably doing something wrong. </strong>
            <p>
More on this topic
              <Link label="here" type="inline" path="https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html" />
              {' '}
and
              <Link label="here" type="inline" path="https://goshakkk.name/controlled-vs-uncontrolled-inputs-react" />
.
            </p>
          </DescriptionBox>
        </Paragraph>
        <Paragraph title="Styling">
          <DescriptionBox>
            <p>
              {'To style your component use the styleName tag. If you want to apply reusable styles from the common css file like \'unSelectable\' use the classNames tag. Note that for each styleName a corresponding reference in the css has to exist (crashes otherwise). In the css file you do not need to worry about reusing css names from other components as we use css modules.'}
            </p>
            <p>
              Use only class selectors in the css for styling (ie: .classname). Do not use html element selectors like span, p, div, etc. as the css breaks if you later on decide to change an element in your component.
            </p>
            <p>
              Use the color variables declared in colors.css whenever possible. Do not forget to include the file at the top of each new css file that you create.
            </p>
            <p>
              Do
              {' '}
              <strong>not</strong>
              {' '}
give your components any
              {' '}
              <strong>margin or styles that influence its surroundings</strong>
. The component styling should only affect the component itself, and live in every neighborhood peacefully without the need to push around its siblings.
            </p>
            <p>
              You are encouraged to nest css if it makes sense. Ask yourself before deciding: Will I hate myself in 3 weeks having to read this again?
            </p>
          </DescriptionBox>
          <CodeBox>
            {CssExample}
          </CodeBox>
        </Paragraph>
      </div>
    </div>
  </div>
);

export default PyreneTutorial;
