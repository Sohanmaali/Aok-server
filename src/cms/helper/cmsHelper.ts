export class CmsHelper {
  constructor() {}

  static create(req, model) {
    try {
      const data = req.body;
      
      return data;
    } catch (error) {
      console.error('Error creating new entry:', error);
      return error;
    }
  }
  static delete(req, model) {
    try {
      const data = req.body;
      //   const newEntry = new model(data);
      //   await newEntry.save();
      // console.log('New entry created:', data);
      return data;
    } catch (error) {
      console.error('Error creating new entry:', error);
      return error;
    }
  }

  static update(req, model) {
    try {
      const data = req.body;
      //   const newEntry = new model(data);
      //   await newEntry.save();
      // console.log('New entry created:', data);
      return data;
    } catch (error) {
      console.error('Error creating new entry:', error);
      return error;
    }
  }
  static get(req, model) {
    try {
      const data = req.body;
      //   const newEntry = new model(data);
      //   await newEntry.save();
      // console.log('New entry created:', data);
      return data;
    } catch (error) {
      console.error('Error creating new entry:', error);
      return error;
    }
  }
}

// Module.exports = CmsHelper;
