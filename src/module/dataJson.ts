// Tipado de un celular
export interface Phone {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    thumbnail: string
    images: Array<string>
}

export interface ClimaResponse {
    current_weather: CurrentWeather
}

export interface CurrentWeather {
    temperature: number
}