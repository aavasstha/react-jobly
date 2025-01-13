import React, { useState, useEffect } from "react";
import SearchForm from "./SearchCompanyForm";
import JoblyApi from "../Api/api";
import CompanyCard from "./CompanyCard";


function Companies() {
    const [companies, setCompanies] = useState([]);

    useEffect(function getCompaniesOnMount() {
        search()
    }, []);


    /** Triggered by search form submit; reloads companies. */
    async function search(name) {
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies);
    }

    if (!companies) return <p>Loading...</p>;
    return (
        <div className="CompanyList col-md-8 offset-md-2">
            <SearchForm searchFor={search} />
            {companies.length
                ? (
                    <div className="CompanyList-list">
                        {companies.map(c => (
                            <CompanyCard
                                key={c.handle}
                                handle={c.handle}
                                name={c.name}
                                description={c.description}
                                logoUrl={c.logoUrl}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="lead">Sorry, no results were found!</p>
                )}
        </div>
    )
}

export default Companies;
