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
  MenuItemGroup
} from 'element-ui'
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
  MenuItemGroup
]
export default function (app) {
  for (const component of components) {
    app.component(component.name, component)
  }
}
