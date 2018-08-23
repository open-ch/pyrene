import './styles/common.css';
import './styles/colors.css';
import './styles/fonts.css';

/* eslint-disable import/prefer-default-export */
import { default as Button } from './components/Button/Button';
import { default as Link } from './components/Link/Link';
import { default as Checkbox } from './components/FormElements/Checkbox/Checkbox';
import { default as RadioGroup } from './components/FormElements/RadioGroup/RadioGroup';
import { default as ShareDialog } from './components/Share/ShareDialog';
import { default as Modal } from './components/Modal/Modal';
import { default as ArrowButton } from './components/ArrowButton/ArrowButton';
import { default as TextField } from './components/FormElements/TextField/TextField';
import { default as TextArea } from './components/FormElements/TextArea/TextArea';
import { default as SingleSelect } from './components/SelectElements/SingleSelect/SingleSelect';
import { default as MultiSelect } from './components/SelectElements/MultiSelect/MultiSelect';
import { default as TabView } from './components/TabView/TabView';
import { default as Collapsible } from './components/Collapsible/Collapsible';
import { default as Container } from './components/Container/Container';
import { default as Banner } from './components/Banner/Banner';
import { default as Loader } from './components/Loader/Loader';
import { default as Form } from './components/FormElements/Form';
import { default as Tooltip } from './components/Tooltip/Tooltip';

const Components = {
  Button,
  Link,
  Checkbox,
  RadioGroup,
  ShareDialog,
  Modal,
  ArrowButton,
  TextField,
  TextArea,
  SingleSelect,
  MultiSelect,
  TabView,
  Collapsible,
  Container,
  Banner,
  Loader,
  Form,
  Tooltip
};

export {Button};
export {Link};
export {Checkbox};
export {RadioGroup};
export {ShareDialog};
export {Modal};
export {ArrowButton};
export {TextField};
export {TextArea};
export {SingleSelect};
export {MultiSelect};
export {TabView};
export {Collapsible};
export {Container};
export {Banner};
export {Loader};
export {Form};
export {Tooltip};

export default Components;