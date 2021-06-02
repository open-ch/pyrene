import React from 'react';
import styles from '../../../css/componentPage.css';
import Paragraph from '../../common/PageElements/Paragraph/Paragraph';
import DescriptionBox from '../../common/PageElements/DescriptionBox/DescriptionBox';
import fontTypes from '../../data/typography';

const TypographyPage = () => (
  <div className={styles.page}>
    <div className={styles.header}>
      <div className={styles.title}>Typography</div>
      <div className={styles.description}>
        Typography is at the core of Open Systems Product Design Language. We have chosen
        {' '}
        <b>FiraGo</b>
        {' '}
        as our primary font. It was designed to be incredibly versatile with lots of range in terms of tone and playfulness. It can be quirky and expressive when it needs to be, or neutral when the situation calls for something a bit more serious. On rare occasions, we also use
        {' '}
        <b>Fira Sans Condensed</b>
        {' '}
        for selected elements.
      </div>
    </div>

    <div className={styles.topicContent}>
      <Paragraph title="Font stack">
        <DescriptionBox>
          For web projects, the best format is our icon font.
          Explore or search for an icon and copy the reference by clicking on a icon to use it in your project.
        </DescriptionBox>
        <div className={styles.fontStack}>
          FiraGo
          <br />
          <span className={styles.firaCondensed}>Fira Sans Condensed</span>
        </div>
        <div className={styles.footnote}>
          You can download FiraGo and Fira Sans Condensed as zip
          {' '}
          <a className={styles.link} href="../../../fonts/Pyrene_Font_Kit_v1.0.zip" download="fonts.zip">here</a>
          .
        </div>

      </Paragraph>

      <Paragraph title="Styles">
        <DescriptionBox>
          Consistent typography and attention to logical hierarchies ensure that UI elements are clear and easy to recognise when scanning the page. Text sizes, styles and layouts have been chosen to balance content and UI.
        </DescriptionBox>
        {fontTypes.map((style) => (
          <div key={style.title}>
            <div className={styles.subtitle}>
              {style.title}
            </div>
            {style.examples.map((font) => (
              <div className={styles.twoColumns} key={font.heading}>
                <div style={{ ...font.style, width: 200, whiteSpace: 'pre-line' }}>
                  {font.heading}
                </div>
                <div className={styles.styleText}>
                  {font.styleText}
                </div>
              </div>
            ))}
          </div>
        ))}
      </Paragraph>

    </div>
  </div>
);

TypographyPage.displayName = 'TypographyPage';

export default TypographyPage;
