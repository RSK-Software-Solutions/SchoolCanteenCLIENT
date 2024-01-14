
export type TLoginCredentials = {
    email: string;
    password: string;
};

export type TRegisterCredentials = {
    email: string;
    userName: string;
    password: string;
    role: string;
    comapanyName: string;
};



export type TUserPersonalData = {
    firstName: string;
    lastName: string;
    surname: string;
    email: string;
    phoneNumber: string;
};

export type TUserResidenceData = {
    street: string;
    state: string;
    city: string;
    country: string;
};