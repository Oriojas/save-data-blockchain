import { BigInt } from "@graphprotocol/graph-ts";
import { newData } from "../generated/YourContract/YourContract";
import { pushData } from "../generated/schema";

export function handlenewData(event: newData): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = pushData.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new pushData(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.amount = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.amount = entity.amount.plus(BigInt.fromI32(2))
  

  // Entity fields can be set based on event parameters
  entity.origin = event.params.origin
  entity.destination = event.params.destination
  entity.name = event.params.name
  entity.description = event.params.description
  entity.status = event.params.status
  entity.create = event.block.timestamp

  // Entities can be written to the store with `.save()`
  entity.save()
}
