import { connect, connection } from 'mongoose';
const MONGO_URI = process.env.MONGO_URI;


connect(MONGO_URI!);
connection.once('open', () => {
  console.log('Database Connected');
});

connection.on('error', (err) => {
  console.log('Mongodb connection error:', err);
  process.exit(1);
});