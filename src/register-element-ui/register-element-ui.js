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
  Row
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
  Row
]
export default function (app) {
  for (const component of components) {
    app.component(component.name, component)
  }
}
