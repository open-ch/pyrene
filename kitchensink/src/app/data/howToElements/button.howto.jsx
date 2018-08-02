import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container } from 'pyrene';
import Paragraph from '../../common/PageElements/Paragraph/Paragraph';
import DisplayBox from './DisplayBox';
import DescriptionBox from '../../common/PageElements/DescriptionBox/DescriptionBox';
import {ContentFiller} from '../propsData';


const ButtonHTU = props => (
  <Paragraph title={'How to use'} large>
    <Paragraph title={'Icon Usage'}>
      <DescriptionBox>
        Buttons can use icon to emphasise the functionality or convey more meaning to it.
      </DescriptionBox>
      <DisplayBox>
        <Button icon={'share'} label={'Share'} type={'primary'} />
        <Button icon={'errorOutline'} label={'Delete'} type={'danger'} />
        <Button icon={'filter'} label={'Filter'} type={'secondary'} />
        <Button icon={'search'} label={'Search'} type={'ghost'} />
        <Button icon={'warning'} label={'Admin'} type={'admin'} />
      </DisplayBox>
    </Paragraph>
    <Paragraph title={'Admin Button'} >
      <DescriptionBox>
        Admin buttons have a different visual style and are used, when a certain action or view is accessible for MC Engineers only.
      </DescriptionBox>
      <DisplayBox width={286}>

        <Container
          title={'network interfaces'}
          adminAction={{label: 'Admin', action: () => (console.log('wowowow'))}}
          renderCallback={() =>
            <ContentFiller
              height={250}
            />}
        />

      </DisplayBox>
    </Paragraph>
  </Paragraph>
);


ButtonHTU.displayName = 'ButtonHT';

ButtonHTU.defaultProps = {};

ButtonHTU.propTypes = {};

export default ButtonHTU;