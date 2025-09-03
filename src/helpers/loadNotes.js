import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async( uid = '' ) => {
    if ( !uid ) throw new Error('El UID del usuario no existe');

    // Si uso collection debo importar una colección de Firestore
    const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` );
    const docs = await getDocs( collectionRef );

    // Creamos un array de notas e iteramos sobre data el cual tiene los datos y el id
    const notes = [];
    docs.forEach( doc => {
        notes.push({ id: doc.id, ...doc.data() })
    });
    // console.log(notes);
    return notes;
}