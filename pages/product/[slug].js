import Layout from "@/components/Layout";
import { Store } from "@/utils/Store";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from 'next/image';
import { useContext } from "react";
import { AddToCart, Return } from "@/components/globalIcons";
import styled from "styled-components";
import db from "@/utils/db";
import Product from "@/models/Product";
import axios from "axios";



export default function ProductScreen(props) {
  const {product} = props
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  if (!product) {
    return <Layout title="Product not found">Product not found</Layout>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);


    if (data.countInStock < quantity) {
      alert("🥲Sorry but this product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
  };
  return (
    <Layout title={product.name}>
      <button className="py-2">
        <Link href="/"><Return/></Link>
      </button>

      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2" >
          <Image
            src={product.image}
            alt={product.name}
            layout="responsive"
            priority={false}
            quality={100}
            width={640}
            height={640}
            style={{border:45}}
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <NameProduct>{product.name}</NameProduct>
            </li>
            
            <CategoryProduct>Category: {product.category}</CategoryProduct>
            <hr></hr>
            <BrandProduct>Brand:{product.brand}</BrandProduct>
            <li>
            <hr></hr>
              {product.rating} of {product.numReviews} Reviews
            </li>
            <hr></hr>
            <DescriptionProduct>Description: {product.description}</DescriptionProduct>
          </ul>
        </div>

        <div className="card p-5">
          <div className="mb-2 flex justify-between">
            <div>Price</div>
            <div>€{product.price}</div>
          </div>
          <div className="mb-2 flex justify-between">
            <div>Status</div>
            <div>{product.countInStock > 0 ? "In Stock ✅"  : "Unavailable ❌"}</div>
          </div>
          <button className="primary-button w-full" onClick={addToCartHandler} style={{borderRadius:50}} >
            Add To Cart
          </button>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context){
  const {params} = context;
  const {slug} = params;

  await db.connect();
  const product = await Product.findOne({slug}).lean()
  await db.disconnect();
  return{
    props:{
      product: product ? db.convertDocToObj(product):null
    }
  }
}

const NameProduct = styled.h1`
font-size:2.5em;
font-family:Arial;
font-weight:bold;
`
const CategoryProduct = styled.li`
font-size:1.2em ;
`
const BrandProduct = styled.li``

const DescriptionProduct = styled.li`
font-size: 1.2em;
`
