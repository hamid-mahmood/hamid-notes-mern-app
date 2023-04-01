import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import MainScreen from '../../components/MainScreen';
import './LoginScreen.css'
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMesage/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/userActions';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate('/mynotes');
    }
  }, [userInfo]);
  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <MainScreen title="LOGIN">
      <div className='loginContainer'>
        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Row className="py-3">
            <Col>
              New Customer ? <Link to="/register">Register Here</Link>
            </Col>
          </Row>
        </Form>
      </div>
    </MainScreen>
  )
}

export default LoginScreen