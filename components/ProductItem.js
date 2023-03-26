import Link from "next/link";
import { IconAddToCart } from "./globalIcons";
/* eslint-disable @next/next/no-img-element */
export default function ProductItem({ product }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          layout="responsive"
          priority={false}
          quality={100}
          className="rounded shadow object-cover h-64 w-full"
        />
      </Link>

      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>€{product.price}</p>
        <button className="primary-button" type="button">
          <IconAddToCart/>
        </button>
      </div>
    </div>
  );
}
