import { Store } from "@/utils/Store";
import Head from "next/head";
import Link from "next/link";
import React, { use, useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { signOut, useSession } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import { Menu } from "@headlessui/react";
import DropdownLink from "./DropdownLink";
import Cookies from "js-cookie";


const Layout = ({ title, children }) => {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () =>{
    Cookies.remove('cart');
    dispatch({type: 'CART_RESET'})
signOut({callbackUrl:'/login'})
  }
  return (
    <>
      <Head>
        <title>{title ? title + " - MikShop" : "Mikshop"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1}></ToastContainer>
      <div
        className="flex min-h-screen flex-col justify-between"
        style={{ backgroundColor: "#DADCDD" }}
      >
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/">
              <h1
                className="text-lg font-bold"
                style={{
                  fontSize: 30,
                  textShadow: "0.1em 0.1em 0.2em grey",
                  color: "white",
                }}
              >
                MikShop
              </h1>
            </Link>
            <div>
              <Link href="/cart" className="p-2">
                Cart
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              {status === "loading" ? (
                "Loading"
              ) : session?.user ? (
                <Menu
                  as="div"
                  className="relative inline-block"
                  style={{ listStyle: "none" }}
                >
                  <Menu.Button
                    style={{ listStyle: "none" }}
                    className="text-black-600"
                  >
                    {session.user.name}
                    <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                  
                     
                      {session.user.isAdmin && (
                        <Menu.Item>
                          <DropdownLink
                            className="dropdown-link"
                            href="/admin/dashboard"
                          >
                            Admin Dashboard
                          </DropdownLink>
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        <a className="dropdown-link" href="#"
                        onClick={logoutClickHandler}>
                          Logout
                        </a>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu.Button>
                </Menu>
              ) : (
                <Link href="/login">Login</Link>
              )}
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
