import { LoginForm } from '../../components';
import { Row, Col } from 'antd';

export function Login() {
  return (
    <Row>
      <Col md={12} span={24} offset={6}>
        <LoginForm />
      </Col>
    </Row>
  );
}
