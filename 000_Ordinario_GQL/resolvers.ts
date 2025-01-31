import { Collection, ObjectId } from "mongodb";
import { RestaurantModel } from "./types.ts";

type argsAdd={
    name: string;
    adress: string;
    city: string;
    phone: string;
}

export const resolvers = {
    Query: 
    {
        
    },

    Mutation:
    {
        async addRestaurant (
            _:unknown,
            args: argsAdd,
            ctx: {restaurantCollection: Collection<RestaurantModel>}
        ): Promise<RestaurantModel>  {
            const {name, adress, city, phone} = args
            console.log(name+"  "+adress+"  "+city+"  "+phone)
            const {insertedId} = await ctx.restaurantCollection.insertOne(
                {
                    name: name,
                    adress: adress,
                    city: city,
                    phone: phone
                }
            )
            console.log(insertedId+"    "+name+"  "+adress+"  "+city+"  "+phone)

            return {
                name: name,
                adress: adress,
                city: city,
                phone: phone
            };
        }
    }
}