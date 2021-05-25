import React from 'react';
import styles from '../../../css/componentPage.css';
import Paragraph from '../../common/PageElements/Paragraph/Paragraph';
import DescriptionBox from '../../common/PageElements/DescriptionBox/DescriptionBox';
import { icons, svgs } from '../../data/foundationsData';
import IconBox from '../../common/PageElements/FoundationElements/IconBox/IconBox';
import IconDisplay from '../../common/PageElements/FoundationElements/IconDisplay/IconDisplay';

const IconsPage = () => (
  <div className={styles.page}>
    <div className={styles.header}>
      <div className={styles.title}>Icons</div>
      <div className={styles.description}>
        Icons are used to communicate with users and serve a functional purpose.
        They draw attention and help to anticipate what to expect.
        Icons also help visually impaired users and enhance usability.
      </div>
    </div>

    <div className={styles.topicContent}>
      <Paragraph title="Icon Font">
        <DescriptionBox>
          For web projects, the best format is our icon font.
          Explore or search for an icon and copy the reference by clicking on a icon to use it in your project.
        </DescriptionBox>
        <IconDisplay data={icons} />

      </Paragraph>

      <Paragraph title="Two-Tone And Multi-Color Icons">
        <DescriptionBox>
          Two-tone and multi-color icons are not available in the icon font. These icons are available as SVG assets.
        </DescriptionBox>

        <div className="iconGrid">
          {svgs.map((svg) => <IconBox name={svg.name} key={svg.name} path={svg.path} downloadable />)}
        </div>
      </Paragraph>

    </div>
  </div>
);

IconsPage.displayName = 'IconsPage';

export default IconsPage;
