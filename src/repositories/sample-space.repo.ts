import { sampleSpaceCollection } from "@app/infrastructure/db"
import { SampleSpace } from "@app/models/sample-space"

async function getById(id: number) {
  let collection = await sampleSpaceCollection<SampleSpace>();
  return await collection.findOne({
    _id: id
  })
}

async function create(sampleSpace: SampleSpace) {  
  let collection = await sampleSpaceCollection<SampleSpace>();
  return await collection.insertOne(sampleSpace);
}

async function update(sampleSpace: SampleSpace) {  
  let collection = await sampleSpaceCollection<SampleSpace>();
  return await collection.updateOne(
    { _id: sampleSpace._id },
    sampleSpace
  )
}

export { getById, create, update }
