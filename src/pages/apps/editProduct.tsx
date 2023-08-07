// react
import {
  useState,
  useEffect,
} from "react";
// react dom
import { useParams, Link } from "react-router-dom";
// mui
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Breadcrumbs from "@mui/material/Breadcrumbs";

// component
import ProductForm from "../../components/forms/ProductForm";
// redux
import { useSelector } from "../../redux/store";
// type
import { Product } from "../../types/product";
// icon
import ChevronRight from "mdi-material-ui/ChevronRight";

const breadcrumbs = [
  <Link to="/product-list" style={{textDecoration: "none"}} key="1">Danh sách sản phẩm</Link>,
  <Typography key="2" color="text.primary">
    Cập nhật sản phẩm
  </Typography>,
];

const EditProduct = () => {
  let { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const { products } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (!products.length && !id) return;
    const product = products.find(item => item.id === Number(id))
    setProduct(product);
  }, [products,id]);

  return (
    <>
      <Breadcrumbs
        separator={<ChevronRight fontSize="small" />}
        aria-label="breadcrumb"
        sx={{mx:4, mt:2}}
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Typography variant="h5" fontWeight={600} fontFamily="sans-serif" m={4}>
        Cập nhật sản phẩm
      </Typography>
      <CardContent sx={{ p: { xl: "24px 200px", lg: "24px 200px", xs: 0 } }}>
        <ProductForm isEdit product={product} />
      </CardContent>
    </>
  );
};

export default EditProduct;
