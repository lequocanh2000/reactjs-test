import { useEffect, useState } from "react";
// react dom
import { Link } from "react-router-dom";
// mui
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
// icon
import PencilOutline from "mdi-material-ui/PencilOutline";
import TrashCanOutline from "mdi-material-ui/TrashCanOutline";
// components
import DialogConfirm from "../../components/dialogs/DialogConfirm";
// type
import { Product } from "../../types/product";
// redux
import { useDispatch, useSelector } from "../../redux/store";
import { loading } from "../../redux/slices/productSlice";

interface CellType {
  row: Product;
}

type RowOptionsProps = CellType;
const RowOptions = (props: RowOptionsProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { row } = props
  const handleClickOpen = () => setOpen(true)
  return (
    <>
      <Stack direction="row">
        <Link to={`/edit/${row.id}`}>
          <IconButton color="info">
            <PencilOutline />
          </IconButton>
        </Link>
        <IconButton color="error" onClick={handleClickOpen}>
          <TrashCanOutline />
        </IconButton>
      </Stack>
      <DialogConfirm open={open} setOpen={setOpen} product={row}/>
    </>
  );
};
const columns = [
  {
    flex: 0.025,
    minWidth: 50,
    field: "id",
    headerName: "ID",
    disableColumnMenu: true,
    // align: 'center',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          {row.id}
        </Typography>
      );
    },
  },
  {
    flex: 0.04,
    minWidth: 50,
    field: "image",
    headerName: "Hình",
    disableColumnMenu: true,
    sortable: false,
    renderCell: ({ row }: CellType) => {
      return (
        <Avatar
          alt={row.name}
          src={row.image}
          variant="rounded"
          sx={{ width: 40, height: 40 }}
        />
      );
    },
  },
  {
    flex: 0.08,
    minWidth: 80,
    field: "name",
    headerName: "Tên sản phẩm",
    disableColumnMenu: true,
    sortable: false,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography
          variant="subtitle1"
          noWrap
          sx={{ textTransform: "capitalize" }}
        >
          {row.name}
        </Typography>
      );
    },
  },
  {
    flex: 0.06,
    minWidth: 110,
    field: "price",
    headerName: "Giá",
    disableColumnMenu: true,
    sortable: false,
    renderCell: ({ row }: CellType) => {
      const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      return (
        <Typography
          variant="subtitle1"
          noWrap
          sx={{ textTransform: "capitalize" }}
        >
          {VND.format(row.price)}
        </Typography>
      );
    },
  },
  {
    flex: 0.06,
    minWidth: 110,
    field: "prod",
    headerName: "Năm sản xuất",
    disableColumnMenu: true,
    sortable: false,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography
          variant="subtitle1"
          noWrap
          sx={{ textTransform: "capitalize" }}
        >
          {row.prod}
        </Typography>
      );
    },
  },
  {
    flex: 0.15,
    minWidth: 300,
    field: "description",
    headerName: "Mô tả",
    disableColumnMenu: true,
    sortable: false,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography variant="subtitle1" noWrap>
          {row.description}
        </Typography>
      );
    },
  },
  {
    flex: 0.04,
    minWidth: 150,
    field: "action",
    headerName: "",
    disableColumnMenu: true,
    sortable: false,
    renderCell: ({ row }: CellType) => <RowOptions row={row} key={row.id}/>
  },
];

function ProductList() {
  const [pageSize, setPageSize] = useState<number>(10);
  const [productList, setProductList] = useState<Product[]>([]);
  const dispatch = useDispatch();
  const { isLoading, products } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (!products.length) return;
    dispatch(loading(false));
    setProductList(products);
  }, [products]);

  return (
    <>
      <Grid item xs={12}>
        <Card>
          <DataGrid
            autoHeight
            rows={productList}
            columns={columns}
            pageSize={pageSize}
            disableSelectionOnClick
            loading={isLoading}
            rowsPerPageOptions={[10, 15, 20]}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                borderRadius: 0,
                backgroundColor: "#dedede",
              },
            }}
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>
    </>
  );
}

export default ProductList;
