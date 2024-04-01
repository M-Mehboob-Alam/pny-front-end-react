import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formValue , setFormValue] = useState({
    fullName:'',
    email:'',
    password:'',
    description:'',
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
    fetch('http://localhost:8000/api/v1/create/new/product', {
      method: 'POST',
      body: JSON.stringify({
         name: formValue.fullName,
         price: formValue.email,
         sale_price:formValue.password,
         description:formValue.description,
      }),
      headers: {
         'Content-type': 'application/json',
      },
   })
      .then((res) =>  {
        // console.log(res);
        console.log('product uploaded successful!');
        // localStorage.setItem("user", formValue);
        navigate('/products');
        toast.success('product uploaded successful!');
        // toast.success('Welcome to E-commerce');
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
        <Form.Label>Product Name</Form.Label>
        <input type="text" placeholder="Product Name" required value={formValue.fullName} name="fullName" onChange={formHandler}  />
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Price</Form.Label>
        <input type="number"  name="email" onChange={formHandler} required value={formValue.email} placeholder="price" />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Sale Price</Form.Label>
        <input type="number" name="password" onChange={formHandler} required value={formValue.password} placeholder="sale price" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>description</Form.Label>
        <input type="text" name="description" onChange={formHandler} required value={formValue.description} placeholder="description" />
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default AddProduct