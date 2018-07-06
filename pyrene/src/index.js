import './styles/common.css';
import './styles/colors.css';
import './styles/fonts.css';

/* eslint-disable import/prefer-default-export */
import { default as Button } from './components/Button/Button';
import { default as Link } from './components/Link/Link';
import { default as Checkbox } from './components/FormElements/Checkbox/Checkbox';
import { default as RadioSelection } from './components/FormElements/RadioSelection/RadioSelection';
import { default as ShareDialog } from './components/Share/ShareDialog';
import { default as Modal } from './components/Modal/Modal';
import { default as ArrowButton } from './components/ArrowButton/ArrowButton';
import { default as TextField } from './components/FormElements/TextField/TextField';
import { default as TextArea } from './components/FormElements/TextArea/TextArea';
import { default as SingleSelect } from './components/SelectElements/SingleSelect/SingleSelect';
import { default as MultiSelect } from './components/SelectElements/MultiSelect/MultiSelect';
import { default as Banner } from './components/Banner/Banner';
import { default as Loader } from './components/Loader/Loader';

const Components = {
  Button,
  Link,
  Checkbox,
  RadioSelection,
  ShareDialog,
  Modal,
  ArrowButton,
  TextField,
  TextArea,
  SingleSelect,
  MultiSelect,
  Banner,
  Loader,
};

export {Button};
export {Link};
export {Checkbox};
export {RadioSelection};
export {ShareDialog};
export {Modal};
export {ArrowButton};
export {TextField};
export {TextArea};
export {SingleSelect};
export {MultiSelect};
export {Banner};
export {Loader};

export default Components;