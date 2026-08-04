import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UsuarioActivo {
  nombre: string
  apellido: string
  usuario: string
}

interface UserState {
  user: UsuarioActivo | null
  login2: (userData: UsuarioActivo) => void
  logout: () => void
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      login2: (userData) => {
        set({ user: userData })
      },
      logout: () => {
        set({ user: null })
      }
    }),
    {
      name: 'usuarioActivo'
    }
  )
)

export default useUserStore