import { ChangeEvent } from "react";
import { ShopModel } from "../models/shop";

export interface GeoLocationProps {
  lat: number;
  lng: number;
}

export interface ValidateFieldsProps {
  fieldName: keyof TouchedFieldsProps;
  touchedFields: TouchedFieldsProps;
  initialValues: InitialValuesProps;
}

export interface TouchedFieldsProps {
  shopName: boolean;
  phoneNumber: boolean;
  shopCode: boolean;
}

export interface InitialValuesProps {
  shopName: string;
  phoneNumber: string;
  shopCode: string;
}

export interface FieldProps {
  fieldName: keyof TouchedFieldsProps;
  label: string;
  value: string;
  touchedFields: TouchedFieldsProps;
  initialValues: InitialValuesProps;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export interface ColumnProps {
  id: string;
  label: string;
}

export interface ShopsTableProps {
  shops: ShopModel[];
  handleOpenAddModal: () => void;
}

export interface AddModelProps {
  open: boolean;
  handleClose: () => void;
}

export interface ShopProps {
  shop: ShopModel;
  handleOpenAddModal: () => void;
  column: ColumnProps;
  columnIndex: number;
}

export interface ShopsState {
  shops: ShopModel[] | null;
  isLoading: boolean;
  successMessage: string | null;
  errorMessage: string | null;
  editShop: ShopModel | null;
}

export interface FormikValuesProps {
  shopName: string;
  phoneNumber: string;
  shopCode: string;
}

export interface AddEditShopProps {
  model: ShopModel;
  isAdd: boolean;
}
