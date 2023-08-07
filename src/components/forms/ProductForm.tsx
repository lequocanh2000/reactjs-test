// react
import {
  useState,
  ElementType,
  ChangeEvent,
  useEffect,
} from "react";
// react dom
import { useNavigate } from "react-router-dom";
// toast
import toast from "react-hot-toast";
// mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button, { ButtonProps } from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
// form
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// type
import { Product } from "../../types/product";

// redux
import { useDispatch, useSelector } from "../../redux/store";
import {
  clear,
  addProduct,
  updateProduct,
} from "../../redux/slices/productSlice";
import noImage from './../../assets/images/user/noimage.jpg'

const ImgStyled = styled("img")(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(5),
  borderRadius: theme.shape.borderRadius,
}));

const ButtonStyled = styled(Button)<
  ButtonProps & { component?: ElementType; htmlFor?: string }
>(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
  },
}));

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: 0,
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
}));

interface FormValuesProps {
  name: string;
  prod: string;
  price: number;
  image: string;
  description: string;
}

type ProductFormProps = {
  isEdit?: boolean;
  product?: Product;
};

function ProductForm({ isEdit = false, product }: ProductFormProps) {
  // ** State
  const [imgSrc, setImgSrc] = useState<string>(noImage);
  const navigate = useNavigate();
  const [id, setId] = useState<number>();

  const dispatch = useDispatch();
  const { error, message, products } = useSelector(
    (state) => state.products
  );

  const productSchema = Yup.object().shape({
    name: Yup.string().required("Bạn cần nhập tên sản phẩm"),
    prod: Yup.string().required("Bạn cần nhập năm sản xuất"),
    price: Yup.number()
      .typeError("Bạn cần nhập định dạng số")
      .min(1, (ojb) => `Giá của sản phẩm phải lớn hơn ${ojb.min - 1} đồng`)
      .required("Bạn cần nhập giá sản phẩm"),
    image: Yup.string().required("Bạn cần nhập hình ảnh"),
    description: Yup.string().required("Bạn cần nhập mô tả"),
  });

  const defaultValues = {
    name: "",
    prod: "2023",
    price: 0,
    image: "",
    description: "",
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(productSchema),
  });

  const onSubmit = (data: FormValuesProps) => {
    if (data && id && !isEdit) {
      const product: Product = {
        id,
        name: data.name,
        price: data.price,
        prod: data.prod,
        image: data.image,
        description: data.description,
      };
      dispatch(addProduct(product));
    }
    if (data && id && isEdit) {
      const product: Product = {
        id,
        name: data.name,
        price: data.price,
        prod: data.prod,
        image: data.image,
        description: data.description,
      };
      dispatch(updateProduct(product));
    }
  };

  useEffect(() => {
    if (!products.length || isEdit) return;
    setId(products[products.length-1].id + 1);
  }, [products, isEdit]);

  useEffect(() => {
    if (!product) return;
    setValue("name", product.name);
    setValue("price", product.price);
    setValue("prod", product.prod);
    setValue("image", product.image);
    setValue("description", product.description);
    setImgSrc(product.image);
    setId(product.id);
  }, [product]);

  useEffect(() => {
    if (!error && message && !isEdit) {
      toast.success(message);
      dispatch(clear("error"));
      dispatch(clear("message"));
      setTimeout(() => {
        navigate("/product-list");
      }, 500);
    }
    if (!error && message && isEdit) {
      toast.success(message);
      dispatch(clear("error"));
      dispatch(clear("message"));
      setTimeout(() => {
        navigate("/product-list");
      }, 500);
    }
  }, [message, error, isEdit]);

  const onChange = (file: ChangeEvent<Element>) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      reader.onload = () => {
        setImgSrc(reader.result as string);
        setValue("image", reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ my: 1 }}>
            <Stack direction="row" alignItems="center" spacing={3}>
              <Stack justifyContent="center" alignItems="center" spacing={1}>
                <ImgStyled src={imgSrc} alt="Profile Pic" />
                {errors.image && (
                  <FormHelperText
                    sx={{ color: "error.main" }}
                    id="validation-schema-image"
                  >
                    {errors.image.message}
                  </FormHelperText>
                )}
              </Stack>
              <Box>
                <ButtonStyled
                  component="label"
                  variant="contained"
                  htmlFor="account-settings-upload-image"
                >
                  Tải hình ảnh
                  <input
                    hidden
                    type="file"
                    onChange={(e) => onChange(e)}
                    accept="image/png, image/jpeg"
                    id="account-settings-upload-image"
                  />
                </ButtonStyled>
                <ResetButtonStyled
                  color="error"
                  variant="outlined"
                  onClick={() => setImgSrc(noImage)}
                >
                  Đặt lại
                </ResetButtonStyled>
                <Typography sx={{ mt: 1 }} component="p" variant="caption">
                  Chấp nhận PNG hoặc JPEG. Kích thước tối đa 800K.
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <FormControl fullWidth>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    type="text"
                    value={value}
                    label="Tên sản phẩm"
                    onChange={onChange}
                    error={Boolean(errors.name)}
                    aria-describedby="validation-schema-name"
                  />
                )}
              />
              {errors.name && (
                <FormHelperText
                  sx={{ color: "error.main" }}
                  id="validation-schema-name"
                >
                  {errors.name.message}
                </FormHelperText>
              )}
            </FormControl>
            {/* <TextField fullWidth label='Username' placeholder='johnDoe' defaultValue='johnDoe' /> */}
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <FormControl fullWidth>
              <Controller
                name="price"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    type="number"
                    value={value}
                    label="Giá sản phẩm"
                    onChange={onChange}
                    error={Boolean(errors.price)}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                )}
              />
              {errors.price && (
                <FormHelperText
                  sx={{ color: "error.main" }}
                  id="validation-schema-price"
                >
                  {errors.price.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <FormControl fullWidth>
              <InputLabel
                id="validation-basic-prod"
                error={Boolean(errors.prod)}
                htmlFor="validation-basic-prod"
              >
                Năm sản xuất
              </InputLabel>
              <Controller
                name="prod"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    label="Năm sản xuất"
                    onChange={onChange}
                    error={Boolean(errors.prod)}
                    labelId="validation-basic-prod"
                    aria-describedby="validation-basic-prod"
                  >
                    <MenuItem value="2023">2023</MenuItem>
                    <MenuItem value="2022">2022</MenuItem>
                    <MenuItem value="2021">2021</MenuItem>
                    <MenuItem value="2020">2020</MenuItem>
                  </Select>
                )}
              />
              {errors.prod && (
                <FormHelperText
                  sx={{ color: "error.main" }}
                  id="validation-schema-prod"
                >
                  {errors.prod.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <Controller
                name="description"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    type="text"
                    rows={4}
                    multiline
                    value={value}
                    label="Mô tả sản phẩm"
                    onChange={onChange}
                    error={Boolean(errors.description)}
                  />
                )}
              />
              {errors.description && (
                <FormHelperText
                  sx={{ color: "error.main" }}
                  id="validation-schema-description"
                >
                  {errors.description.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row-reverse">
              <Button variant="contained" type="submit">
                {!isEdit ? "Thêm sản phẩm" : "Cập nhật sản phẩm"}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default ProductForm;
