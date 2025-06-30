import UserProfileScreen from "../components/paginaInicial";
import React, { useState, useEffect} from "react";
import { DecodedToken } from "../utils/auth";
import { getUserFromToken } from "../utils/auth";

const Paciente = () => {
      const [user, setUser] = useState<DecodedToken | null>(null);
    
      useEffect(() => {
        const usuario = getUserFromToken();
        setUser(usuario);
      }, []);

    return (
         <div >
            {user?
      <UserProfileScreen
        userName={user.nome}
        userEmail={user.email}
        userRole={user.role}
      />:""}
    </div>
    );
}
export default Paciente;