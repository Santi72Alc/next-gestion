import countriesDB from 'countries-db'

export const getCountryData = ({ id = "ES", property = null }) => countriesDB.getCountry(id, property)
export const getAllCountries = () => countriesDB.getAllCountries()

export const getNames = () => {
    const countries = getAllCountries()
    const namesToReturn = Object.keys(countries).map(id => {
        return { id, name: getCountryData({ id, property: 'name' }) }
    })
    return namesToReturn
}

export default {
    getCountryData,
    getAllCountries,
    getNames
}