import { db } from "../firebase.config";
import {collection,getDocs,getDoc,updateDoc,deleteDoc,doc, addDoc} from "firebase/firestore";

const notificationRef = collection(db, "notifications");
class NotificationService {

    getAllNotification = () => {
        return getDocs(notificationRef);
    };
    addNotification = (newNotification) => {
        return addDoc(notificationRef, newNotification);
    };
    updateNotification = (id, newNotification) => {
        const notificationDoc = doc(db, "notifications", id);
        return updateDoc(notificationDoc, newNotification);
    };
    updateNotificationDetails=(id, value)=>{
        const notificationDoc = doc(db, "notifications",id);
        return updateDoc(notificationDoc, value);
    }
    deleteNotification = (id) => {
        const notificationDoc = doc(db, "notifications", id);
        return deleteDoc(notificationDoc);
    };
}

export default new NotificationService();