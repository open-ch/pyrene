/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-named-default */

import './styles/common.css';
import './styles/colors.css';
import './styles/fonts.css';

// Sort alphabetically to find stuff easily
import { default as ArrowButton } from './components/ArrowButton/ArrowButton';

import { default as Banner } from './components/Banner/Banner';
import { default as Button } from './components/Button/Button';

import { default as Checkbox } from './components/FormElements/Checkbox/Checkbox';
import { default as Collapsible } from './components/Collapsible/Collapsible';
import { default as Container } from './components/Container/Container';

import { default as Link } from './components/Link/Link';
import { default as Loader } from './components/Loader/Loader';

import { default as Modal } from './components/Modal/Modal';
import { default as MultiSelect } from './components/SelectElements/MultiSelect/MultiSelect';

import { default as Popover } from './components/Popover/Popover';

import { default as RadioGroup } from './components/FormElements/RadioGroup/RadioGroup';

import { default as ShareDialog } from './components/Share/ShareDialog';
import { default as SingleSelect } from './components/SelectElements/SingleSelect/SingleSelect';

import { default as Table } from './components/Table/Table';
import { default as TabView } from './components/TabView/TabView';
import { default as TextArea } from './components/FormElements/TextArea/TextArea';
import { default as TextField } from './components/FormElements/TextField/TextField';
import { default as Tooltip } from './components/Tooltip/Tooltip';

import { default as withFormLogic } from './components/FormElements/Form';


// Sort alphabetically to find stuff easily
const Components = {
  ArrowButton,
  Banner,
  Button,
  Checkbox,
  Collapsible,
  Container,
  Link,
  Loader,
  Modal,
  MultiSelect,
  Popover,
  RadioGroup,
  ShareDialog,
  SingleSelect,
  Table,
  TabView,
  TextArea,
  TextField,
  Tooltip,
  withFormLogic,
};

// Sort alphabetically to find stuff easily
export { Button };
export { Link };
export { Checkbox };
export { RadioGroup };
export { ShareDialog };
export { Modal };
export { ArrowButton };
export { TextField };
export { TextArea };
export { SingleSelect };
export { MultiSelect };
export { TabView };
export { Collapsible };
export { Container };
export { Banner };
export { Loader };
export { withFormLogic };
export { Tooltip };
export { Table };
export { Popover };

export default Components;
