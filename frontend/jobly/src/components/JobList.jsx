import React, { useState, useEffect } from "react";
import Search from "../common/SearchForm";
import JobCardList from "./JobCardList";

import JoblyApi from "../Api/api";

/** Show page with list of jobs.
 *
 * On mount, loads jobs from API.
 * Re-loads filtered jobs on submit from search form.
 *
 * JobList -> JobCardList -> JobCard
 *
 * This is routed to at /jobs
 */

function JobList() {
    console.debug("JobList");

    const [jobs, setJobs] = useState(null);

    useEffect(function getAllJobsOnMount() {

        search();
    }, []);

    /** Triggered by search form submit; reloads jobs. */
    async function search(title) {
        let jobs = await JoblyApi.getJobs(title);
        setJobs(jobs);
    }

    if (!jobs) return <p>Loading...</p>;

    return (
        <div >
            <Search searchFor={search} />
            {jobs.length
                ? <JobCardList jobs={jobs} />
                : <p>Sorry, no results were found!</p>
            }
        </div>
    );
}

export default JobList;
