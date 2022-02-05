import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "../../graphQL/queries";
import ItemAttrSet from "../itemAttrSet/itemAttrSet";
import Button from "../shared/button/button";
import Loading from "../shared/loading/loading";
import { AppContext } from "../../contexts/appContext";

import classes from "./descriptionPage.module.css";

const DescriptionPage = () => {
  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID(id));
  const { cart, currency, dispatch } = useContext(AppContext);

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;

  let { product } = data;

  const handleCartClick = (product) => {
    let inCart = cart.products.find((p) => p.id === product.id);
    if (inCart) alert(`"${product.name}" Already in Cart`);
    else {
      alert(`"${product.name}" Added Successfuly`);
      dispatch({ type: "ADD_PRODUCT", product });
    }
  };

  return (
    <div className={classes["description-page"]}>
      <div className={classes["small-images"]}>
        {product.gallery.length &&
          product.gallery.map((img) => (
            <img width="100px" key={img} src={img} alt="product" />
          ))}
      </div>
      {product.gallery.length && (
        <div className={classes["preview"]}>
          <img src={product.gallery[0]} width="100%" alt="product" />
        </div>
      )}
      <div className={classes["details"]}>
        <div className={classes.brand}>{product.brand}</div>
        <div className={classes.name}>{product.name}</div>
        <div className={classes.attrs}>
          {(product.attributes.length && (
            <ItemAttrSet
              productId={product.id}
              attributes={product.attributes}
              sizeLabel="true"
            />
          )) ||
            null}
        </div>
        <div className={classes.price}>
          <div className="bold">PRICE:</div>
          <div className="bold">
            {currency.symbol +
              " " +
              product.prices.find((p) => p.currency.symbol === currency.symbol)
                .amount}
          </div>
        </div>
        <Button
          green="true"
          disabled={!product.inStock}
          onClick={() => handleCartClick(product)}
        >
          ADD TO CART
        </Button>
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
      </div>
    </div>
  );
};

export default DescriptionPage;
