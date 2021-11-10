import mongoose from "mongoose";

/**
 * ENVIRONMENT (.env || .env.local)
 **/
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || "db_pruebas";

const DB_USER = process.env.DB_USER || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
// URI si hay usuario en la BD o vacio
const strWithUser = DB_USER ? `${DB_USER}:${DB_PASSWORD}@` : "";

// URI de conexión a BD
const URI_Connection = `mongodb://${strWithUser}${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const MONGODB_URI = process.env.MONGODB_URI || URI_Connection;

if (!MONGODB_URI) {
	throw new Error(
		"Please define the MONGODB_URI environment variable inside .env.local"
	);
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let DB_cached = global.mongoose;

if (!DB_cached) {
	DB_cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
	if (DB_cached.conn) {
		return DB_cached.conn;
	}

	if (!DB_cached.promise) {
		const opts = {
			bufferCommands: false,
		};

		DB_cached.promise = mongoose.connect(MONGODB_URI, opts)
		.then( conn => {
			console.log(`Connected to database: ${conn.connection.name}`)
		})
		.catch( error => {
			console.error('*** Error connecting to database.\n', error)
		})
	}
	DB_cached.conn = await DB_cached.promise;
	
	return DB_cached.conn;
}

export default dbConnect;
