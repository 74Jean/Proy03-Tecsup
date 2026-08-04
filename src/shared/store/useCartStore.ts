import { create } from 'zustand'
import useUserStore from './useUserStore'

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  stock: number
}

interface CartState {
  items: CartItem[]
  usuarioActual: string | null
  loadUserCart: (usuario: string) => void
  resetCart: () => void
  addItem: (product: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  distinctItemsCount: () => number
  totalPrice: () => number
}

const getCartKey = (usuario: string) => `cart-storage-${usuario}`

const persistCart = (usuario: string | null, items: CartItem[]) => {
  if (usuario === null) return
  localStorage.setItem(getCartKey(usuario), JSON.stringify(items))
}

const useCartStore = create<CartState>((set, get) => ({
  items: [],
  usuarioActual: null,

  loadUserCart: (usuario) => {
    const saved = localStorage.getItem(getCartKey(usuario))
    set({ items: saved ? JSON.parse(saved) : [], usuarioActual: usuario })
  },

  resetCart: () => {
    set({ items: [], usuarioActual: null })
  },

  addItem: (product) => {
    const { items, usuarioActual } = get()
    const existing = items.find((i) => i.id === product.id)
    if (existing) return

    const newItems = [...items, { ...product, quantity: 1 }]
    set({ items: newItems })
    persistCart(usuarioActual, newItems)
  },

  removeItem: (id) => {
    const { items, usuarioActual } = get()
    const newItems = items.filter((i) => i.id !== id)
    set({ items: newItems })
    persistCart(usuarioActual, newItems)
  },

  updateQuantity: (id, quantity) => {
    const { items, usuarioActual } = get()
    const newItems = items.map((i) => {
      if (i.id !== id) return i
      const cantidadValida = Math.min(Math.max(1, quantity), i.stock)
      return { ...i, quantity: cantidadValida }
    })
    set({ items: newItems })
    persistCart(usuarioActual, newItems)
  },

  clearCart: () => {
    const { usuarioActual } = get()
    set({ items: [] })
    persistCart(usuarioActual, [])
  },

  distinctItemsCount: () => get().items.length,
  totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}))

useUserStore.subscribe((state) => {
  const { loadUserCart, resetCart, usuarioActual } = useCartStore.getState()

  if (state.user) {
    if (state.user.usuario !== usuarioActual) {
      loadUserCart(state.user.usuario)
    }
  } else {
    if (usuarioActual !== null) {
      resetCart()
    }
  }
})
const initialUser = useUserStore.getState().user
if (initialUser) {
  useCartStore.getState().loadUserCart(initialUser.usuario)
}

export default useCartStore