/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-named-default */

import './styles/common.css';
import './styles/colors.css';
import './styles/fonts.css';

// Sort alphabetically to find stuff easily
import { default as Banner } from './components/Banner/Banner';
import { default as Button } from './components/Button/Button';

import { default as Checkbox } from './components/Checkbox/Checkbox';
import { default as Collapsible } from './components/Collapsible/Collapsible';
import { default as Container } from './components/Container/Container';

import { default as Filter } from './components/Filter/Filter';
import { default as Form } from './components/Form/Form';

import { default as Link } from './components/Link/Link';
import { default as Loader } from './components/Loader/Loader';

import { default as Modal } from './components/Modal/Modal';
import { default as MultiSelect } from './components/SelectElements/MultiSelect/MultiSelect';

import { default as Popover } from './components/Popover/Popover';

import { default as RadioGroup } from './components/RadioGroup/RadioGroup';

import { default as ShareDialog } from './components/Share/ShareDialog';
import { default as SingleSelect } from './components/SelectElements/SingleSelect/SingleSelect';
import { default as Stepper } from './components/Stepper/Stepper';

import { default as Table } from './components/Table/Table';
import { default as TabView } from './components/TabView/TabView';
import { default as TextArea } from './components/TextArea/TextArea';
import { default as TextField } from './components/TextField/TextField';
import { default as Tooltip } from './components/Tooltip/Tooltip';
import { default as TreeTable } from './components/TreeTable/TreeTable';

import { default as CalendarDateSelector } from './components/CalendarDateSelector/CalendarDateSelector';


// Sort alphabetically to find stuff easily
const Components = {
  Banner,
  Button,
  CalendarDateSelector,
  Checkbox,
  Collapsible,
  Container,
  Filter,
  Form,
  Link,
  Loader,
  Modal,
  MultiSelect,
  Popover,
  RadioGroup,
  ShareDialog,
  SingleSelect,
  Stepper,
  Table,
  TabView,
  TextArea,
  TextField,
  Tooltip,
  TreeTable,
};

// Sort alphabetically to find stuff easily
export { Banner };
export { Button };
export { CalendarDateSelector };
export { Checkbox };
export { Collapsible };
export { Container };
export { Filter };
export { Form };
export { Link };
export { Loader };
export { Modal };
export { MultiSelect };
export { Popover };
export { RadioGroup };
export { ShareDialog };
export { SingleSelect };
export { Stepper };
export { Table };
export { TabView };
export { TextArea };
export { TextField };
export { Tooltip };
export { TreeTable };

export default Components;
