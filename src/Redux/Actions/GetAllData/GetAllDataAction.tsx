import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import openNotificationWithIcon from "../../../Component/Nofitication/Notification";
// import { DOMAIN } from "../../../Config/Domain/Domain";
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

// export const getAllDataAction = (collectionParam: string, dispatchAction: any) => {
//     return async (dispatch: any) => {
//         try {
//             let arrData: any[] = [];
//             await fetch(`${DOMAIN}/${collectionParam}`)
//                 .then((response) => response.json())
//                 .then((data) => data.documents.forEach((doc: any) => {
//                     let indexLast = doc.name.lastIndexOf("/")
//                     let idColection = doc.name.slice(indexLast + 1, doc.name.length - 1)
//                     arrData.push({ ...doc.fields, id: idColection })
//                 }));
                
//                 arrData.map((item: any) => {
//                     for (const [key, value] of Object.entries(item)) {
//                         if (typeof(value) === "object") {
//                             let valueOfChild: object = value as object
//                             for (const [childKey, childValue] of Object.entries(valueOfChild)) {
//                                 item[key] = childValue
//                             }
//                         } 
//                     }
//                 })
//             dispatch(dispatchAction(arrData))
//         }
//         catch (err) {

//         }
//     }
// }