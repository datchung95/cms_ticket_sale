import { doc, setDoc, updateDoc } from "firebase/firestore";
import openNotificationWithIcon from "../../../Component/Nofitication/Notification";
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

export const updateForControlDocumentAction = (collectionParam: string, idDocument: string, valueDocument: boolean, dispatchAction: any) => {
    return async (dispatch: any) => {
        try {
            await updateDoc(doc(database, collectionParam, idDocument), {doiSoat :valueDocument})
            dispatch(getAllDataAction(collectionParam, dispatchAction))
            openNotificationWithIcon("success", "Cập nhật thành công")
        }
        catch (err) {
            openNotificationWithIcon("error", "Đã xảy ra lỗi")
        }
    }
}

export const updatePackageDocumentAction = (collectionParam: string, idDocument: string, valueDocument: object, dispatchAction: any) => {
    return async (dispatch: any) => {
        try {
            const id: string = idDocument as string
            await setDoc(doc(database, collectionParam, id), valueDocument);
            dispatch(getAllDataAction(collectionParam, dispatchAction))
            openNotificationWithIcon("success", "Cập nhật thành công")
        }
        catch (err) {
            openNotificationWithIcon("error", "Đã xảy ra lỗi")
            console.log(err)
        }
    }
}