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

    Mutations:
    {
        async addRestaurant (
            _:unknown,
            args: argsAdd,
            ctx: {restaurantCollection: Collection<RestaurantModel>}
        ): Promise<RestaurantModel>  {
            const {name, adress, city, phone} = args
            const insert = await ctx.restaurantCollection.insertOne( 
                {
                    name: name,
                    adress: adress,
                    city: city,
                    phone: phone
                }
            )

            return {
                _id : new ObjectId(insert.insertedId),
                name: name,
                adress: adress,
                city: city,
                phone: phone
            };
        }
    }
}