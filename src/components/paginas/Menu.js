import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../../firebase";

const Menu = () => {
  const [platillos, guardarPlatillos] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerPlatillos = () => {
      firebase.db.collection("produtos").onSnapshot(handleSnapshot);
    };
    obtenerPlatillos();
  }, []);

  // Snapshot nos permite utilizar la base de datos en tiempo real de firestore
  function handleSnapshot(snapshot) {
    const platillos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    //Armazenar a busca do BD no State
    guardarPlatillos(platillos);
  }

  return (
    <div>
      <h1 className="text-3xl font-light mb-4">Menu</h1>
      <Link
        to="/nuevo-platillo"
        className="bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white uppercase font-bold"
      >
        Agregar Platillo
      </Link>
    </div>
  );
};

export default Menu;
