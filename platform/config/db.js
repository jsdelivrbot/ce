let url =  process.env.MONGO_URL || 'localhost:27017';

module.exports = {
  db: `mongodb://${url}/ce`
};
