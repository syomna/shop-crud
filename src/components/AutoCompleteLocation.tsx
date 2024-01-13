import { useState } from "react";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { apiKey, libraries } from "../utils/constants";

function AutoCompleteLocation({
  onSelect,
}: {
  onSelect: (address: string) => void;
}) {
  const [searchResult, setSearchResult] =
    useState<null | google.maps.places.Autocomplete>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: libraries,
  });

  function onLoad(autocomplete: google.maps.places.Autocomplete) {
    setSearchResult(autocomplete);
  }

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const formattedAddress = place.formatted_address;
      if (formattedAddress) {
        onSelect(formattedAddress);
      }
    } else {
      alert("Please enter text");
    }
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
      <input
        type="text"
        placeholder="Search for locations"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
          zIndex: 20,
        }}
      />
    </Autocomplete>
  );
}

export default AutoCompleteLocation;
