// src/components/UserSettings.js
import React, {useContext, useState} from 'react';
import axios from 'axios';
import {AuthContext} from '../../Context/AuthContext';
import {handleChangeInput} from "../../Logic/HandlingChangeInput";

const UserSettings = () => {
    const [selectedOption, setSelectedOption] = useState('email');
    const [selectedOptionValue, setSelectedOptionValue] = useState('');
    const [password, setPassword] = useState('');
    const [residence, setResidence] = useState({
        Street: '',
        city: '',
        postalCode: '',
    });

    const userSession = useContext(AuthContext);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const optionFields = {
        email: [
            {
                label: 'New Email',
                type: 'text',
                id: 'email',
                state: selectedOptionValue,
                setState: setSelectedOptionValue,
            },
            {
                label: 'Confirm Password',
                type: 'password',
                id: 'confirmPassword',
                state: password,
                setState: setPassword,
            },
        ],
         password: [
            {
                label: 'New Password',
                type: 'password',
                id: 'password',
                state: selectedOptionValue,
                setState: setSelectedOptionValue,
            },
            {
                label: 'Confirm Password',
                type: 'password',
                id: 'confirmPassword',
                state: password,
                setState: setPassword,
            },
        ],
        residence: [
            {
                label: 'Street (Street)',
                type: 'text',
                id: 'Street',
                state: residence.Street,
                setState: (value) => handleChangeInput(setResidence, residence, {target: {value}}, 'Street'),
            },
            {
                label: 'City',
                type: 'text',
                id: 'city',
                state: residence.city,
                setState: (value) => handleChangeInput(setResidence, residence, {target: {value}}, 'city'),
            },
            {
                label: 'Postal Code',
                type: 'text',
                id: 'postalCode',
                state: residence.postalCode,
                setState: (value) =>
                    handleChangeInput(setResidence, residence, {target: {value}}, 'postalCode'),
            },
            {
                label: 'Confirm Password',
                type: 'password',
                id: 'confirmPassword',
                state: password,
                setState: setPassword,
            }
        ],
    };

    const data = {
        selectedOption: selectedOptionValue,
        confirmedPassword: password,
        residence: {...residence},
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/update/user/${userSession.token}/* <--here will be the id of user*/`, data)
    };

    const options = ['email', 'password', 'residence'];

    return (
        <div className="flex">
            <div className="flex">
                {/* Left Column - Options List */}
                <div className="w-[350px] bg-gray-200 p-4">
                    <h2 className="text-lg font-bold mb-4">Options</h2>
                    <ul>
                        {options.map((option) => (
                            <li
                                key={option}
                                className={`cursor-pointer mb-2 ${selectedOption === option ? 'font-semibold' : ''}`}
                                onClick={() => handleOptionChange(option)}
                            >
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Column - Form */}
                <div className="w-full p-4">
                    <h2 className="text-lg font-bold mb-4">
                        {selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)} Settings
                    </h2>
                    <form onSubmit={handleSubmit}>
                        {optionFields[selectedOption].map((field) => (
                            <div key={field.id} className="mb-4">
                                <label htmlFor={field.id} className="block text-sm font-medium text-gray-600">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    id={field.id}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    value={field.state}
                                    onChange={(e) => field.setState(e.target.value)}
                                />
                            </div>
                        ))}
                    </form>
                    <div className="flex justify-center w-full">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserSettings;
