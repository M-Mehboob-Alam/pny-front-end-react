import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';


const ViewProduct = () => {

  const {id}= useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
 
  const [formValue, setFormValue] = useState({ _id: 0,
    name: "",
    description: "",
    price: 0,
    sale_price: 0,
    createdAt: "",
    updatedAt: "",});
  

    const getSingleProduct = async() =>{
      const response = await axios.get(`http://localhost:8000/api/v1/get/a/single/product/${id}`);
      const  data = await response.data.data;
      setFormValue({
        name: data.name,
        description: data.description,
        price: data.price,
        sale_price: data.sale_price,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      })
  }
  // console.log(formValue.name);
 
  
  const changeFormHandler = (e) =>{
    const {name, value} = e.target;
    setFormValue(previousFormValues => {
     return {
      ...previousFormValues, [name] : e.target.value,
     }
    });
  }
  function submitFormHandler(e){
    e.preventDefault();
    // console.log(formValue);
    // Using Fetch API
    // console.log('calling api');
    fetch(`http://localhost:8000/api/v1/update/a/single/product/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
         name: formValue.name,
         price: formValue.price,
         sale_price:formValue.sale_price,
         description:formValue.description,
      }),
      headers: {
         'Content-type': 'application/json',
      },
   })
      .then((res) =>  {
        // console.log(res);
        console.log('product updated successful!');
        // localStorage.setItem("user", formValue);
        navigate(`/products/${id}`);
        toast.success('product updated successful!');
        // toast.success('Welcome to E-commerce');
    })     
      .catch((err) => {
         console.log(err.message);
         toast.error('something went wrong');
      });
       console.log('form submitted');
     
  }

  useEffect(()=>{
    getSingleProduct();
  },[id]);
  return (
    <div>
        <Form onSubmit={submitFormHandler}>
      <Form.Group className="mb-3" controlId="formBasicprice">
        <Form.Label>Product Name</Form.Label>
        <input type="text" placeholder="Product Name" required value={formValue.name} name="name" onChange={changeFormHandler}  />
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicprice">
        <Form.Label>Price</Form.Label>
        <input type="number"  name="price" onChange={changeFormHandler} required value={formValue.price} placeholder="price" />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicsale_price">
        <Form.Label>Sale Price</Form.Label>
        <input type="number" name="sale_price" onChange={changeFormHandler} required value={formValue.sale_price} placeholder="sale price" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicsale_price">
        <Form.Label>description</Form.Label>
        <input type="text" name="description" onChange={changeFormHandler} required value={formValue.description} placeholder="description" />
      </Form.Group>
      <p>created At {formValue.createdAt}</p>
      <p>Updated At {formValue.updatedAt}</p>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  )
}

export default ViewProduct