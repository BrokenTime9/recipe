// GET all documents
const findAllData = async (model) => {
  try {
    return await model.find();
  } catch (error) {
    throw new Error(`Error finding data: ${error.message}`);
  }
};

//GET data by query
const findOneData = async (model, query) => {
  try {
    return await model.findOne(query);
  } catch (error) {
    throw new Error(`Error finding data: ${error.message}`);
  }
};

// GET some documents based on a filter
const findSomeData = async (model, filter = {}) => {
  try {
    return await model.find(filter);
  } catch (error) {
    throw new Error(`Error finding filtered data: ${error.message}`);
  }
};

// GET by ID
const findDataById = async (model, id) => {
  try {
    return await model.findById(id);
  } catch (error) {
    throw new Error(`Error finding data by ID: ${error.message}`);
  }
};

// CREATE a new document
const createData = async (model, data) => {
  try {
    return await model.create(data);
  } catch (error) {
    throw new Error(`Error creating data: ${error.message}`);
  }
};

// UPDATE a document by ID
const updateDataById = async (model, id, update) => {
  try {
    return await model.findByIdAndUpdate(id, update, { new: true });
  } catch (error) {
    throw new Error(`Error updating data: ${error.message}`);
  }
};

// DELETE a document by ID
const deleteDataById = async (model, id) => {
  try {
    return await model.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Error deleting data: ${error.message}`);
  }
};

module.exports = {
  findAllData,
  findOneData,
  findSomeData,
  findDataById,
  createData,
  updateDataById,
  deleteDataById,
};
