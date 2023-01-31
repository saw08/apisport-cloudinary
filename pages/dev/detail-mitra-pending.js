import { useState } from 'react';
import { useRouter } from 'next/router';

export default function DetailMitraPending() {
    let router = useRouter()
    const { namaVenue,
        namaPemilikVenue,
        alamat,
        noWa,
        instagram,
        kategori,
        hariOperasional,
        jamOperasional,
        fasilitas,
        opsiBayarStringify,
        rekeningStringify,
        DP,
        namaAdmin,
        noWaAdmin,
        emailReq,
        fotoVenueStringify,
        objectId } = router.query

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    let opsiBayar = []
    let rekening = []
    let fotoVenue = []

    if (opsiBayarStringify && rekeningStringify && fotoVenueStringify) {
        opsiBayar = JSON.parse(opsiBayarStringify)
        rekening = JSON.parse(rekeningStringify)
        fotoVenue = JSON.parse(fotoVenueStringify)
    }
    let email = emailReq

    const deleteMitraPending = async () => {
        try {
            console.log('Try')
            // Delete post
            await fetch('/api/mitrapendingdb', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    _id: objectId
                }),
            });
            // reset the deleting state
            // reload the page
            alert('Mitra Pending Terhapus')
            router.push('/dev/mitra-pending')
        } catch (error) {
            // stop deleting state
        }
    };

    const handlePost = async (e) => {
        e.preventDefault();
        // fields check
        if (!namaVenue || !namaPemilikVenue || !alamat || !noWa || !instagram || !kategori || !hariOperasional ||
            !jamOperasional || !fasilitas || !opsiBayar || !rekening || !namaAdmin || !noWaAdmin || !email|| !fotoVenue) {
            alert('Harap untuk mengisi semua data');
            return setError('Isi Semua Data');
        }
        // post structure
        let mitra = {
            namaVenue,
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
            DP,
            namaAdmin,
            noWaAdmin,
            email,
            fotoVenue
        };
        // save the post
        let response = await fetch('/api/mitradb', {
            method: 'POST',
            body: JSON.stringify(mitra),
        });
        // get the data
        let data = await response.json();
        if (data.success) {
            deleteMitraPending()
            // reset the fields
            alert('Persetujuan Sukses')
            router.push('/dev/mitra-dev')
            return setMessage(data.message);
        }
        else {
            // set the error
            console.log(data.message);
            return setError(data.message);
        }
    };

    return (
        <div className="limiter">
            <div className="container-login100" style={{ backgroundImage: 'url("./bg-01.jpg")' }}>
                <form className="login100-form validate-form">
                    <span className="login100-form-title">
                        MITRA PENDING
                    </span>
                    <div className="p-3 py-5">
                        <div className="row">
                            <div className=" col-md-12">
                                <label className="labels">Nama Venue</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <input type="text" className="form-control"
                                    required
                                    name="nama"
                                    value={namaVenue}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">Nama Pemilik Venue</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <input type="text" className="form-control"
                                    required
                                    name="nama"
                                    value={namaPemilikVenue}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">Alamat</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <textarea type="text" className="form-control"
                                    required
                                    value={alamat}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">No. WA Venue</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <input type="text" className="form-control"
                                    required
                                    value={noWa}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">Instagram</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <input type="text" className="form-control"
                                    required
                                    value={`@${instagram}`}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">Kategori</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <input type="text" className="form-control"
                                    required
                                    value={kategori}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">Hari Operasional</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <input type="text" className="form-control"
                                    required
                                    value={hariOperasional}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">Hari Operasional</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <input type="text" className="form-control"
                                    required
                                    value={jamOperasional}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">Fasilitas</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <textarea type="text" className="form-control"
                                    required
                                    value={fasilitas}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">Opsi Bayar</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <ul className='list-group'>
                                    {opsiBayar.map((data, index) => (
                                        <li className='list-group-item'>{data}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">No. Rekening</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <ul className='list-group'>
                                    {rekening.map((data, index) => (
                                        <li className='list-group-item'>{data}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">DP</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <textarea type="text" className="form-control"
                                    required
                                    value={`${DP}%`}
                                    readOnly
                                />
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">Nama Admin</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <input type="text" className="form-control"
                                    required
                                    value={namaAdmin}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">No WA Admin</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <input type="text" className="form-control"
                                    required
                                    value={noWaAdmin}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">E-mail</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <input type="text" className="form-control"
                                    required
                                    value={email}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-12">
                            {fotoVenue.length === 0 ? (
                                <h2>Daftar Foto</h2>
                            ) : (
                                <>

                                    {fotoVenue.map((data, i) => (
                                        <>
                                            <div className='cols-2 mt-3 mb-3 row row-cols-2'>
                                                <div className='cols-1 col-md-6'>
                                                    <img id='image' className='img-fluid d-block border border-dark' width={150} height={150} src={`${fotoVenue[i]}`} />
                                                </div>


                                            </div>
                                        </>


                                    ))}
                                </>
                            )}
                        </div>


                        <div class="row mt-3 container-login100-form-btn my-3 g-3">
                            <button type="submit"
                                className="btn btn-outline-secondary mx-3" style={{ backgroundColor: '#006E61', color: 'rgb(255, 255, 255)', borderRadius: '5cm', width: 500, height: 50 }}
                                onClick={handlePost}>
                                TERIMA
                            </button>
                            <button type="button"
                                onClick={() => deleteMitraPending()}
                                className="btn btn-outline-secondary mx-3" style={{ backgroundColor: '#c41d0e', color: 'rgb(255, 255, 255)', borderRadius: '5cm', width: 500, height: 50 }}>
                                TOLAK
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
