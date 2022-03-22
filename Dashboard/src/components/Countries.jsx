import { NativeSelect } from "@material-ui/core";
import { useEffect, useState } from "react";
import { fetchCountries } from "../service/Covid";

const Countries = ({ handleCountryChange }) => {

    const [ countries, setCountries ] = useState([]);

    useEffect(() => {
        const fetchApi = async() => {
            setCountries(await fetchCountries());
        }
        fetchApi();
    }, [])

    return (
        <>
            <NativeSelect onChange = {(e) => handleCountryChange(e.target.value)}>
                { countries.map((country, i) => {
                    return (
                        <option key={i} value={country}>{country}</option>
                    )
                })}
            </NativeSelect>
        </>
    )
}

export default Countries;