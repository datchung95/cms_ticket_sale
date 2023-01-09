import { doc, updateDoc } from "firebase/firestore";
import openNotificationWithIcon from "../../../Component/Nofitication/Notification";
import { DOMAIN } from "../../../Config/Domain/Domain";
import { database } from "../../../configFirebase";
import { getAllDataAction } from "../GetAllData/GetAllDataAction";

export const updateDateDocumentAction = (collectionParam: string, idDocument: string, valueDocument: string, dispatchAction: any) => {
    return async (dispatch: any) => {
        try {
            await updateDoc(doc(database, collectionParam, idDocument), {ngaySuDung :valueDocument})
            dispatch(getAllDataAction(collectionParam, dispatchAction))
            openNotificationWithIcon("success", "Cập nhật thành công")
        }
        catch (err) {
            openNotificationWithIcon("error", "Đã xảy ra lỗi")
        }
    }
}