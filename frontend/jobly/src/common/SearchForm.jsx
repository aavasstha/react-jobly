import React, { useState } from "react";

/** Search widget.
 *
 * Appears on CompanyList and JobList so that these can be filtered
 * down.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 *
 * { CompanyList, JobList } -> SearchForm
 */

function SearchForm({ searchFor }) {


    const [searchTerm, setSearchTerm] = useState("");

    /** Tell parent to filter */
    function handleSubmit(evt) {
        // take care of accidentally trying to search for just spaces
        evt.preventDefault();
        searchFor(searchTerm.trim() || undefined);
        setSearchTerm(searchTerm.trim());
    }

    /** Update form fields */
    function handleChange(evt) {
        setSearchTerm(evt.target.value);
    }

    return (
        <div >
            <form onSubmit={handleSubmit}>
                <div >
                    <div >
                        <input
                           
                            name="searchTerm"
                            placeholder="Enter search term.."
                            value={searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div >
                        <button type="submit" >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SearchForm;
