import { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import {
  collection,
  getDocs,
  query,
  getFirestore,
  where,
} from "firebase/firestore";

const Ordenes = () => {
  // context con las operaciones de firebase
  const { firebase } = useContext(FirebaseContext);

  // state con las ordenes
  const [ordenes, guardarOrdenes] = useState([]);

  useEffect(() => {
    obtnerOrdenes();
  }, []);

  const obtnerOrdenes = async () => {
    const q = query(
      collection(firebase.db, "ordenes"),
      where("completado", "==", false)
    );
    const querySnapshot = await getDocs(q);
    const ordenes = querySnapshot.forEach((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    guardarOrdenes(ordenes);
  };

  return (
    <div>
      <h1 className="text-3xl font-light mb-4">Ordenes</h1>
    </div>
  );
};

export default Ordenes;
