import { Box, Typography } from "@mui/material";
import { GoogleMap, InfoWindowF, MarkerF } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { ShopsState } from "../utils/props";
import { defaultCoordinates } from "../utils/constants";
import { useState } from "react";
import { ShopModel } from "../models/shop";

const Map = () => {
  const shops = useSelector((state: ShopsState) => state.shops);
  const [selectedShop, setSelectedShop] = useState<ShopModel | null>(null);
  const handleMarkerClick = (shop : ShopModel) => {
    setSelectedShop(shop);
  };

  const mapOptions = {
    center:
      shops != null && shops.length > 0
        ? shops[0].location
        : defaultCoordinates,
    zoom: 1,
  };

  return (
    <Box mt={2} flex={1}>
      <GoogleMap
        mapContainerStyle={{
          height: window.innerHeight / 2.8,
          borderRadius: 6,
        }}
        options={mapOptions}
      >
        {shops &&
          shops.map((e) => (
            <MarkerF
              key={e.location.lat}
              position={e.location}
              onClick={() => handleMarkerClick(e)}
            />
          ))}
        {selectedShop && (
          <InfoWindowF
            position={selectedShop.location}
            onCloseClick={() => setSelectedShop(null)}
          >
            <Box
              sx={{
                background: "white",
                padding: 1,
                borderRadius: 4,
                maxWidth: 200,
              }}
            >
              <Typography fontSize={12} fontWeight="bold">
                {selectedShop.name}
              </Typography>
              <Typography fontSize={12}>{selectedShop.address}</Typography>
            </Box>
          </InfoWindowF>
        )}
      </GoogleMap>
    </Box>
  );
};

export default Map;
