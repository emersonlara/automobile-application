import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Vehicle } from "./vehicle";
import { request, gql } from 'graphql-request';

@Resolver(of => Vehicle)
export class AutomobileResolver{

    @Query(() => [Vehicle])
    async vehicles() {

        const query = gql`query MyQuery {
          allVehicles {
            nodes {
              id
              make
              engineNumber
              model
              year
            }
          }
        }` 

          return request('http://localhost:5000/graphql', query).then((data) => {
            return data.allVehicles.nodes;
          });       
    } 

    /**
   * update a vehicle resolver
   * @param updateVehicleInput 
   * @returns  
   */
  @Mutation(returns => Vehicle)
  async updateVehicle(
    @Args({ name: 'id', type: () => Int }) id: number,
    @Args({ name: 'firstName', type: () => String }) firstName: string,
    @Args({ name: 'lastName', type: () => String }) lastName: string,
    @Args({ name: 'vinNumber', type: () => String }) vinNumber: string,
    @Args({ name: 'email', type: () => String }) email: string) {

    const mutation = gql`mutation MyMutation {
      updateVehicleById(
        input: {vehiclePatch: {email: "${email}", firstName: "${firstName}", lastName: "${lastName}", vinNumber: "${vinNumber}"}, id: ${id}}
      ) {
        vehicle {
          email
          firstName
          lastName
          vinNumber
        }
      }
    }
    `
    return await request('http://localhost:5000/graphql', mutation).then((data) => {
      return data.updateVehicleById.vehicle;
    });
  }

  /**
   * delete a vehicle resolver
   * @param deleteVehicleInput 
   */
  @Mutation(() => Vehicle)
  async deleteVehicle(@Args('id', { type: () => Int }) id: number) {
    const mutation = gql`
        mutation MyMutation {
          deleteVehicleById(input: {id: ${id}}) {
            vehicle {
              id
            }
          }
        }
        `
    return await request('http://localhost:5000/graphql', mutation).then((data) => {
      return data.deleteVehicleById;
    });
  }

}