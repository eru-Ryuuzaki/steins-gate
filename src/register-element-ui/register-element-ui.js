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
  DropdownItem
} from 'element-ui'
import ElScrollbar from 'element-ui/lib/scrollbar'
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
  DropdownItem
]
export default function (app) {
  for (const component of components) {
    app.component(component.name, component)
  }
}
