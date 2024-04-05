import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    title: "Book 1",
    price: 6,
    description: "It ends with us",
  },
  {
    id: "p2",
    title: "book 2",
    price: 7,
    description: "Love hypothesis",
  },
  {
    id: "p3",
    title: "book 3",
    price: 8,
    description: "these violent delights",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((item) => {
          return (
            <ProductItem
              key={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
