import { useEffect, useState } from "react";
// mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// components
import { Product } from "../../types/product";
import CardProduct from "../../components/cards/CardProduct";
// redux
import { useSelector } from "../../redux/store";

function ProductGrid() {
  const [productsGrid, setProductsGrid] = useState<Product[]>([]);
  const { products } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (!products.length) return;
    setProductsGrid(products);
  }, [products]);

  return (
    <Box p={4}>
      <Grid container spacing={4}>
        {productsGrid.map((product)=>{
            return <Grid item xs={12} sm={6} md={3} lg={2} key={product.id}>
            <CardProduct product={product} />
          </Grid>
        })}
        
      </Grid>
    </Box>
  );
}

export default ProductGrid;
