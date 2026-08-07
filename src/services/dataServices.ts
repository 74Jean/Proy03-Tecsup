import type { Phone, ClimaResponse } from '../module/dataJson'

const MOCK_API = 'https://raw.githubusercontent.com/kevinramos10/phone-market-data/refs/heads/main/phonesMock.json'

const CLIMA_API = 'https://api.open-meteo.com/v1/forecast?latitude=-12.05&longitude=-77.03&current_weather=true&timezone=America/Lima'

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

export const getClima = async () => {
    const response = await fetch(CLIMA_API)
    const data = await response.json() as ClimaResponse

    return data.current_weather
}
