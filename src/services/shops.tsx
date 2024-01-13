import {
  Firestore,
  collection,
  getDocs,
  addDoc,
  DocumentData,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { ShopModel } from "../models/shop";

export class ShopsServices {
  private firestore: Firestore;

  constructor(firestore: Firestore) {
    this.firestore = firestore;
  }

  addEditShop = async (model: ShopModel, isAdd: boolean) => {
    if (isAdd === true) {
      const result = await addDoc(collection(this.firestore, "shops"), model);
      console.log(result);
    } else {
      const shopsCollection = collection(this.firestore, "shops");

      const querySnapshot = await getDocs(
        query(shopsCollection, where("id", "==", model.id))
      );
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, {
        name: model.name,
        code: model.code,
        location: model.location,
        address: model.address,
        phoneNumber: model.phoneNumber,
      });
    }
  };

  removeShopById = async (shopId: string) => {
    const shopsCollection = collection(this.firestore, "shops");
    const querySnapshot = await getDocs(
      query(shopsCollection, where("id", "==", shopId))
    );

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  };

  getShops = async () => {
    const shopsCollection = collection(this.firestore, "shops");
    const querySnapshot = await getDocs(shopsCollection);
    const shopsData: ShopModel[] = querySnapshot.docs.map((doc) => {
      const data = doc.data() as DocumentData;
      return {
        id: data.id as string,
        name: data.name as string,
        code: data.code as string,
        location: data.location,
        address: data.address,
        phoneNumber: data.phoneNumber as string,
      };
    });
    return shopsData;
  };
}
