// react
import { useState } from "react";
// react dom
import { useNavigate } from "react-router-dom";
// mui
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import ButtonGroup from "@mui/material/ButtonGroup";
// icon
import PencilOutline from "mdi-material-ui/PencilOutline";
import TrashCanOutline from "mdi-material-ui/TrashCanOutline";
//component
import { Product } from "../../types/product";
import DialogConfirm from "../dialogs/DialogConfirm";
type CardProductType = {
  product: Product;
};

const CardProduct = (props: CardProductType) => {
  const { product } = props;
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpen = () => setOpen(true);

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const gotoEditPage = () => navigate(`/edit/${product.id}`);

  return (
    <>
      <Card>
        <Stack height={180} justifyContent="center" alignItems="center">
          <Avatar
            alt={product.name}
            src={product.image}
            variant="rounded"
            sx={{ width: 130, height: 140, objectFit: "cover" }}
          />
        </Stack>

        <CardContent sx={{ p: (theme) => `${theme.spacing(2, 2)} !important` }}>
          <Typography
            variant="h6"
            textAlign="left"
            mb={1}
            minHeight={80}
            maxHeight={80}
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {product.name}
          </Typography>
          <Stack direction="row" mb={1} spacing={1}>
            <Typography variant="body2" fontWeight={600}>
              Giá:
            </Typography>
            <Typography variant="body2">{VND.format(product.price)}</Typography>
          </Stack>
          <Stack direction="row" mb={1} spacing={1}>
            <Typography variant="body2" fontWeight={600}>
              Năm sản xuất:
            </Typography>
            <Typography variant="body2">{product.prod}</Typography>
          </Stack>
          <Stack
            direction="column"
            minHeight={60}
            maxHeight={60}
            sx={{ overflowY: "hidden", textOverflow: "ellipsis" }}
          >
            <Typography variant="body2" fontWeight={600}>
              Mô tả:
            </Typography>
            <Typography variant="body2">{product.description}</Typography>
          </Stack>
        </CardContent>
        <ButtonGroup variant="contained" fullWidth size="large">
          <Button
            color="info"
            sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
            onClick={gotoEditPage}
          >
            <PencilOutline sx={{ color: "#fff" }} />
          </Button>

          <Button
            color="error"
            sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
            onClick={handleClickOpen}
          >
            <TrashCanOutline />
          </Button>
        </ButtonGroup>
      </Card>
      <DialogConfirm open={open} setOpen={setOpen} product={product}/>
    </>
  );
};

export default CardProduct;
