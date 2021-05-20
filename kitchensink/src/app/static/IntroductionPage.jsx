import React from 'react';
import styles from '../../css/componentPage.css';
import Paragraph from '../common/PageElements/Paragraph/Paragraph';
import DescriptionBox from '../common/PageElements/DescriptionBox/DescriptionBox';
import DesignSystemBox from '../common/PageElements/IntroductionElements/DesignSystemBox';
import Principle from '../common/PageElements/IntroductionElements/Principle';

const IntroductionPage = () => (
  <div className={styles.page}>
    <div className={styles.header}>
      <div className={styles.title}>Introduction</div>
      <div className={styles.description}>
        <p>
          Open Systems is growing. As the business evolves, maintaining a coherent and captivating user experience for our interfaces is challenging.
          To keep our user interfaces coherent, we have created
          {' '}
          <strong>pyrene</strong>
          , a collection of components and the underlying design principles and foundations.
        </p>
        <p>
          It’s a place for people familiar with our design system and for anyone wishing to learn more about our work.
          It provides our engineers a collection of reusable components to build user interfaces.
        </p>
        <p>
          This is a living place that will be updated as we continue to develop and explore the specifics of our user-facing products.
        </p>
      </div>
    </div>

    <div className={styles.topicContent}>
      <Paragraph title="Design System">
        <DescriptionBox>
          Our design system helps us to increase speed and efficiency of how we design and build our products.
          Understanding the system and adopting the library will help us to use up-to-date and consistent markup, styles and behavior in prototype or production work.
          It also improves and keeps the quality of our user experiences.
        </DescriptionBox>
        <div className="designSystemGrid">
          <DesignSystemBox
            number={4}
            icon="pages"
            title="pages"
            description="Pages are the final stage and show what a user interfaces looks like with real representative content in place."
          />
          <DesignSystemBox
            number={3}
            icon="templates"
            title="templates"
            description="Templates are page-level objects that place components into a layout and visualize the underlying content structure."
          />
          <DesignSystemBox
            number={2}
            icon="components"
            title="components"
            description="Components are the UI building blocks. Components can be single UI elements like a Button or acting together as a unit. Some examples include Buttons, Inputs, Selects, Modals etc."
          />
          <DesignSystemBox
            number={1}
            icon="foundations"
            title="foundations"
            description="Foundations are the underlying parameters and variables which drive the general appearance, expression and behavior. Those elements can’t be broken down any further and do include fonts, colors, shapes, icons, grids, writing etc."
          />
        </div>
      </Paragraph>

      <Paragraph title="Principles">
        <DescriptionBox>
          What we do is important.
          But how we do it is even more important.
          Our principles will guide us and help us to make decisions that are sustainable.
        </DescriptionBox>

        <div className="principlesGrid">
          <Principle
            icon="tailor"
            title="Tailor-Made but Application-Agnostic"
            description="We aim to find the sweet spot of reusability. Leaving out functionality allows our components to be used consistently. Yet, we don’t want them to be so specific that they can only be used in a specific application"
          />
          <Principle
            icon="extensible"
            title="Extensible"
            description="We accept that we can't always get it right the first time, and we know that there will be future use cases that we just couldn't think of yet. That's why we design our components not to be complete, but to be extensible."
          />
          <Principle
            icon="simple"
            title="Simple but Controlled"
            description="While we want components to be as easy to use as possible, we understand that hiding complex state handling from their parents is not always the best option. Aspects that are of interest to the parent components, we must allow them to control, rather than consume."
          />
          <Principle
            icon="clarity"
            title="Clarity"
            description="We do not overwhelm our users with information. We practice simplicity by focusing on the essential aspects."
          />
          <Principle
            icon="efficiency"
            title="Efficiency"
            description="We minimize the effort it takes to reach a goal. We create familiarity by applying established patterns and use the same solution to the same problem."
          />
          <Principle
            icon="coherence"
            title="Coherence"
            description="We take care of consistent interactions, visual designs and writing. We pursue the same intuitive experience and create recognition across our products."
          />
          <Principle
            icon="accuracy"
            title="Accuracy"
            description="We are proud of what we do. We demonstrate respect for people’s time and attention through well thought and elegant craftsmanship."
          />
          <Principle
            icon="all"
            title="Design for All"
            description="We actively involve users and collect feedback to get a clear understanding of users and task requirements. We are committed to improve accessibility according W3C recommendations."
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
