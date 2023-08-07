// ** React Imports
import { Fragment, useEffect } from "react";

// ** MUI Imports
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Alert from "@mui/material/Alert";
// redux
import { useDispatch, useSelector } from "../../redux/store";
import { clear, deleteProduct } from "../../redux/slices/productSlice";
//type
import { Product } from "../../types/product";
// toast
import toast from "react-hot-toast";
type DialogConfirmProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: Product;
};
const DialogConfirm = (props: DialogConfirmProps) => {
  // ** props
  const { open, setOpen, product } = props;

  const dispatch = useDispatch();
  const { error, message, idSelectedDelete } = useSelector(
    (state) => state.products
  );

  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    dispatch(deleteProduct(product))
    handleClose();
  };

  useEffect(() => {
    if (!error && message && idSelectedDelete === product.id ) {
      toast.success(message);
      dispatch(clear("error"));
      dispatch(clear("message"));
      handleClose();
    }
  }, [message, error, idSelectedDelete]);

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent sx={{ p: 4 }}>
          <DialogContentText id="alert-dialog-description" fontSize={18}>
            Bạn có chắc mún xóa sản phẩm <strong>{product.name}</strong>?
          </DialogContentText>
          <Alert severity="error" sx={{ mt: 2 }}>
            {"Lưu ý: Sản phẩm bị xóa sẽ không thể hoàn tác lại"}
          </Alert>
        </DialogContent>
        <DialogActions className="dialog-actions-dense" sx={{ p: 4, pt: 0 }}>
          <Button variant="contained" onClick={()=>handleDelete()}>
            Đồng ý
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DialogConfirm;
