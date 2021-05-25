import React from 'react';
import styles from '../../../css/componentPage.css';
import Paragraph from '../../common/PageElements/Paragraph/Paragraph';
import ColorRow from '../../common/PageElements/FoundationElements/ColorRow/ColorRow';
import DescriptionBox from '../../common/PageElements/DescriptionBox/DescriptionBox';
import {
  primaryColors,
  neutralColors,
  semanticColors,
  informationColors,
  successColors,
  warningColors,
  dangerColors,
  outageColors,
  inactiveColors,
  categoricalColors,
  sequentialColors,
} from '../../data/foundationsData';

const categoricalText = (
  <div>
    Categorical (or qualitative) palettes are best when you want to distinguish discrete categories of data that do not have an inherent correlation.
    <br />
    <br />
    The colors of this palette should be applied in sequence strictly as described. The sequence is carefully curated to maximize contrast between neighboring colors to help with visual differentiation.
  </div>
);

const sequentialText = (
  <div>
    Sequential (or monochromatic) palettes are good for relationship charts and trend charts. Typically the darkest color denotes the largest values.
  </div>
);

const ColorsPage = () => (
  <div className={styles.page}>
    <div className={styles.header}>
      <div className={styles.title}>Colors</div>
      <div className={styles.description}>
        Maintaining consistent and engaging digital interfaces throughout Open Systems demands extended guidance around color usage. The following concepts are the foundation as we strive to achieve balance and harmony through our User Interface design.
        <br />
        <br />
        Our color palette contains primary, neutrals, interaction and status colors as well as color schemes used for data visualizations. They’ve been designed to work harmoniously with each other.
        {' '}
        <br />
        <br />
        The Neutral family is dominant in the default themes, making use of subtle shifts in value to help organize content into distinct zones.
      </div>
    </div>

    <div className={styles.topicContent}>
      <Paragraph title="Primary Colors">
        <DescriptionBox>
          The primary colors give our applications the characteristic look and feel. These colors enjoy priority. White plays an important role in structuring content and the overall impression. Blue is used as accent color while Dark is the main color for type.
        </DescriptionBox>

        <ColorRow
          rowData={primaryColors}
          rowSize="large"
          showInfo="fullInfo"
        />

      </Paragraph>

      <Paragraph title="Neutral Colors">
        <DescriptionBox>
          The neutral colours give a minimalist and clean impression. The neutral colours are mainly used for structuring and weighting the content. Typically they are used for text, icons and subtle backgrounds when we don&apos;t want to draw too much attention to a particular touchpoint or convey information such as inactive or disabled.
        </DescriptionBox>

        <ColorRow
          title="Neutral"
          description=""
          rowHeader={{
            colors: [{
              colorName: 'Primary Dark', name: 'neutral-500', darkFont: false, bordered: false,
            }],
            width: '30%',
          }}
          rowData={neutralColors}
          rowSize="small"
          showInfo="onlyTitles"
        />
      </Paragraph>

      <Paragraph title="Semantic Colors">
        <DescriptionBox>
          Semantic color helps users identify status, see actions, locate help, and understand next steps. The consistent use of color keeps cognitive load low and makes for a unified and engaging user experience.
        </DescriptionBox>

        <ColorRow
          title="Semantic Scheme"
          description=""
          rowHeader={{
            colors: [{
              colorName: 'Information', name: 'blue-500', darkFont: false, bordered: false,
            }],
            width: '200px',
          }}
          rowData={semanticColors}
          rowSize="small"
          showInfo="fullInfo"
        />

        <ColorRow
          title="Information"
          description=""
          rowHeader={{
            colors: [{
              colorName: 'Base', name: 'blue-500', darkFont: false, bordered: false,
            }],
            width: '150px',
          }}
          rowData={informationColors}
          rowSize="small"
          showInfo="onlyTitles"
        />

        <ColorRow
          columns={10}
          title="Success"
          description=""
          rowHeader={{
            colors: [{
              colorName: 'Base', name: 'green-600', darkFont: false, bordered: false,
            }],
            width: '150px',
          }}
          rowData={successColors}
          rowSize="small"
          showInfo="onlyTitles"
        />

        <ColorRow
          columns={10}
          title="Warning"
          description=""
          rowHeader={{
            colors: [{
              colorName: 'Base', name: 'orange-600', darkFont: false, bordered: false,
            }],
            width: '150px',
          }}
          rowData={warningColors}
          rowSize="small"
          showInfo="onlyTitles"
        />

        <ColorRow
          columns={10}
          title="Danger"
          description=""
          rowHeader={{
            colors: [{
              colorName: 'Base', name: 'red-600', darkFont: false, bordered: false,
            }],
            width: '150px',
          }}
          rowData={dangerColors}
          rowSize="small"
          showInfo="onlyTitles"
        />

        <ColorRow
          preColumns={1}
          columns={10}
          title="Outage"
          description=""
          rowHeader={{
            colors: [{
              colorName: 'Base', name: 'neutral-500', darkFont: false, bordered: false,
            }],
            width: '150px',
          }}
          rowData={outageColors}
          rowSize="small"
          showInfo="onlyTitles"
        />

        <ColorRow
          preColumns={1}
          columns={10}
          title="Inactive"
          description=""
          rowHeader={{
            colors: [{
              colorName: 'Base', name: 'neutral-500', darkFont: false, bordered: false,
            }],
            width: '150px',
          }}
          rowData={inactiveColors}
          rowSize="small"
          showInfo="onlyTitles"
        />
      </Paragraph>

      <Paragraph title="Data Visualizations">
        <DescriptionBox>
          The color palette for data visualizations is a selected subset of the Pyrene Design Language color palette. It is designed to maximize accessibility and harmony within a page.
        </DescriptionBox>

        <ColorRow
          title="Categorical"
          description={categoricalText}
          rowHeader={{
            colors: [{
              colorName: 'Chart 1', name: 'chart-1', darkFont: false, bordered: false,
            }],
            width: '200px',
          }}
          rowData={categoricalColors}
          rowSize="small"
          showInfo="onlyTitles"
        />

        <ColorRow
          columns={10}
          title="Sequential"
          description={sequentialText}
          rowHeader={{
            colors: [{
              colorName: 'Chart 1', name: 'chart-1', darkFont: false, bordered: false,
            }],
            width: '200px',
          }}
          rowData={sequentialColors}
          rowSize="small"
          showInfo="onlyTitles"
        />
      </Paragraph>
    </div>
  </div>
);

ColorsPage.displayName = 'ColorsPage';

export default ColorsPage;
