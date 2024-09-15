import mongoose from 'mongoose';

export class CmsHelper {
  constructor() {}

  // Create a new entry
  static async create(req, model) {
    try {
      const data = req.body;
      const newEntry = new model(data);
      await newEntry.save();
      console.log('New entry created:', newEntry);
      return newEntry;
    } catch (error) {
      console.error('Error creating new entry:', error);
      throw new Error('Error creating new entry');
    }
  }

  // Delete an entry
  static async delete(req, model) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid ID');
      }
      const result = await model.findByIdAndDelete(id);
      if (!result) {
        throw new Error('Entry not found');
      }
      console.log('Entry deleted:', result);
      return result;
    } catch (error) {
      console.error('Error deleting entry:', error);
      throw new Error('Error deleting entry');
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
      const updatedEntry = await model.findByIdAndUpdate(id, data, { new: true });
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
  static async get(req, model) {
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
}
