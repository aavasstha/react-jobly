import React, { useState, useContext } from "react";
import JoblyApi from "../Api/api";
import UserContext from "./UserContext";
import Alert from "../common/Alert";





function UserProfile() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        username: currentUser.username,
    });
    const [formErrors, setFormErrors] = useState([]);


    const [saveConfirmed, setSaveConfirmed] = useState(false);


    console.log("Current User object: ", currentUser)
    /** on form submit:
     * - attempt save to backend & report any errors
     * - if successful
     *   - clear previous error messages
     *   - show save-confirmed message
     *   - set current user info throughout the site
     */

    async function handleSubmit(evt) {
        evt.preventDefault();

        let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
        };

        let username = formData.username;
        let updatedUser;

        try {
            updatedUser = await JoblyApi.saveProfile(username, profileData);
        } catch (errors) {
            setFormErrors(errors);
            return;
        }

        setFormData(f => ({ ...f }));
        setFormErrors([]);
        setSaveConfirmed(true);

        // trigger reloading of user information throughout the site
        setCurrentUser(currentUser => ({
            ...currentUser,
            data: updatedUser
        }));
    }

    /** Handle form data changing */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({
            ...f,
            [name]: value,
        }));
        setFormErrors([]);
    }

    return (
        <div >
            <h3>Profile</h3>
            <div >
                <div >
                    <form>
                        <div >
                            <label >Username</label>
                            <input
                                disabled
                                placeholder={formData.username}
                            />
                        </div>
                        <div >
                            <label >First Name</label>
                            <input
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div >
                            <label >Last Name</label>
                            <input
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Email</label>
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        {formErrors.length
                            ? <Alert type="danger" messages={formErrors} />
                            : null}

                        {saveConfirmed
                            ?
                            <Alert type="success" messages={["Updated successfully."]} />
                            : null}

                        <div className="d-grid">
                            <button onClick={handleSubmit}>
                                Save Changes
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
