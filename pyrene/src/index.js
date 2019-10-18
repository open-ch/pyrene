/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-named-default */

import 'resize-observer-polyfill/dist/ResizeObserver.global';

import './styles/common.css';
import './styles/colors.css';
import './styles/fonts.css';

// Sort alphabetically to find stuff easily
import { default as Badge } from './components/Badge/Badge';
import { default as Banner } from './components/Banner/Banner';
import { default as Button } from './components/Button/Button';
import { default as ButtonBar } from './components/ButtonBar/ButtonBar';

import { default as CalendarDateSelector } from './components/CalendarDateSelector/CalendarDateSelector';
import { default as Card } from './components/Card/Card';
import { default as Checkbox } from './components/Checkbox/Checkbox';
import { default as Collapsible } from './components/Collapsible/Collapsible';
import { default as Container } from './components/Container/Container';

import { default as Filter } from './components/Filter/Filter';
import { default as Form } from './components/Form/Form';

import { default as Icon } from './components/Icon/Icon';
import { default as ActionBar } from './components/ActionBar/ActionBar';
import { default as IconButton } from './components/IconButton/IconButton';

import { default as Heading } from './components/Heading/Heading';

import { default as KeyValueTable } from './components/KeyValueTable/KeyValueTable';

import { default as Link } from './components/Link/Link';
import { default as Loader } from './components/Loader/Loader';

import { default as Modal } from './components/Modal/Modal';
import { default as MultiSelect } from './components/MultiSelect/MultiSelect';

import { default as Paragraph } from './components/Paragraph/Paragraph';
import { default as Pill } from './components/Pill/Pill';
import { default as Popover } from './components/Popover/Popover';

import { default as RadioGroup } from './components/RadioGroup/RadioGroup';
import { default as RadioPopover } from './components/RadioPopover/RadioPopover';

import { default as ShareDialog } from './components/ShareDialog/ShareDialog';
import { default as SimpleTable } from './components/SimpleTable/SimpleTable';
import { default as SingleSelect } from './components/SingleSelect/SingleSelect';
import { default as Spacer } from './components/Spacer/Spacer';
import { default as Stepper } from './components/Stepper/Stepper';

import { default as Table } from './components/Table/Table';
import { default as TabView } from './components/TabView/TabView';
import { default as TextArea } from './components/TextArea/TextArea';
import { default as TextField } from './components/TextField/TextField';
import { default as TimeRangeSelector } from './components/TimeRangeSelector/TimeRangeSelector';
import { default as Tooltip } from './components/Tooltip/Tooltip';
import { default as TreeTable } from './components/TreeTable/TreeTable';

// Sort alphabetically to find stuff easily
const Components = {
  ActionBar,
  Badge,
  Banner,
  Button,
  ButtonBar,
  CalendarDateSelector,
  Card,
  Checkbox,
  Collapsible,
  Container,
  Filter,
  Form,
  Icon,
  IconButton,
  Heading,
  KeyValueTable,
  Link,
  Loader,
  Modal,
  MultiSelect,
  Paragraph,
  Pill,
  Popover,
  RadioGroup,
  RadioPopover,
  ShareDialog,
  SimpleTable,
  SingleSelect,
  Spacer,
  Stepper,
  Table,
  TabView,
  TextArea,
  TextField,
  TimeRangeSelector,
  Tooltip,
  TreeTable,
};

// Sort alphabetically to find stuff easily
export { ActionBar };
export { Badge };
export { Banner };
export { Button };
export { ButtonBar };
export { CalendarDateSelector };
export { Card };
export { Checkbox };
export { Collapsible };
export { Container };
export { Filter };
export { Form };
export { Icon };
export { IconButton };
export { Heading };
export { KeyValueTable };
export { Link };
export { Loader };
export { Modal };
export { MultiSelect };
export { Paragraph };
export { Pill };
export { Popover };
export { RadioGroup };
export { RadioPopover };
export { ShareDialog };
export { SimpleTable };
export { SingleSelect };
export { Stepper };
export { Spacer };
export { Table };
export { TabView };
export { TextArea };
export { TextField };
export { TimeRangeSelector };
export { Tooltip };
export { TreeTable };

export { createSimpleFilter, createDataFilter } from './components/Filter/Filter';

export default Components;
