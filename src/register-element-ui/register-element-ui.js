import {
  Button,
  Select,
  Input,
  Form,
  FormItem,
  Card,
  Checkbox,
  Link,
  Col,
  Row,
  Aside,
  Container,
  Header,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Breadcrumb,
  BreadcrumbItem,
  Tooltip,
  Popover,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  TableColumn,
  Option,
  Pagination,
  Cascader,
  Image,
  Switch,
  DatePicker,
  MessageBox,
  Message,
  Steps,
  Step,
  Dialog
} from 'element-ui'
import ElScrollbar from 'element-ui/lib/scrollbar'
import Vue from 'vue'
const components = [
  Button,
  Select,
  Input,
  Form,
  FormItem,
  Card,
  Checkbox,
  Link,
  Col,
  Row,
  Aside,
  Container,
  Header,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Breadcrumb,
  BreadcrumbItem,
  Tooltip,
  Popover,
  ElScrollbar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  TableColumn,
  Option,
  Pagination,
  Cascader,
  Image,
  Switch,
  DatePicker,
  Steps,
  Step,
  Dialog
]
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
export default function (app) {
  for (const component of components) {
    app.component(component.name, component)
  }
}
