import { addDoc, collection } from "firebase/firestore";
import openNotificationWithIcon from "../../../Component/Nofitication/Notification";
import { database } from "../../../configFirebase";
import { getAllDataAction } from "../GetAllData/GetAllDataAction";

export const addDocumentPackage = (collectionParam: string, valueDocument: object, dispatchAction: any) => {
    return async (dispatch: any) => {
        try {
            await addDoc(collection(database, collectionParam), valueDocument);
            await dispatch(getAllDataAction(collectionParam, dispatchAction))
            openNotificationWithIcon("success", "Thêm gói thành công")
        }
        catch (err) {
            console.log(err)
            openNotificationWithIcon("error", "Đã xảy ra lỗi")
        }
    }
}