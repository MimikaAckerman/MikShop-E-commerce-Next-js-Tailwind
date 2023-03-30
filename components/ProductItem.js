import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
export default function ProductItem({ product }) {
  return (
    <div className="card">
      
        <img
          src={product.image}
          alt={product.name}
          layout="responsive"
          priority={false}
          quality={100}
          className="rounded shadow object-cover h-64 w-full"
        />
      

      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>€{product.price}</p>
        <Link href={`/product/${product.slug}`}>
        <button className="primary-button" type="button">
          Read More
        </button>
        </Link>

      </div>
    </div>
  );
}
