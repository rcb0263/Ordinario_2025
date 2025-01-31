import { Collection, ObjectId } from "mongodb";
import { RestaurantModel } from "./types.ts";

type argsAdd={
    name: string;
    adress: string;
    city: string;
    phone: string;
}
type argsgetOne={
    id: string
}
type argsgetAll={
    id?: string
}
type argsDel={
    id: string
}

export const resolvers = {
    Query: 
    {
        async getRestaurant(
            _:unknown,
            args: argsgetOne,
            ctx: {restaurantCollection: Collection<RestaurantModel>}
        ) : Promise<RestaurantModel> {
            const {id} = args
            const restaurant = await ctx.restaurantCollection.findOne({_id : new ObjectId(id)})
            if (!restaurant){
                throw new Error("Could not find id"+ 404);
            }
            /*
            const city = restaurant.city
            const MONGO_URL = Deno.env.get("API_KEY");

            const request = require('request');
            const result = request.get({
              url: 'https://api.api-ninjas.com/v1/city?name='+city.toString(),
              headers: {
                'X-Api-Key': MONGO_URL
              },
            });
            console.log("res1="+result)
            const result2 = request.get({
                url: 'https://api.api-ninjas.com/v1/worldtime?lat='+result.latitude+'&long='+result.logitud,
                headers: {
                  'X-Api-Key': MONGO_URL
                },
              });
              console.log("res1="+result2)
*/
            return {
                _id: new ObjectId(id),
                name: restaurant.name,
                adress: restaurant.adress,
                city: restaurant.city,
                phone: restaurant.phone,
                //temp: "wertyui",
                //time: result2.hour+":"+result2.minute
            };
        },
        async getRestaurants(
            _:unknown,
            __: unknown,
            ctx: {restaurantCollection: Collection<RestaurantModel>}
        ) : Promise<RestaurantModel[]> {
            const restaurant = await ctx.restaurantCollection.find().toArray()
            if (!restaurant){
                throw new Error("Could not find id"+ 404);
            }

            return restaurant;
            }    
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
                _id: insertedId,
                name: name,
                adress: adress,
                city: city,
                phone: phone
            };
        },
        async deleteRestaurant(
            _:unknown,
            args: argsDel,
            ctx: {restaurantCollection: Collection<RestaurantModel>}
        ): Promise<boolean>{
            const {id} = args
            const {deletedCount} = await ctx.restaurantCollection.deleteOne({_id : new ObjectId(id)}) 
            if(deletedCount === 0){
                return false
            }else{
                return true;
            }
        }
    }
}