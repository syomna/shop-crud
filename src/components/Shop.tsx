import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  Stack,
  TableCell,
  Typography,
  styled,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeShop, setShops } from "../redux/slices/shopsSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ShopProps } from "../utils/props";
import { primaryColor } from "../utils/theme";
import { AppDispatch } from "../redux/store";

const Shop = ({ shop, column, columnIndex, handleOpenAddModal }: ShopProps) => {
  const [anchor, setAnchor] = useState(null);

  const dispatch = useDispatch<AppDispatch>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (event: any) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);
  const id = open ? "simple-popup" : undefined;
  const PopupBody = styled("div")(
    () => `
  width: max-content;
  margin: 10px 20px;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgb(0 0 0 / 0.05);
  font-weight: 500;
  font-size: 0.875rem;
  z-index: 1;
`
  );

  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  return (
    <TableCell key={column.id} style={{ fontWeight: "bold" }}>
      {column.id == "phone" ? (
        <Stack direction="row" justifyContent="space-between">
          <Typography fontSize={{ xs: 12, md: 14 }} fontWeight="bold">
            {shop.phoneNumber}
          </Typography>
          <MoreVertIcon sx={{ cursor: "pointer" }} onClick={handleClick} />
          <BasePopup id={id} open={open} anchor={anchor}>
            <PopupBody>
              <Stack
                direction="row"
                alignItems="center"
                px={1}
                py={0.5}
                gap={0.5}
                sx={{ cursor: "pointer" }}
                onClick={(event) => {
                  handleClick(event);

                  dispatch(
                    setShops({
                      id: shop.id,
                      name: shop.name,
                      code: shop.code,
                      location: shop.location,
                      address: shop.address,
                      phoneNumber: shop.phoneNumber,
                    })
                  );

                  setTimeout(() => {
                    handleOpenAddModal();
                  }, 100);
                }}
              >
                <EditIcon sx={{ width: 15 }} />
                <Typography fontSize={12}>Edit</Typography>
              </Stack>
              <Divider />
              <Stack
                direction="row"
                alignItems="center"
                px={1}
                py={0.5}
                gap={0.5}
                sx={{ cursor: "pointer" }}
                onClick={handleClickOpenDelete}
              >
                <DeleteIcon sx={{ width: 15 }} />
                <Typography fontSize={12}>Delete</Typography>
              </Stack>
              <Dialog
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <Stack
                      direction="row"
                      gap={0.5}
                      sx={{ color: "#000" }}
                    >
                      <Typography>Are you sure you want to remove</Typography>
                      <Typography color={primaryColor} fontWeight="bold">{shop.name}</Typography>
                      <Typography>?</Typography>
                    </Stack>
                  </DialogContentText>
                </DialogContent>
                <DialogActions
                  style={{ justifyContent: "center", paddingBottom: 20 }}
                >
                  <Button
                    onClick={() => {
                      handleClick("e");
                      handleCloseDelete();
                    }}
                    variant="outlined"
                    sx={{
                      borderColor: primaryColor,
                      width: "40%",
                    }}
                  >
                    <Typography>No</Typography>
                  </Button>
                  <Button
                    onClick={() => {
                      handleCloseDelete();
                      dispatch(removeShop(shop));
                    }}
                    variant="contained"
                    sx={{
                      backgroundColor: "red",
                      width: "40%",
                    }}
                  >
                    <Typography color="white">Yes</Typography>
                  </Button>
                </DialogActions>
              </Dialog>
            </PopupBody>
          </BasePopup>
        </Stack>
      ) : (
        <Typography fontSize={{ xs: 12, md: 14 }} fontWeight="bold">
          {[shop.name, shop.code, shop.address][columnIndex]}
        </Typography>
      )}
    </TableCell>
  );
};

export default Shop;
