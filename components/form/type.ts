export interface FormDataProps {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    streetAdress: string;
    city: string;
    postalCode: number;
    company: {
        companyName: string;
        isActive: boolean;
    }
}