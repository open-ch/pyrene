import React from 'react';
import '../../css/componentPage.css';
import Paragraph from '../common/PageElements/Paragraph/Paragraph';
import DescriptionBox from '../common/PageElements/DescriptionBox/DescriptionBox';
import DesignSystemBox from '../common/PageElements/IntroductionElements/DesignSystemBox';
import Principle from '../common/PageElements/IntroductionElements/Principle';


const IntroductionPage = () => (
  <div className="page">
    <div className="header">
      <div styleName="title">Introduction</div>
      <div styleName="description">
        <p>
          Open Systems is growing. As the business evolves, maintaining a coherent and captivating user experience for our interfaces is challenging.
          To keep our user interfaces coherent, we have created <strong>Kitchensink</strong> as a live inventory for our UI components and the underlying design principles and foundations.
        </p>
        <br/>
        <p>
          It’s a place for people familiar with the Mission Control design system and for anyone wishing to learn more about our work.
          It provides our engineers a collection of reusable components to build user interfaces.
        </p>
        <br/>
        The <strong>Kitchensink</strong> is a living place that will be updated as we continue to develop and explore the specifics of our user facing products.
      </div>
    </div>

    <div className="topicContent">
      <Paragraph title={'Design System'} large>
        <DescriptionBox>
          Our Design System helps us to increase speed and efficiency of how we design and build our products.
          Understanding the system and adopting the library will help us to use up-to-date and consistent markup, styles and behavior in prototype or production work.
          It does also improve and keep the quality of our user experiences.
        </DescriptionBox>
        <div className={'designSystemGrid'}>
          <DesignSystemBox
            number={4}
            icon={'pages'}
            title={'pages'}
            description={'Pages are the final stage and show what a UI looks like with real representative content in place.'}
          />
          <DesignSystemBox
            number={3}
            icon={'templates'}
            title={'templates'}
            description={'Templates are page-level objects that place components into a layout and visualize the underlying content structure.'}
          />
          <DesignSystemBox
            number={2}
            icon={'components'}
            title={'components'}
            description={'Components are the UI building blocks. Components can be single UI elements like a Button or acting together as a unit. Some examples include Buttons, Inputs, Selects, Modals etc.'}
          />
          <DesignSystemBox
            number={1}
            icon={'foundations'}
            title={'foundations'}
            description={'Foundations are the underlying parameters and variables which drive the general appearance, expression and behavior. Those elements can’t be broken down any further and do include fonts, colors, shapes, icons, grids, writing etc.'}
          />
        </div>
      </Paragraph>

      <Paragraph title={'Principles'} large>
        <DescriptionBox>
          What we do is important.
          But how we do it is even more important.
          Our principles will guide us and help us to make decisions that are sustainable.
        </DescriptionBox>

        <div className={'principlesGrid'}>
          <Principle
            icon={'system'}
            title={'Built with System'}
            description={'Our design system is built using modern web component standards. We’re steadily refining our system to keep up with best practices and business requirements.'}
          />
          <Principle
            icon={'clarity'}
            title={'Clarity'}
            description={'We do not overwhelm our users with information. We practice simplicity by focusing on the essential aspects.'}
          />
          <Principle
            icon={'efficiency'}
            title={'Efficiency'}
            description={'We minimize the effort it takes to reach a goal. We create familiarity by applying established patterns and use the same solution to the same problem.'}
          />
          <Principle
            icon={'coherence'}
            title={'Coherence'}
            description={'We take care of consistent interactions, visual designs and writing. We pursue the same intuitive experience and create recognition across our products.'}
          />
          <Principle
            icon={'accuracy'}
            title={'Accuracy'}
            description={'We are proud of what we do. We demonstrate respect for people’s time and attention through well thought and elegant craftsmanship.'}
          />
          <Principle
            icon={'all'}
            title={'Design for All'}
            description={'We actively involve users and collect feedback to get a clear understanding of users and task requirements. We are committed to improve accessibility according W3C recommendations.'}
          />
        </div>

      </Paragraph>
    </div>
  </div>
);

IntroductionPage.displayName = 'IntroductionPage';

IntroductionPage.propTypes = {
};

IntroductionPage.defaultProps = {
};

export default IntroductionPage;
