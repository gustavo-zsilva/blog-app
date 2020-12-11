import mongoose from 'mongoose';

interface Connection {
    isConnected ?: any;
}

const connection: Connection = {};

const connectToMongo = async () => {

    // Checar se já há conexão com o banco de dados
    if (connection.isConnected) return;

    // Criar instância de conexão com mongo e guardá-la em uma variável "db"
    const db = await mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    // Setar que conexão com banco de dados está estabelecida
    connection.isConnected = db.connection.readyState;

}

export default connectToMongo;