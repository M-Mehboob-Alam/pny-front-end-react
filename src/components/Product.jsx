import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Product = () => {
  const [products, setProducts] = useState([]);
  const param = useParams();
  const navigate = useNavigate();
  // function updateHandler(id){
  //       navigate(`/${param.id}`);
  // }

  function deleteSingleProduct(id){
    console.log(id);
    axios.delete(`http://localhost:8000/api/v1/delete/a/single/product/${id}`)
    .then(function (response) {
      const data =  response;
     toast.success('product has been delete successful!');
     getAllProducts();
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      toast.error('product is not deleted');
    })
    .finally(function () {
      // always executed
      // console.log('always executed');
    });
    
  }
 const getAllProducts = async () => {
    console.log('calling api');
    axios.get('http://localhost:8000/api/v1/get/all/products')
    .then(function (response) {
      // handle success
      // toast.warn('products is loading');
      const data =  response.data.data;
      setProducts(data);
      // toast.success('loaded successful!')
      // console.log(data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
      // console.log('always executed');
    });
  
  //  const response =  await fetch('http://localhost:8000/api/v1/get/all/products');
  //  const data = await response.json();
  //  setProducts(data.data);
  //  console.log(data);
  }

  const [search,setSearch] = useState('');
  function searchandler(getData){
    // const {q} = e.target.value;
    setSearch(getData)
    // console.log(getData);
    // setSearch(q);
    if (search ==='') {
      console.log('please enter product name');
    }else{

      axios.get(`http://localhost:8000/api/v1/search/product/${search}`)
      .then((res)=>{
        const response = res.data.data;
        setProducts(response);
      }).catch((error)=>{
        getAllProducts();
      });
    }
  }

  useEffect(()=>{
    getAllProducts();
  }, []);
  return (
    <div>
      <br/>
      <input type="search" name='search' value={search} onInput={(e)=>searchandler(e.target.value)} required  placeholder='Search Products...'/>
      <br/>
      <h1>View Products</h1>
      {
        products.length > 0 ? 
        (products.map((product, index)=> (
          <div className="container" key={index}>            
            <h6>{product.name}</h6>
            <h6>{product.price}</h6>
            <h6>{product.sale_price}</h6>
            <p>{product.description}</p>
              <Link to={`/products/${product._id}`} >Update</Link>
              <button onClick={()=> deleteSingleProduct(product._id)}> Delete </button>
            <p>{product.createdAt}</p>
            <p>{product.updatedAt}</p>

          </div>
        ))) : 
        (<h1>No products fournd</h1>)
      }
      
    </div>

  )
}

export default Product