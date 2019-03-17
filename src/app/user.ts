export interface User {
    id: number;
    name: string;
    username: string;
    phone: string;
    website: string;
    company: {
        name: string;
        bs: string;
        catchPhrase: string;
    };
    address: {
        city: string;
        street: string;
        suite: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        }
    };
}
