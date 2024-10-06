import mongoose from 'mongoose';

export class CmsHelper {
  constructor() {}

  static async findOne(req, model) {
    return model.findById({ _id: req.params.id });
  }

  // Create a new entry
  static async create(req, model) {
    try {
      const data = req.body;

      return await model.create(data);
    } catch (error) {
      console.error('Error creating new entry:', error);
      throw new Error('Error creating new entry');
    }
  }

  // Update an entry
  static async update(req, model) {
    try {
      const { id } = req.params;
      const data = req.body;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid ID');
      }
      const updatedEntry = await model.findByIdAndUpdate({ _id: id }, data, {
        new: true,
      });
      if (!updatedEntry) {
        throw new Error('Entry not found');
      }
      console.log('Entry updated:', updatedEntry);
      return updatedEntry;
    } catch (error) {
      console.error('Error updating entry:', error);
      throw new Error('Error updating entry');
    }
  }

  // Get an entry
  static async getAll(req, model) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid ID');
      }
      const entry = await model.findById(id);
      if (!entry) {
        throw new Error('Entry not found');
      }
      console.log('Entry retrieved:', entry);
      return entry;
    } catch (error) {
      console.error('Error retrieving entry:', error);
      throw new Error('Error retrieving entry');
    }
  }

  //MultiTrash
  static async multiTrash(req, model) {
    const ids = req.body.ids;
    const query = { delete_at: new Date() };
    const data = await model.updateMany({ _id: { $in: ids } }, { $set: query });
    return data;
  }

  //MultiRestore
  static async multiRestore(req, model) {
    const ids = req.body.ids;
    const query = { delete_at: null };
    console.log(ids);

    const data = await model.updateMany({ _id: { $in: ids } }, { $set: query });
    return data;
  }

  //MultiDelete
  static async multiDelete(req, model) {
    const ids = req.body.ids;
    const data = await model.deleteMany({ _id: { $in: ids } });
    return data;
  }
}
