/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-named-default */

import './styles/common.module.css';
import './styles/colors.module.css';
import './styles/fonts.module.css';

// Sort alphabetically to find stuff easily
import { default as Accordion } from './components/Accordion/Accordion';
import { default as ArrowPopover } from './components/ArrowPopover/ArrowPopover';

import { default as Badge } from './components/Badge/Badge';
import { default as Banner } from './components/Banner/Banner';
import { default as Button } from './components/Button/Button';
import { default as ButtonBar } from './components/ButtonBar/ButtonBar';

import { default as CalendarDateSelector } from './components/CalendarDateSelector/CalendarDateSelector';
import { default as Card } from './components/Card/Card';
import { default as Checkbox } from './components/Checkbox/Checkbox';
import { default as CheckboxPopover } from './components/CheckboxPopover/CheckboxPopover';

import { default as Collapsible } from './components/Collapsible/Collapsible';
import { default as Container } from './components/Container/Container';

import { default as DatePickerMultiple } from './components/DatePickerMultiple/DatePickerMultiple';
import { default as DatePickerRangeSelector } from './components/DatePickerRangeSelector/DatePickerRangeSelector';
import { default as DatePickerSingle } from './components/DatePickerSingle/DatePickerSingle';
import { default as DropdownButton } from './components/DropdownButton/DropdownButton';

import { default as Filter } from './components/Filter/Filter';
import { default as Form } from './components/Form/Form';

import { default as Icon } from './components/Icon/Icon';
import { default as ActionBar } from './components/ActionBar/ActionBar';
import { default as IconButton } from './components/IconButton/IconButton';

import { default as Heading } from './components/Heading/Heading';

import { default as KeyValueTable } from './components/KeyValueTable/KeyValueTable';

import { default as LabelAndValue } from './components/LabelAndValue/LabelAndValue';

import { default as Link } from './components/Link/Link';
import { default as Loader } from './components/Loader/Loader';

import { default as Modal } from './components/Modal/Modal';
import { default as MultiSelect } from './components/MultiSelect/MultiSelect';

import { default as Paragraph } from './components/Paragraph/Paragraph';
import { default as Pill } from './components/Pill/Pill';
import { default as Popover } from './components/Popover/Popover';

import { default as SearchFinder } from './components/SearchFinder/SearchFinder';

import { default as RadioGroup } from './components/RadioGroup/RadioGroup';
import { default as RadioButton } from './components/RadioButton/RadioButton';
import { default as RadioPopover } from './components/RadioPopover/RadioPopover';

import { default as Search } from './components/Search/Search';
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
import { default as ToggleButtonGroup } from './components/ToggleButtonGroup/ToggleButtonGroup';
import { default as Tooltip } from './components/Tooltip/Tooltip';
import { default as TreeTable } from './components/TreeTable/TreeTable';

import { SingleSelectOption as _SingleSelectOption, SingleSelectGroupedOption as _SingleSelectGroupedOption } from './components/SingleSelect/SingleSelectTypes';

// Sort alphabetically to find stuff easily
const Components = {
  Accordion,
  ActionBar,
  ArrowPopover,
  Badge,
  Banner,
  Button,
  ButtonBar,
  CalendarDateSelector,
  Card,
  Checkbox,
  CheckboxPopover,
  Collapsible,
  Container,
  DatePickerMultiple,
  DatePickerRangeSelector,
  DatePickerSingle,
  DropdownButton,
  Filter,
  Form,
  Icon,
  IconButton,
  Heading,
  KeyValueTable,
  LabelAndValue,
  Link,
  Loader,
  Modal,
  MultiSelect,
  Paragraph,
  Pill,
  Popover,
  RadioButton,
  RadioGroup,
  RadioPopover,
  Search,
  SearchFinder,
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
  ToggleButtonGroup,
  Tooltip,
  TreeTable,
};

// Sort alphabetically to find stuff easily
export { Accordion };
export { ActionBar };
export { ArrowPopover };
export { Badge };
export { Banner };
export { Button };
export { ButtonBar };
export { CalendarDateSelector };
export { Card };
export { Checkbox };
export { Collapsible };
export { Container };
export { DatePickerMultiple };
export { DatePickerRangeSelector };
export { DatePickerSingle };
export { DropdownButton };
export { Filter };
export { Form };
export { Icon };
export { IconButton };
export { Heading };
export { KeyValueTable };
export { LabelAndValue };
export { Link };
export { Loader };
export { Modal };
export { MultiSelect };
export { Paragraph };
export { Pill };
export { Popover };
export { RadioButton };
export { RadioGroup };
export { RadioPopover };
export { Search };
export { SearchFinder };
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
export { ToggleButtonGroup };
export { Tooltip };
export { TreeTable };

export { createSimpleFilter, createDataFilter } from './components/Filter/Filter';

export type SingleSelectGroupedOption<ValueType> = _SingleSelectGroupedOption<ValueType>;
export type SingleSelectOption<ValueType> = _SingleSelectOption<ValueType>;

export { default as colorConstants } from './styles/colorConstants';

export default Components;
