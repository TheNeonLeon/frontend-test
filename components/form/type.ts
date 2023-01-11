export interface FormDataProps {
    id: string;
    userInfo:{
        firstName: string;
        lastName: string;
        email: string;
        country: string;
        streetAdress: string;
        city: string;
        postalCode: number;
    }
    companyInfo: {
        companyName: string;
        isActive: boolean;
    }
}