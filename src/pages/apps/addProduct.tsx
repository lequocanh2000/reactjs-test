// react dom
import { Link } from "react-router-dom";
// mui
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Breadcrumbs from "@mui/material/Breadcrumbs";
// icon
import ChevronRight from "mdi-material-ui/ChevronRight";
// component
import ProductForm from "../../components/forms/ProductForm";

const breadcrumbs = [
  <Link to="/product-list" style={{ textDecoration: "none" }} key="1">
    Danh sách sản phẩm
  </Link>,
  <Typography key="2" color="text.primary">
    Thêm sản phẩm
  </Typography>,
];

const AddProduct = () => {
  return (
    <>
      <Breadcrumbs
        separator={<ChevronRight fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mx: 4, mt: 2 }}
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Typography variant="h5" fontWeight={600} fontFamily="sans-serif" m={4}>
        Thêm sản phẩm
      </Typography>
      <CardContent sx={{ p: { xl: "24px 200px", lg: "24px 200px", xs: 0 } }}>
        <ProductForm />
      </CardContent>
    </>
  );
};

export default AddProduct;
