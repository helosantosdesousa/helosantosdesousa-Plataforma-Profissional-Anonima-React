// UserContext.tsx
import React, { createContext, useState, ReactNode, useContext } from "react";

export type Conexao = {
  id: string;
  nome: string;
  bio: string;
  email: string;
  empresa: string;
  habilidades: string[];
};

type UserContextType = {
  usuarioSelecionado: Conexao | null;
  setUsuarioSelecionado: (usuario: Conexao | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Conexao | null>(null);

  return (
    <UserContext.Provider value={{ usuarioSelecionado, setUsuarioSelecionado }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
