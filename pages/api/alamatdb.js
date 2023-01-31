const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;
// mengambil data dari collection Transaksi
async function getAlamat(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // fetch the posts
        let provinces = await db
            .collection('provinces')
            .find({})
            .sort({ idMitra: -1 })
            .toArray();
        let regencies = await db
            .collection('regencies')
            .find({})
            .sort({ idMitra: -1 })
            .toArray();
        let districts = await db
            .collection('districts')
            .find({})
            .sort({ idMitra: -1 })
            .toArray();
        let villages = await db
            .collection('villages')
            .find({})
            .sort({ idMitra: -1 })
            .toArray();
        let hasil = {}
        hasil['provinces'] = provinces
        hasil['regencies'] = regencies
        hasil['districts'] = districts
        hasil['villages'] = villages
        // return the posts
        return res.json({
            message: JSON.parse(JSON.stringify(hasil)),
            success: true,
        });
    } catch (error) {
        // return the error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

async function updateMitra(req, res) {
    const { namaVenue,
        namaPemilikVenue,
        alamat,
        noWa,
        instagram,
        kategori,
        hariOperasional,
        jamOperasional,
        fasilitas,
        opsiBayar,
        rekening,
        namaAdmin,
        noWaAdmin,
        username,
        password,
        fotoVenue,
        objectId,
        namaVenueLama } = req.body
    var ObjectId = require('mongodb').ObjectId;
    const convertedObjectId = new ObjectId(objectId);
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // update the published status of the post
        await db.collection('mitra').updateOne(
            {
                '_id': convertedObjectId
            },
            {
                $set: {
                    'namaVenue': namaVenue,
                    'namaPemilikVenue': namaPemilikVenue,
                    'alamat': alamat,
                    'noWa': noWa,
                    'instagram': instagram,
                    'kategori': kategori,
                    'hariOperasional': hariOperasional,
                    'jamOperasional': jamOperasional,
                    'fasilitas': fasilitas,
                    'opsiBayar': opsiBayar,
                    'rekening': rekening,
                    'namaAdmin': namaAdmin,
                    'noWaAdmin': noWaAdmin,
                    'username': username,
                    'password': password,
                    'fotoVenue': fotoVenue
                }
            }
        );
        await db.collection('favorit').updateOne(
            {
                'namaVenue': namaVenueLama
            },
            {
                $set: {
                    'namaVenue': namaVenue,
                    'namaPemilikVenue': namaPemilikVenue,
                    'alamat': alamat,
                    'noWa': noWa,
                    'instagram': instagram,
                    'kategori': kategori,
                    'hariOperasional': hariOperasional,
                    'jamOperasional': jamOperasional,
                    'fasilitas': fasilitas,
                    'opsiBayar': opsiBayar,
                    'rekening': rekening,
                    'namaAdmin': namaAdmin,
                    'noWaAdmin': noWaAdmin,
                    'username': username,
                    'password': password,
                    'fotoVenue': fotoVenue
                }
            }
        );
        // return a message
        return res.json({
            message: 'Post updated successfully',
            success: true,
        });
    } catch (error) {
        // return an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

// menambah data kedalam collection Transaksi
async function addMitra(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // add the post
        await db.collection('mitra').insertOne(JSON.parse(req.body));
        // return a message
        return res.json({
            message: 'Mitra Telah di Tambahkan',
            success: true,
        });
    } catch (error) {
        // return an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

async function deleteMitra(req, res) {
    var ObjectId = require('mongodb').ObjectId;
    const { _id } = req.body;
    const { namaVenue } = req.body;
    const convertedObjectId = new ObjectId(_id);
    try {
        // Connecting to the database
        let { db } = await connectToDatabase();
        // Deleting the post
        await db.collection('favorit').deleteMany({
            'namaVenue': namaVenue
        });
        await db.collection('mitra').deleteOne({
            '_id': convertedObjectId
        });
        // returning a message
        return res.json({
            message: 'Post deleted successfully',
            success: true,
        });
    } catch (error) {
        // returning an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

// CRUD handler
export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getAlamat(req, res);
        }
        case 'POST': {
            return addMitra(req, res);
        }
        case 'PUT': {
            return updateMitra(req, res);
        }
        case 'DELETE': {
            return deleteMitra(req, res);
        }
    }
}