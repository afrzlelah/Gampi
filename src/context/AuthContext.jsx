import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AVAILABLE_ROLES = [
  {
    id: 'farmer',
    name: 'Pak Suharto',
    roleLabel: 'Petani Mitra',
    color: '#10b981',
  },
  {
    id: 'buyer_enterprise',
    name: 'Hotel Gumaya Semarang',
    roleLabel: 'Pembeli (Enterprise)',
    color: '#3b82f6',
  },
  {
    id: 'buyer_umkm',
    name: 'RM Padang Sederhana',
    roleLabel: 'Pembeli (UMKM)',
    color: '#f59e0b',
  },
  {
    id: 'investor',
    name: 'Budi Santoso',
    roleLabel: 'Investor Sosial',
    color: '#8b5cf6',
  },
  {
    id: 'admin',
    name: 'Tim GAMPI',
    roleLabel: 'Admin Ekosistem',
    color: '#059669',
  }
];

export function AuthProvider({ children }) {
  // Initialize to null so user/judge MUST select a role first on entering demo
  const [user, setUser] = useState(null);

  const login = (roleId) => {
    const roleData = AVAILABLE_ROLES.find(r => r.id === roleId) || AVAILABLE_ROLES[0];
    setUser({ role: roleId, ...roleData });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
