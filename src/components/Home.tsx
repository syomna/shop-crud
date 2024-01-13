import { Stack, Typography } from "@mui/material";
import { primaryColor } from "../utils/theme";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Map from "./Map";
import { useEffect, useState } from "react";
import AddModel from "./AddModel";
import ShopsTable from "./ShopsTable";
import { useDispatch, useSelector } from "react-redux";
import { getShops, setShops } from "../redux/slices/shopsSlice";
import { useLoadScript } from "@react-google-maps/api";
import { apiKey, libraries } from "../utils/constants";
import { ShopsState } from "../utils/props";
import { toast } from "react-toastify";
import { AppDispatch } from "../redux/store";
import Loader from "./Loader";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenAddModal = () => setOpenModal(true);
  const handleCloseAddModal = () => setOpenModal(false);

  const dispatch = useDispatch<AppDispatch>();
  const shops = useSelector((state: ShopsState) => state.shops);
  const successMessage = useSelector(
    (state: ShopsState) => state.successMessage
  );
  const isLoading = useSelector((state: ShopsState) => state.isLoading);

  const errorMessage = useSelector((state: ShopsState) => state.errorMessage);

  useEffect(() => {
    dispatch(getShops());
    if (successMessage) {
      toast.success(successMessage);
    } else if (errorMessage) {
      toast.error(errorMessage);
    }
    console.log(successMessage);
    console.log(errorMessage);
  }, [successMessage, errorMessage, dispatch]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: libraries,
  });

  if (!isLoaded || isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Stack direction="row" gap={1}>
        <Typography fontWeight="bold">Shops Managment</Typography>
        <Stack
          direction="row"
          gap={0.5}
          sx={{ cursor: "pointer" }}
          onClick={() => {
            dispatch(
              setShops({
                id: null,
              })
            );
            setTimeout(() => {
              handleOpenAddModal();
            }, 100);
          }}
        >
          <AddCircleIcon sx={{ color: primaryColor }} />
          <Typography color={primaryColor} fontWeight="bold">
            Add shop
          </Typography>
        </Stack>

        <AddModel open={openModal} handleClose={handleCloseAddModal} />
      </Stack>
      <Stack>
        <Map />
        {shops !== null && (
          <>
            {shops.length > 0 ? (
              <ShopsTable
                shops={shops}
                handleOpenAddModal={handleOpenAddModal}
              />
            ) : (
              <Typography mt={20} textAlign="center">
                You have no shops
              </Typography>
            )}
          </>
        )}
      </Stack>
    </>
  );
};

export default Home;
