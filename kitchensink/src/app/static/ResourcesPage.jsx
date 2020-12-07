import React from 'react';
import '../../css/componentPage.css';
import Paragraph from '../common/PageElements/Paragraph/Paragraph';
import DownloadButton from '../common/PageElements/DownloadButton/DownloadButton';
import downloadResourcePath from '../../images/download.svg';


const ResourcesPage = () => (
  <div styleName="page">
    <div className="header">
      <div styleName="title">Resources (Dummy Page)</div>
      <div styleName="description">
        <p>
          These downloadable zip files contain Adobe Photoshop, Adobe Illustrator and Sketchapp color swatches.
        </p>
        <br />
        <p>
          Included in the zip file is a Read-Me document with instructions on how to install the .sketchpalette in Sketch.
        </p>
        <br />
        <p>
          For more information about brand colors see Colors in Foundations.
        </p>
      </div>
    </div>

    <div className="topicContent">
      <Paragraph title="Adobe Photoshop and Illustrator">
        <DownloadButton path={downloadResourcePath} name="Download Arrow.svg" />
      </Paragraph>

      <Paragraph title="Sketch App">
        <DownloadButton path={downloadResourcePath} name="Download Arrow.svg" />
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
