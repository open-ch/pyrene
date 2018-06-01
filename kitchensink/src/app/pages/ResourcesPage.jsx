import React from 'react';
import '../../css/componentPage.css';
import Paragraph from '../common/PageElements/Paragraph/Paragraph';


const ResourcesPage = () => (
  <div className="page">
    <div className="header">
      <div styleName="title">Resources</div>
      <div styleName="description">
        <p>
          These downloadable zip files contain Adobe Photoshop, Adobe Illustrator and Sketchapp color swatches.
        </p><br />
        <p>
          Included in the zip file is a Read-Me document with instructions on how to install the .sketchpalette in Sketch.
        </p><br />
        <p>
          For more information about brand colors see Colors in Foundations.
        </p>
      </div>
    </div>

    <div className="topicContent">
      <Paragraph title={'Adobe Photoshop and Illustrator'}>

      </Paragraph>

      <Paragraph title={'Sketch App'}>

      </Paragraph>
    </div>
  </div>
);

ResourcesPage.displayName = 'ResourcesPage';

ResourcesPage.propTypes = {
};

ResourcesPage.defaultProps = {
};

export default ResourcesPage;
