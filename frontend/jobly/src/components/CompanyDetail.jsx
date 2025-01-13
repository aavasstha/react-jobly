import React, { useEffect, useState } from 'react';
import JoblyApi from "../Api/api";
import { useParams } from 'react-router-dom';
import JobCardList from './JobCardList';


const CompanyDetail = () => {
    const { handle } = useParams();
    const [company, setCompany] = useState(null);

    useEffect(function getCompanyAndJobsForUser() {
        async function getCompany() {
            setCompany(await JoblyApi.getCompany(handle));
        }

        getCompany();
    }, [handle]);

    if (!company) return <p>Loading</p>;


    return (
        <div className="CompanyDetail col-md-8 offset-md-2">
            <h4 className="CompanyDetail">{company.name}</h4>
            <p className="CompanyDetail">{company.description}</p>
            {/* <JobCardList jobs={company.jobs} /> */}
            <JobCardList jobs={company.jobs} />
        </div>
    );
};

export default CompanyDetail;
