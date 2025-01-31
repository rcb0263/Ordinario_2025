import { OptionalId } from "mongodb";

//CODIGO PROPIO
export type Restaurant = {
    name: string;
    adress: string;
    city: string;
    phone: string;
}

//MONGODB
export type RestaurantModel = OptionalId<{
    name: string;
    adress: string;
    city: string;
    phone: string;
}>