import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ShopsServices } from "../../services/shops";
import { firestore } from "../../config/firebase";
import { AddEditShopProps, ShopsState } from "../../utils/props";
import { ShopModel } from "../../models/shop";

const shopsServices = new ShopsServices(firestore);

export const getShops = createAsyncThunk("shops/get", async () => {
  return await shopsServices.getShops();
});

export const removeShop = createAsyncThunk(
  "shops/remove",
  async (shop: ShopModel) => {
    try {
      await shopsServices.removeShopById(shop.id);
      return shop;
    } catch (error) {
      return null;
    }
  }
);

export const addEditShop = createAsyncThunk(
  "shops/add-edit",
  async ({ model, isAdd }: AddEditShopProps) => {
    await shopsServices.addEditShop(model, isAdd);
    return { model: model, isAdd: isAdd };
  }
);

const initialState: ShopsState = {
  shops: null,
  isLoading: false,
  successMessage: null,
  errorMessage: null,
  editShop: null,
};
const shopsSlice = createSlice({
  name: "shops",
  initialState: initialState,
  reducers: {
    setShops: (state, action) => {
      state.editShop = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShops.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShops.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shops = action.payload;
        state.errorMessage = null;
      })
      .addCase(getShops.rejected, (state) => {
        state.isLoading = false;
        state.successMessage = null;
        state.errorMessage = "Something went wrong";
      })
      .addCase(addEditShop.pending, (state) => {
        state.isLoading = true;
        state.successMessage = null;
        state.errorMessage = null;
      })
      .addCase(addEditShop.fulfilled, (state, action) => {
        state.isLoading = false;

        state.successMessage = `Shop ${
          action.payload.isAdd ? "added" : "Edited"
        } successfully!`;
        if (action.payload.isAdd) {
          state.shops = [...state.shops!, action.payload.model];
        } else {
          const shopIndex = state.shops!.findIndex(
            (shop) => shop.id === action.payload.model.id
          );

          if (shopIndex !== -1) {
            state.shops = [
              ...state.shops!.slice(0, shopIndex),
              action.payload.model,
              ...state.shops!.slice(shopIndex + 1),
            ];
          }
        }
        state.errorMessage = null;
      })
      .addCase(addEditShop.rejected, (state) => {
        state.isLoading = false;
        state.successMessage = null;
        state.errorMessage = "Something went wrong";
      })
      .addCase(removeShop.pending, (state) => {
        state.isLoading = true;
        state.successMessage = null;
        state.errorMessage = null;
      })
      .addCase(removeShop.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          const id = action.payload.id;
          state.shops = state.shops!.filter((shop) => shop.id !== id);
        }
        state.successMessage = "Shop removed successfully!";
        state.errorMessage = null;
      })
      .addCase(removeShop.rejected, (state) => {
        state.isLoading = false;
        state.successMessage = null;

        state.errorMessage = "Something went wrong";
      });
  },
});
export const { setShops } = shopsSlice.actions;

export default shopsSlice.reducer;
