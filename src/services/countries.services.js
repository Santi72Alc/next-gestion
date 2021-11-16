import countriesDB from 'countries-db'

export const getCountryData = ({ id = "ES", property = null }) => countriesDB.getCountry(id, property)
export const getAllCountries = () => countriesDB.getAllCountries()

export const getNames = () => {
    const countries = getAllCountries()
    const countriesId = Object.keys(countries)
    const dataToReturn = countriesId.map(id => {
        return { id, name: getCountryData({ id, property: 'name' }) }
    })
    return dataToReturn
}

export default {
    getCountryData,
    getAllCountries,
    getNames
}