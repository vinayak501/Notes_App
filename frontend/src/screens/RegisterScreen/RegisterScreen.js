import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import axios from "axios";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();
  const userRegister = useSelector(state=>state.userRegister);
  const {loading ,error , userInfo} = userRegister;

  useEffect(()=>{
    if(userInfo){
      navigate("/mynotes")
    }
  },[navigate,userInfo])

  const submitHandler = async (e)=>{
    e.preventDefault();
    if(password !== confirmpassword){
        setMessage('Password Do Not Match');
    }else{
        dispatch(register(name,email,password,pic));
    }
  }

  const postDetails = (pics) =>{
    if(!pic){
      setPicMessage("Please Select An Image");
    }
    setPicMessage(null);

    if(pics.type === 'image/jpeg'||pics.type === 'image/png'){
      const data = new FormData();
      data.append('file',pics)
      data.append('upload_preset','Notezipper')
      data.append('cloud_name','drfpkdz7h')
      fetch("https://api.cloudinary.com/v1_1/drfpkdz7h/image/upload",{
        method:"post",
        body:data,
      }).then((res)=>res.json()).then((data)=>setPic(data.url.toString())).catch((err)=>{console.log(err);});
    }else{
      return setPicMessage("Please Select An Image (jpeg/png)");
    }
  }

  return (
    <MainScreen title="REGISTER">
      <div className="loginContainer">
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      {loading && <Loading/>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail" style={{marginTop:"10px"}}>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" style={{marginTop:"10px"}}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" style={{marginTop:"10px"}}>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          {picMessage && <ErrorMessage variant="danger">{picMessage}</ErrorMessage>}
          <Form.Group controlId="pic" style={{marginTop:"10px"}}>
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              onChange={(e)=>postDetails(e.target.files[0])}
              type="file"
            />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ marginTop: "20px" }}>
            Submit
          </Button>
          <Row className="py-3">
            <Col>
              Already Have Account ?{" "}
              <Link to="/login" style={{ color: "blue" }}>
                Login
              </Link>
            </Col>
          </Row>
        </Form>
      </div>
    </MainScreen>
  );
};

export default RegisterScreen;
