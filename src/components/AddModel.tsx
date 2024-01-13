import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Stack,
  Typography,
} from "@mui/material";
import { primaryColor } from "../utils/theme";
import { ShopModel } from "../models/shop";
import { apiKey, defaultCoordinates, validCode, validPhoneNumber } from "../utils/constants";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useEffect, useState } from "react";
import { AddEditShopProps, AddModelProps, GeoLocationProps, ShopsState } from "../utils/props";
import { v4 as uuidv4 } from "uuid";
import {
  GeocodeOptions,
  OutputFormat,
  setDefaults,
} from "react-geocode";
import { addEditShop } from "../redux/slices/shopsSlice";
import { AppDispatch } from "../redux/store";
import AutoCompleteLocation from "./AutoCompleteLocation";
import { getAddress, getCoordinates } from "../utils/helper";
import Field from "./Field";

const AddModel = ({ open, handleClose }: AddModelProps) => {
  const shop = useSelector((state: ShopsState) => state.editShop);

  const [location, setLocation] = useState<string>("");
  const [marker, setMarker] = useState<GeoLocationProps | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState({
    shopName: "",
    phoneNumber: "",
    shopCode: "",
  });
  const [touchedFields, setTouchedFields] = useState({
    shopName: false,
    phoneNumber: false,
    shopCode: false,
  });

  const [openLocationModal, setOpenLocationModal] = useState(false);
  const handleOpenLocationModal = () => setOpenLocationModal(true);
  const handleCloseLocationModal = () => setOpenLocationModal(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setInitialValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    setTouchedFields((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 4);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shop]);

  const getData = () => {
    if (shop?.id) {
      setInitialValues(() => ({
        shopName: shop?.name,
        phoneNumber: shop?.phoneNumber,
        shopCode: `${shop?.code}`,
      }));
      const newCoordinates : GeoLocationProps = {
        lat: shop.location.lat,
        lng: shop.location.lng,
      };
      setMarker(newCoordinates);
      setLocation(shop ? shop.address : "");
    } else {
      setInitialValues({
        shopName: "",
        phoneNumber: "",
        shopCode: "",
      });
      setMarker(null);
      setLocation("");
      setTouchedFields({
        shopName: false,
        phoneNumber: false,
        shopCode: false,
      });
    }
  };

  const handleAddShop = () => {
    if (
      marker !== null &&
      location.length > 0 &&
      initialValues.shopName.length > 0 &&
      initialValues.shopCode.length > 0 &&
      initialValues.phoneNumber.length > 0 &&
      validPhoneNumber.test(initialValues.phoneNumber) &&
      validCode.test(initialValues.shopCode)
    ) {
      const newShop: ShopModel = {
        id: shop?.id ?? uuidv4(),
        name: initialValues.shopName,
        code: initialValues.shopCode,
        location: marker,
        address: location,
        phoneNumber: initialValues.phoneNumber,
      };
      const addEdit: AddEditShopProps = {
        model: newShop,
        isAdd: shop?.id ? false : true,
      };
      dispatch(addEditShop(addEdit));
      handleClose();
    }
    if (marker == null || location == null) {
      setLocationError("No location provided");
    }
  };

  const mapOptions = {
    center: marker ?? defaultCoordinates,
    zoom: 4,
  };

  const config: GeocodeOptions = {
    key: apiKey,
    language: "en",
    region: "es",
    outputFormat: OutputFormat.JSON,
  };

  setDefaults(config);
  const onMapClick = async (e: google.maps.MapMouseEvent) => {
    if (e.latLng !== null) {
      const coordinates: GeoLocationProps = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      const address = await getAddress(coordinates);
      setLocation(address);
      setMarker(coordinates);
      setLocationError(null);
    }
  };

  const addCoordinates = async (address: string) => {
    const geolocation = await getCoordinates(address);
    setMarker(geolocation);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        ".MuiPaper-root": {
          borderRadius: 4,
        },
      }}
    >
      <DialogContent>
        <Typography fontWeight="bold" color={primaryColor} pb={1}>
          Shop location
        </Typography>
        <DialogContentText id="alert-dialog-description">
          <Box style={{ position: "relative", height: 150 }}>
            <GoogleMap
              mapContainerStyle={{ height: 150, borderRadius: 6 }}
              options={mapOptions}
              onClick={(e) => {
                onMapClick(e);
              }}
            >
              {marker && <MarkerF position={marker} />}
            </GoogleMap>
            <Box
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                width: "40%",
                paddingLeft: 10,
                paddingTop: 4,
                paddingBottom: 4,
                backgroundColor: "white",
                zIndex: 11,
              }}
              onClick={handleOpenLocationModal}
            >
              <Typography
                fontSize={12}
                color={location !== "" ? "#000" : "grey"}
                sx={{cursor: "pointer"}}
              >
                {location !== "" ? location : "Search for locations"}
              </Typography>
              {locationError && (
                <Typography fontSize={10} color="red">
                  {locationError}
                </Typography>
              )}
            </Box>
            <Dialog
              open={openLocationModal}
              onClose={handleCloseLocationModal}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              sx={{
                ".MuiPaper-root": {
                  borderRadius: 4,
                },
              }}
            >
              <AutoCompleteLocation
                onSelect={(address) => {
                  handleCloseLocationModal();
                  addCoordinates(address);
                  setLocation(address);
                  setLocationError(null);
                }}
              />
            </Dialog>
          </Box>
          <Stack direction="row" mt={4} gap={2}>
            <Field
              fieldName="shopName"
              label="Shop Name"
              value={initialValues.shopName}
              touchedFields={touchedFields}
              initialValues={initialValues}
              handleChange={handleChange}
            />
            <Field
              fieldName="phoneNumber"
              label="Phone Number"
              value={initialValues.phoneNumber}
              touchedFields={touchedFields}
              initialValues={initialValues}
              handleChange={handleChange}
            />
            <Field
              fieldName="shopCode"
              label="Shop Code"
              value={initialValues.shopCode}
              touchedFields={touchedFields}
              initialValues={initialValues}
              handleChange={handleChange}
            />
          </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center", paddingBottom: 20 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderColor: "red",
            color: "red",
            width: "40%",
            "&:hover": {
              backgroundColor: "red",
              borderColor: "red",
              color: "#fff",
            },
          }}
        >
          <Typography>Cancel</Typography>
        </Button>
        <Button
          type="submit"
          onClick={() => {
            handleAddShop();
          }}
          variant="contained"
          sx={{
            backgroundColor: primaryColor,
            width: "40%",
          }}
        >
          <Typography>Continue</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddModel;
