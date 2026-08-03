import type { Phone } from '../module/dataJson'

const MOCK_API = 'https://raw.githubusercontent.com/kevinramos10/phone-market-data/refs/heads/main/phonesMock.json'

export const getPhones = async () => {
    const response = await fetch(MOCK_API)
    const data = await response.json() as { products: Phone[] }

    return data.products
}

export const getPhoneById = async (id: string) => {
    const phones = await getPhones()
    const phone = phones.find((phone) => phone.id === Number(id))

    return phone
}
