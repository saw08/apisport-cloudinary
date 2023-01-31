
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import rupiah from '../../components/Rupiah';

export default function Updetlapangan() {
    let router = useRouter()
    const { namaVenue,
        namaLapangan,
        deskripsi,
        gambarStringify,
        jadwalPagi,
        jadwalSore,
        jadwalMalam,
        hargaPagi,
        hargaPagiWeekend,
        hargaSore,
        hargaSoreWeekend,
        hargaMalam,
        hargaMalamWeekend,
        minOrder } = router.query
    const [_namaVenue, setNamaVenue] = useState('');
    const [_namaLapangan, setNamaLapangan] = useState('');
    const [_deskripsi, setDeskripsi] = useState('');

    //Jadwal
    const [_jadwalPagi, setJadwalPagi] = useState({});
    const [_jadwalMalam, setJadwalMalam] = useState({});
    const [_jadwalSore, setJadwalSore] = useState({});

    const [jadwalTampilan, setJadwalTampilan] = useState([]);
    const [hargaTampilan, setHargaTampilan] = useState([]);

    //Harga
    const [_hargaPagi, setHargaPagi] = useState(hargaPagi);
    const [_hargaSore, setHargaSore] = useState(hargaSore);
    const [_hargaMalam, setHargaMalam] = useState(hargaMalam);

    //Harga Weekend
    const [_hargaPagiWeekend, setHargaPagiWeekend] = useState(hargaPagiWeekend);
    const [_hargaSoreWeekend, setHargaSoreWeekend] = useState(hargaSoreWeekend);
    const [_hargaMalamWeekend, setHargaMalamWeekend] = useState(hargaMalamWeekend);

    const [_gambar, setGambar] = useState([]);
    const [_gambarNew, setGambarNew] = useState([]);
    const [_minOrder, setMinOrder] = useState(false)
    const [image, setImage] = useState([]);
    const [createObjectURL, setCreateObjectURL] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    //uploading
    const [uploading, setUploading] = useState(false)

                                                                                                                                  


    useEffect(() => {
        if (typeof namaVenue == 'string') {
            setNamaVenue(namaVenue)

        }
        if (typeof namaLapangan == 'string') {
            setNamaLapangan(namaLapangan)
        }
        if (typeof deskripsi == 'string') {
            setDeskripsi(deskripsi)
        }
        if (typeof gambarStringify == 'string') {
            setGambar(Object.assign(_gambar, JSON.parse(gambarStringify)))
            console.log(gambarStringify)
            console.log(_gambar)
        }
        if (typeof jadwalPagi == 'string') {
            setJadwalPagi(Object.assign(_jadwalPagi, JSON.parse(jadwalPagi)))
        }
        if (typeof jadwalSore == 'string') {
            setJadwalMalam(Object.assign(_jadwalSore, JSON.parse(jadwalSore)))
        }if (typeof jadwalMalam == 'string') {
            setJadwalMalam(Object.assign(_jadwalMalam, JSON.parse(jadwalMalam)))
        }
        if (typeof minOrder == 'string') {
            setMinOrder(minOrder)
            if (minOrder == 'true') {
                document.getElementById('minOrderCheck').checked = true
            }
        }
        lihatJadwalOtomatis()
    }, [namaVenue,
        namaLapangan,
        deskripsi,
        gambarStringify,
        jadwalPagi,
        jadwalSore,
        jadwalMalam,
        hargaPagi,
        hargaSore,
        hargaMalam,
        minOrder
    ])

    const handlePost = async (e) => {
        e.preventDefault();
        setCheck();
        setUploading(true)

        //Cloudinary Update
        const body = new FormData();
        let imageUrl = []

        body.append('upload_preset', 'my-uploads');
        //console.log("file", image)
        for (let i = 0; i < image.length; i++) {
            await body.append("file", image[i]);
            const response = await fetch('https://api.cloudinary.com/v1_1/api-sport/image/upload', {
                method: "POST",
                body
            }).then(r => r.json());
            // await console.log(response)
            // await console.log('Secure URL')
            // await console.log(response.secure_url)
            imageUrl.push(response.secure_url)

            // console.log('Secure URL Array')
            // console.log(imageUrl)
        }
        for (let i = 0; i < _gambar.length; i++) {
            imageUrl.push(_gambar[i])
        }
        setGambar(Object.assign(_gambar, imageUrl))
        //Uploading
        if (imageUrl.length != 0) {
            setUploading(false)
        }
        //Uploading
        // console.log('Image URL')
        // console.log(imageUrl)

        // console.log('Secure URL State')
        // console.log(gambar)

        //Cloudinary END

        // reset error and message
        setError('');
        setMessage('');
        // fields check
        try {
            // Update post
            await fetch('/api/lapangandb', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    namaVenue: namaVenue,
                    namaLapangan: _namaLapangan,
                    namaLapanganOld: namaLapangan,
                    deskripsi: _deskripsi,
                    gambar: _gambar,
                    jadwalPagi: _jadwalPagi,
                    jadwalSore: _jadwalSore,
                    jadwalMalam: _jadwalMalam,
                    hargaPagi: _hargaPagi,
                    hargaPagiWeekend: _hargaPagiWeekend,
                    hargaSore: _hargaSore,
                    hargaSoreWeekend: _hargaSoreWeekend,
                    hargaMalam: _hargaMalam,
                    hargaMalamWeekend: _hargaMalamWeekend,
                    minOrder: _minOrder
                }),
            });
            // reload the page
            alert('Data sukses diupdate')
            return router.push('/mitra/home');
        } catch (error) {
            // Stop publishing state
            console.log('Not Working')
            return setUpdating(false);
        }



    };

    const setCheck = () => {
        let orderMin = false
        let checkbox = document.getElementById('minOrderCheck')
        if (checkbox.checked) {
            setMinOrder(true)
            orderMin = true
            console.log(orderMin)
            console.log(minOrder)
        } else {
            setMinOrder(false)
            orderMin = false
            console.log(orderMin)
            console.log(minOrder)
        }
    };

    const bagiJamPagi = () => {
        let pagiMulai = parseInt(document.getElementById('jamPagiMulai').value);
        let pagiAkhir = parseInt(document.getElementById('jamPagiAkhir').value);
        let selisih = pagiAkhir - pagiMulai
        console.log(`Initial value: ${pagiMulai}`)
        if (Object.keys(jadwalPagi).length > 0) {
            for (let key in _jadwalPagi) {
                delete _jadwalPagi[key]
            }
            for (let i = 0; i < selisih; i++) {
                if (pagiMulai < 10 && (pagiMulai + 1) >= 10) {
                    setJadwalPagi(Object.assign(_jadwalPagi, { [`0${pagiMulai}.00-${pagiMulai + 1}.00`]: 'kosong' }))
                } else if (pagiMulai < 10 && (pagiMulai + 1) < 10) {
                    setJadwalPagi(Object.assign(_jadwalPagi, { [`0${pagiMulai}.00-0${pagiMulai + 1}.00`]: 'kosong' }))
                } else {
                    setJadwalPagi(Object.assign(_jadwalPagi, { [`${pagiMulai}.00-${pagiMulai + 1}.00`]: 'kosong' }))
                }
                pagiMulai = pagiMulai + 1
            }
        } else {
            for (let i = 0; i < selisih; i++) {
                if (pagiMulai < 10 && (pagiMulai + 1) >= 10) {
                    setJadwalPagi(Object.assign(_jadwalPagi, { [`0${pagiMulai}.00-${pagiMulai + 1}.00`]: 'kosong' }))
                } else if (pagiMulai < 10 && (pagiMulai + 1) < 10) {
                    setJadwalPagi(Object.assign(_jadwalPagi, { [`0${pagiMulai}.00-0${pagiMulai + 1}.00`]: 'kosong' }))
                } else {
                    setJadwalPagi(Object.assign(_jadwalPagi, { [`${pagiMulai}.00-${pagiMulai + 1}.00`]: 'kosong' }))
                }
                pagiMulai = pagiMulai + 1
            }
        }

        console.log('Jadwal Pagi Update:')
        console.log(pagiMulai)
        console.log(_jadwalPagi)
        return selisih
    }

    const bagiJamSore = () => {
        let soreMulai = parseInt(document.getElementById('jamSoreMulai').value);
        let soreAkhir = parseInt(document.getElementById('jamSoreAkhir').value);
        let selisih = soreAkhir - soreMulai
        console.log(`Initial value: ${soreMulai}`)
        if (Object.keys(_jadwalSore).length > 0) {
            for (let key in _jadwalSore) {
                delete _jadwalSore[key]
            }
            for (let i = 0; i < selisih; i++) {
                if (soreMulai < 10 && (soreMulai + 1) >= 10) {
                    setJadwalSore(Object.assign(_jadwalSore, { [`0${soreMulai}.00-${soreMulai + 1}.00`]: 'kosong' }))
                } else if (soreMulai < 10 && (soreMulai + 1) < 10) {
                    setJadwalSore(Object.assign(_jadwalSore, { [`0${soreMulai}.00-0${soreMulai + 1}.00`]: 'kosong' }))
                } else {
                    setJadwalSore(Object.assign(_jadwalSore, { [`${soreMulai}.00-${soreMulai + 1}.00`]: 'kosong' }))
                }
                soreMulai = soreMulai + 1
            }
        } else {
            for (let i = 0; i < selisih; i++) {
                if (soreMulai < 10 && (soreMulai + 1) >= 10) {
                    setJadwalSore(Object.assign(_jadwalSore, { [`0${soreMulai}.00-${soreMulai + 1}.00`]: 'kosong' }))
                } else if (soreMulai < 10 && (soreMulai + 1) < 10) {
                    setJadwalSore(Object.assign(_jadwalSore, { [`0${soreMulai}.00-0${soreMulai + 1}.00`]: 'kosong' }))
                } else {
                    setJadwalSore(Object.assign(_jadwalSore, { [`${soreMulai}.00-${soreMulai + 1}.00`]: 'kosong' }))
                }
                soreMulai = soreMulai + 1
            }
        }
        console.log(selisih)
        console.log('Jadwal Sore:')
        console.log(_jadwalSore)
        return selisih
    }

    const bagiJamMalam = () => {
        let malamMulai = parseInt(document.getElementById('jamMalamMulai').value);
        let malamAkhir = parseInt(document.getElementById('jamMalamAkhir').value);
        if (malamAkhir == 0) {
            malamAkhir = 24
        }
        let selisih = malamAkhir - malamMulai
        if (Object.keys(_jadwalMalam).length > 0) {
            for (let key in _jadwalMalam) {
                delete _jadwalMalam[key]
            }
            for (let i = 0; i < selisih; i++) {
                if (malamMulai < 10 && (malamMulai + 1) >= 10) {
                    setJadwalMalam(Object.assign(_jadwalMalam, { [`0${malamMulai}.00-${malamMulai + 1}.00`]: 'kosong' }))
                } else if (malamMulai < 10 && (malamMulai + 1) < 10) {
                    setJadwalMalam(Object.assign(_jadwalMalam, { [`0${malamMulai}.00-0${malamMulai + 1}.00`]: 'kosong' }))
                } else {
                    setJadwalMalam(Object.assign(_jadwalMalam, { [`${malamMulai}.00-${malamMulai + 1}.00`]: 'kosong' }))
                }
                malamMulai = malamMulai + 1
            }
        } else {
            for (let i = 0; i < selisih; i++) {
                if (malamMulai < 10 && (malamMulai + 1) >= 10) {
                    setJadwalMalam(Object.assign(_jadwalMalam, { [`0${malamMulai}.00-${malamMulai + 1}.00`]: 'kosong' }))
                } else if (malamMulai < 10 && (malamMulai + 1) < 10) {
                    setJadwalMalam(Object.assign(_jadwalMalam, { [`0${malamMulai}.00-0${malamMulai + 1}.00`]: 'kosong' }))
                } else {
                    setJadwalMalam(Object.assign(_jadwalMalam, { [`${malamMulai}.00-${malamMulai + 1}.00`]: 'kosong' }))
                }
                malamMulai = malamMulai + 1
            }
        }

        console.log('Jadwal Malam Update:')
        console.log(malamMulai)
        console.log(_jadwalMalam)
        return selisih
    }

    const gabungJadwal = () => {
        let keyJadwalPagi = Object.keys(_jadwalPagi)
        let keyJadwalMalam = Object.keys(_jadwalMalam)
        let keyJadwalSore = Object.keys(_jadwalSore)
        let gabunganJadwal1 = keyJadwalPagi.concat(keyJadwalSore)
        let gabunganJadwal = gabunganJadwal1.concat(keyJadwalMalam)
        return gabunganJadwal
    }

    const gabungHarga = () => {
        let gabunganHarga = []

        //Pagi
        let pagiMulai = parseInt(document.getElementById('jamPagiMulai').value);
        let pagiAkhir = parseInt(document.getElementById('jamPagiAkhir').value);
        let selisihPagi = pagiAkhir - pagiMulai
        for (let i = 0; i < selisihPagi; i++) {
            gabunganHarga.push(_hargaPagi)
        }

        //Sore
        let soreMulai = parseInt(document.getElementById('jamSoreMulai').value);
        let soreAkhir = parseInt(document.getElementById('jamSoreAkhir').value);
        let selisihSore = soreAkhir - soreMulai
        for (let i = 0; i < selisihSore; i++) {
            gabunganHarga.push(_hargaSore)
        }

        //Malam
        let malamMulai = parseInt(document.getElementById('jamMalamMulai').value);
        let malamAkhir = parseInt(document.getElementById('jamMalamAkhir').value);
        if (malamAkhir == 0) {
            malamAkhir = 24
        }
        let selisihMalam = malamAkhir - malamMulai
        for (let i = 0; i < selisihMalam; i++) {
            gabunganHarga.push(_hargaMalam)
        }

        return gabunganHarga
    }

    const gabungHargaOtomatis = () => {
        let gabunganHarga = []
        let keyJadwalPagi = Object.keys(_jadwalPagi)
        let keyJadwalSore = Object.keys(_jadwalSore)
        let keyJadwalMalam = Object.keys(_jadwalMalam)
        //Pagi
        for (let i = 0; i < keyJadwalPagi.length; i++) {
            gabunganHarga.push(_hargaPagi)
        }

        //Sore
        for (let i = 0; i < keyJadwalSore.length; i++) {
            gabunganHarga.push(_hargaSore)
        }

        //Malam
        for (let i = 0; i < keyJadwalMalam.length; i++) {
            gabunganHarga.push(_hargaMalam)
        }
        console.log('Harga On Load')
        console.log(_hargaPagi);
        console.log(_hargaSore);
        console.log(_hargaMalam)
        return gabunganHarga
    }

    const lihatJadwal = () => {

        bagiJamPagi()
        bagiJamSore()
        bagiJamMalam()
        let gabunganJadwal = gabungJadwal()
        let gabunganHarga = gabungHarga()
        setJadwalTampilan(gabunganJadwal)
        setHargaTampilan(gabunganHarga)

        // console.log('Jadwal Gabung')
        // console.log(gabunganJadwal)
        // console.log('Harga Gabung')
        // console.log(gabunganHarga)

    }

    const lihatJadwalOtomatis = () => {

        let gabunganJadwal = gabungJadwal()
        let gabunganHarga = gabungHargaOtomatis()

        setJadwalTampilan(gabunganJadwal)
        setHargaTampilan(gabunganHarga)
        console.log(hargaTampilan)
        console.log('Gabungan Harga:')
        console.log(gabunganHarga)
        // console.log('Jadwal Gabung')
        // console.log(gabunganJadwal)
        // console.log('Harga Gabung')
        // console.log(gabunganHarga)

    }

    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            var x = document.getElementById("image");
            const i = event.target.files[0];
            setGambarNew(array => [...array, i.name])
            setImage(array => [...array, i]);
            setCreateObjectURL(array => [...array, URL.createObjectURL(i)]);
        }
        console.log('Upload to Client')
        console.log(_gambarNew)
        console.log(image)
        console.log(createObjectURL)
    };


    const gabungGambar = () => {
        let gambarGabung = _gambar.concat(_gambarNew)
        setGambar(Object.assign(_gambar, gambarGabung))
        console.log('Gambar New:')
        console.log(_gambarNew)
        console.log('Gambar Sudah Di Push Variabel:')
        console.log(gambarGabung)
        console.log('Gambar Sudah Di Push:')
        console.log(_gambar)
    }

    const removeItemArrayGambar = (data) => {
        var index = _gambar.indexOf(data)
        if (index >= 0) {
            if (_gambar.length === 0) {
                setGambar([])
            } else {
                setGambar(array => [...array.slice(0, index), ...array.slice(index + 1)])
            }
        }
    }

    const removeItemArrayGambarNew = (data) => {
        var index = _gambarNew.indexOf(data)
        if (index >= 0) {
            if (_gambarNew.length === 0) {
                setGambarNew([])
                setImage([])
                setCreateObjectURL([])
            } else {
                setGambarNew(array => [...array.slice(0, index), ...array.slice(index + 1)])
                setImage(array => [...array.slice(0, index), ...array.slice(index + 1)])
                setCreateObjectURL(array => [...array.slice(0, index), ...array.slice(index + 1)])
            }
        }
    }

    return (
        <div className="container-xxl mx-auto p-4 header-2-2">
            <h1 style={{ color: 'black' }}>Update Lapangan</h1>

            <div >
                <form className='' onSubmit={handlePost}>
                    {error ? (
                        <div >
                            <h4 >{error}</h4>
                        </div>
                    ) : null}
                    {message ? (
                        <div >
                            <h4 >{message}</h4>
                        </div>
                    ) : null}
                    <div className="col-md-12">
                        <label className="labels">Nama Lapangan</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                        <input type="text" className="form-control"
                            name="namaLapangan"
                            value={_namaLapangan}
                            onChange={(e) => setNamaLapangan(e.target.value)}
                            required />
                    </div>
                    <div className="mt-2 col-md-12"><label className="labels ">Deskripsi Lapangan</label>
                        <i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                        <textarea className="form-control mb-3"
                            id="exampleFormControlTextarea1" rows={3}
                            name="deskripsi"
                            value={_deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                            required />
                    </div>
                    <div className="mt-2 col-12 col-md-12"><label className="labels">Foto Lapangan</label>
                        <i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                        <div className="mt-2 col-md-12">
                            <div className="custom-file">
                                <input type="file"
                                    onChange={uploadToClient}
                                    className="custom-file-input"
                                    id="validatedCustomFile" name="myImage" />
                                <label className="custom-file-label" htmlFor="validatedCustomFile">Choose file...</label>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 col-12 col-md-12"><label className="labels">Foto Lapangan</label>
                        {_gambar.length === 0 ? (
                            <h4>Daftar Foto</h4>
                        ) : (
                            <>

                                {_gambar.map((data, i) => (
                                    <>
                                        <div className='cols-2 mt-3 mb-3 row row-cols-2'>
                                            <div className='col-10 col-md-10'>
                                                <img id='image' className='img-fluid d-block border border-dark' width={300} height={300} src={`${data}`} />
                                            </div>
                                            <div className='col-10 col-md-2'>
                                                <button className="form-control"
                                                    type='button'
                                                    onClick={() => removeItemArrayGambar(data)}
                                                >
                                                    <i className="fa fa-trash"></i></button>
                                            </div>

                                        </div>
                                    </>
                                ))}
                            </>
                        )}
                        {_gambarNew.length === 0 ? (
                            <></>
                        ) : (
                            <>

                                {_gambarNew.map((data, i) => (

                                    <>
                                        <div className='cols-2 mt-3 mb-3 row row-cols-2'>
                                            <div className='col-10 col-md-10'>
                                                <img id='image' className='img-fluid d-block border border-dark' width={300} height={300} src={createObjectURL[i]} />
                                            </div>
                                            <div className='col-10 col-md-2'>
                                                <button className="form-control"
                                                    type='button'
                                                    onClick={() => removeItemArrayGambarNew(data)}
                                                >
                                                    <i className="fa fa-trash"></i></button>
                                            </div>

                                        </div>
                                    </>
                                ))}
                            </>
                        )}
                    </div>
                    <div className='card p-3'>
                        <h4 className="labels" style={{ color: 'black' }}>Atur Harga Weekend ( Sabtu & Minggu ) Jika ada</h4>
                        {/* only sm */}
                        <div className=".d-block .d-sm-none" style={{ color: 'black' }}>
                            <div className="col-lg-12" >
                                <h6>Harga Pagi Weekend</h6>
                                <div className='row'>
                                    <div className='col-12 col-sm-5 mb-2'>
                                        <div className='d-flex flex-row'>
                                            <div className='col-1 col-sm-2'>
                                                <label>Rp</label>
                                            </div>
                                            <div className='col-11 col-sm-10'>
                                                <input type="number" className="form-control" placeholder="Harga Pagi"
                                                    value={_hargaPagiWeekend}
                                                    onChange={(e) => setHargaPagiWeekend(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h6>Harga Sore Weekend</h6>
                                <div className='row'>
                                    <div className='col-12 col-sm-5 mb-2'>
                                        <div className='d-flex flex-row'>
                                            <div className='col-1 col-sm-2'>
                                                <label>Rp</label>
                                            </div>
                                            <div className='col-11 col-sm-10'>
                                                <input type="number" className="form-control"
                                                    placeholder="Harga Sore"
                                                    value={_hargaSoreWeekend}
                                                    onChange={(e) => setHargaSoreWeekend(e.target.value)}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <h6>Harga Malam Weekend</h6>
                                <div className='row'>
                                    <div className='col-12 col-sm-5 mb-2'>
                                        <div className='d-flex flex-row'>
                                            <div className='col-1 col-sm-2'>
                                                <label>Rp</label>
                                            </div>
                                            <div className='col-11 col-sm-10'>
                                                <input type="number" className="form-control"
                                                    placeholder="Harga Malam"
                                                    value={_hargaMalamWeekend}
                                                    onChange={(e) => setHargaMalamWeekend(e.target.value)}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card p-3 mt-4'>
                        <h4 className="labels" style={{ color: 'black' }}>Atur Jadwal dan Harga</h4>
                        {/* only sm */}
                        <div className=".d-block .d-sm-none" style={{ color: 'black' }}>
                            <div className="col-sm-12" >
                                <h6>Jam Pagi<i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i></h6>

                                <div className='row'>
                                    <div className='col-12 col-sm-3 mb-2'>
                                        <input type="time" className="form-control " placeholder="Mulai"
                                            id='jamPagiMulai'
                                            />
                                    </div>
                                    <div className='col-12 col-sm-1 mb-2 text-center'>
                                        <strong>_</strong>
                                    </div>
                                    <div className='col-12 col-sm-3 mb-2'>
                                        <input type="time" className="form-control" placeholder="Akhir" 
                                            id='jamPagiAkhir'
                                        />
                                    </div>
                                    <div className='col-12 col-sm-5 mb-2'>
                                        <div className='d-flex flex-row'>
                                            <div className='col-1 col-sm-2'>
                                                <label>Rp</label>
                                            </div>
                                            <div className='col-11 col-sm-10'>
                                                <input type="number" className="form-control" placeholder="Harga Pagi"
                                                    required
                                                    value={_hargaPagi}
                                                    min="0" step="1"
                                                    onChange={(e) => setHargaPagi(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h6>Jam Sore ( Isi jika harga berbeda )</h6>
                                <div className='row'>
                                    <div className='col-12 col-sm-3 mb-2'>
                                        <input type="time" className="form-control "
                                            id='jamSoreMulai'
                                            placeholder="Mulai" /></div>
                                    <div className='col-12 col-sm-1 mb-2 text-center'>
                                        <strong>_</strong>
                                    </div>
                                    <div className='col-12 col-sm-3 mb-2'>
                                        <input type="time"
                                            id='jamSoreAkhir'
                                            className="form-control" placeholder="Akhir" />
                                    </div>
                                    <div className='col-12 col-sm-5 mb-2'>
                                        <div className='d-flex flex-row'>
                                            <div className='col-1 col-sm-2'>
                                                <label>Rp</label>
                                            </div>
                                            <div className='col-11 col-sm-10'>
                                                <input type="number" className="form-control"
                                                    placeholder="Harga Sore"
                                                    value={_hargaSore}
                                                    onChange={(e) => setHargaSore(e.target.value)}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <h6>Jam Malam ( Isi jika harga berbeda )</h6>
                                <div className='row'>
                                    <div className='col-12 col-sm-3 mb-2'>
                                        <input type="time" className="form-control "
                                            id='jamMalamMulai'
                                            placeholder="Mulai" /></div>
                                    <div className='col-12 col-sm-1 mb-2 text-center'>
                                        <strong>_</strong>
                                    </div>
                                    <div className='col-12 col-sm-3 mb-2'>
                                        <input type="time"
                                            id='jamMalamAkhir'
                                            className="form-control" placeholder="Akhir" />
                                    </div>
                                    <div className='col-12 col-sm-5 mb-2'>
                                        <div className='d-flex flex-row'>
                                            <div className='col-1 col-sm-2'>
                                                <label>Rp</label>
                                            </div>
                                            <div className='col-11 col-sm-10'>
                                                <input type="number" className="form-control"
                                                    placeholder="Harga Malam"
                                                    value={_hargaMalam}
                                                    onChange={(e) => setHargaMalam(e.target.value)}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex-end flex-row justify-content-end mt-3'>
                                    <input type='checkbox' value={'true'} id='minOrderCheck' onClick={setCheck} />
                                    <label>Minimum Pesan 2 Jam</label>
                                </div>
                                <div className='d-flex-end flex-row justify-content-end mt-3'>
                                    <input type='button' className='btn-fill text-white' onClick={lihatJadwal} value='CEK JADWAL' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <h4>Jadwal</h4>
                        <hr></hr>
                        <div className='row' id='divJadwal'>

                            {jadwalTampilan.length === 0 ? (
                                <h4>Daftar Jadwal</h4>
                            ) : (
                                <>

                                    {jadwalTampilan.map((data, i) => (
                                        <div className='col-6 col-sm-3 mb-2'>
                                            <div className='card text-center'>
                                                <div className='card-body'>
                                                    <span>{data}</span><br></br>
                                                    <span>{rupiah(hargaTampilan[i])}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="container-login100-form-btn">
                                        <button type="submit" className="btn btn-outline-secondary"
                                            style={{
                                                backgroundColor: '#006E61', color: 'rgb(255, 255, 255)',
                                                borderRadius: '5cm', width: 500, height: 50
                                            }}
                                            disabled={uploading === false ? (false) : (true)}
                                        >UPDATE</button>
                                    </div>
                                    <div className='container d-flex flex-row justify-content-center mt-2 mb-2'>
                                        {uploading &&
                                            <>
                                                <div className='d-flex flex-row'>
                                                    <div className="spinner-loading">
                                                    </div>
                                                    <span>Sedang upload gambar, Mohon Tunggu...</span>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </>
                            )}

                        </div>

                    </div>
                </form>

            </div>

        </div>
    )

}