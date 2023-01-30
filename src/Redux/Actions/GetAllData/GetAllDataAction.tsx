import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import openNotificationWithIcon from "../../../Component/Nofitication/Notification";
import { database } from "../../../configFirebase";

export const getAllDataAction = (collectionParam: string, dispatchAction: any) => {
    return async (dispatch: any) => {
        try {
            const data: any[] = [];
            const querySnapshot = await getDocs(collection(database, collectionParam));
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id })
            });
            dispatch(dispatchAction(data))
        } catch (err) {
            openNotificationWithIcon("error", "Đã xảy ra lỗi");
        }
    }
}

export const getDetailDataAction = (collectionParam: string, dispatchAction: any, idDocument: any) => {
    return async (dispatch: any) => {
        try {
            const id: string = idDocument as string
            let detailData = {}
            const docSnap = await getDoc(doc(database, collectionParam, id));
            if (docSnap.exists()) {
                detailData = { ...docSnap.data(), id: docSnap.id }
            }
            dispatch(dispatchAction(detailData))
        } catch (err) {
            openNotificationWithIcon("error", "Đã xảy ra lỗi");
        }
    }
}
