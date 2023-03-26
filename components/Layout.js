import { Store } from "@/utils/Store";
import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const Layout = ({ title, children }) => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  return (
    <>
      <Head>
        <title>{title ? title + " - MikShop" : "Mikshop"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between" style={{backgroundColor:'#DADCDD'}}>
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/">
              <h1 className="text-lg font-bold" style={{fontSize:30,textShadow:'0.1em 0.1em 0.2em grey',color:'white'}}>MikShop</h1>
            </Link>
            <div>
              <Link href="/cart" className="p-2">
                <BtnCart>Cart</BtnCart>
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              <Link href="/login">
                <BtnLogin>Login</BtnLogin>
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>

        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright © 2023 MikShop</p>
        </footer>
      </div>
    </>
  );
};

export default Layout;

const BtnLogin = styled.button`
  color: #090909;
  padding: 0.7em 1.7em;
  font-size: 10px;
  border-radius: 0.5em;
  background: #e8e8e8;
  border: 1px solid #e8e8e8;
  transition: all 0.3s;
  box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;

  &:hover {
    border: 1px solid white;
  }
  &:active {
    box-shadow: 4px 4px 12px #c5c5c5, -4px -4px 12px #ffffff;
  }
`;

const BtnCart = styled.button`
 color: #090909;
  padding: 0.7em 1.7em;
  font-size: 10.5px;
  border-radius: 0.5em;
  background: #e8e8e8;
  border: 1px solid #e8e8e8;
  transition: all 0.3s;
  box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;

  &:hover {
    border: 1px solid white;
  }
  &:active {
    box-shadow: 4px 4px 12px #c5c5c5, -4px -4px 12px #ffffff;
  }`

