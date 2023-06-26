import { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

import Orden from "../ui/Orden";

const Ordenes = () => {
  // context con las operaciones de firebase
  const { firebase } = useContext(FirebaseContext);

  // state con las ordenes
  const [ordenes, guardarOrdenes] = useState([]);

  useEffect(() => {
    obtnerOrdenes();
  }, [ordenes]);

  const obtnerOrdenes = async () => {
    const q = query(
      collection(firebase.db, "ordenes"),
      where("completado", "==", false)
    );
    const querySnapshot = await getDocs(q);

    const ordenes = querySnapshot.docs.map((doc) => {
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
      <div className="sm:flex sm:flex-wrap -mx-3">
        {ordenes.map((orden) => (
          <Orden key={orden.id} orden={orden} />
        ))}
      </div>
    </div>
  );
};

export default Ordenes;
