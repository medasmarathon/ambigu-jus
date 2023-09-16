import { sampleSpaceCollection } from "@app/infrastructure/db"
import { toModel } from "@app/infrastructure/utility/mongo-to-model";
import { SampleSpace } from "@app/models/sample-space"
import { ObjectId } from "mongodb";

async function getById(id: string) {
  let collection = await sampleSpaceCollection<SampleSpace>();
  return toModel(await collection.findOne({ _id: new ObjectId(id) }));
}

async function create(sampleSpace: SampleSpace) {  
  let collection = await sampleSpaceCollection<SampleSpace>();
  delete sampleSpace.id;
  return await collection.insertOne(sampleSpace);
}

async function update(sampleSpace: SampleSpace) {  
  let collection = await sampleSpaceCollection<SampleSpace>();
  let id = sampleSpace.id;
  delete sampleSpace.id;
  return await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: { ...sampleSpace }
    },
  )
}

async function deleteById(id: string) {  
  let collection = await sampleSpaceCollection<SampleSpace>();
  return await collection.deleteOne({ _id: new ObjectId(id) });
}

export { getById, create, update, deleteById }
