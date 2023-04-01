import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import MainScreen from '../../components/MainScreen';
import ErrorMessage from '../../components/ErrorMesage/ErrorMessage';
import Loading from '../../components/Loading/Loading';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../redux/actions/userActions';

const RegisterScreen = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  // const [picMessage, setPicMessage] = useState(null);
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userInfo) {
      navigate('/mynotes');
    } 
  }, [userInfo])

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match")
    } else {
      setMessage(null);
      dispatch(register(name, email, password, pic));
      // try {
      //   setLoading(true);
      //   const config = {
      //     headers: {
      //       "Content-type": "application/json"
      //     }
      //   };

      //   const { data } = await axios.post(
      //     "/api/users",
      //     {
      //       name,
      //       pic,
      //       email,
      //       password
      //     },
      //     config
      //   );

      //   localStorage.setItem('userInfo', JSON.stringify(data))
      // } catch (error) {
      //   setError(error.response.data.message);
      // } finally {
      //   setLoading(false)
      // }
    }

  }

  return (
    <MainScreen title="REGISTER">
      <div className='loginContainer'>
        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
        {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>
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

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </Form.Group>


          {/* <Form.Group className="mb-3" controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              placeholder="Upload Profile Picture"
            />
          </Form.Group> */}

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

export default RegisterScreen