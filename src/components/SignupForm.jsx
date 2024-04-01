import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignupForm() {
  const navigate = useNavigate();
  const [formValue , setFormValue] = useState({
    fullName:'',
    email:'',
    password:''
  });

  const formHandler =(e)=> {
    // console.log(e);
    const {name} = e.target;
    // console.log(e.target.value);
    setFormValue(previousFormData =>{
      return {
        ...previousFormData,
        [name]: e.target.value,
      }
    });
    // console.log(formValue);
  }
  function submitFormHandler(e){
    e.preventDefault();
    // console.log(formValue);
    // Using Fetch API
    console.log('calling api');
    fetch('http://localhost:8000/api/v1/register/user', {
      method: 'POST',
      body: JSON.stringify({
         fullName: formValue.fullName,
         email: formValue.email,
         password:formValue.password,
      }),
      headers: {
         'Content-type': 'application/json',
      },
   })
      .then((res) =>  {
        // console.log(res);
        console.log('registered successful!');
        localStorage.setItem("user", formValue);
        navigate('/');
        toast.success('account registered successful');
        toast.success('Welcome to E-commerce');
    })     
      .catch((err) => {
         console.log(err.message);
         toast.error('something went wrong');
      });
       console.log('form submitted');
     
  }
  return (
    <Form onSubmit={submitFormHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Full Name</Form.Label>
        <input type="text" placeholder="Enter Full Name" required value={formValue.fullName} name="fullName" onChange={formHandler}  />
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <input type="email"  name="email" onChange={formHandler} required value={formValue.email} placeholder="Enter email" />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <input type="password" name="password" onChange={formHandler} required value={formValue.password} placeholder="Password" />
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default SignupForm;