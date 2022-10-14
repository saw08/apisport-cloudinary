import CardLapangan from "../../components/mitra/home/CardLapangan";
import useSWR from 'swr'
import Link from "next/link";

export default function HomeMitra({ namaVenueProps }) {
    var currentdate = new Date();
    var dateTime = (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear()
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data: data, error } = useSWR(`/api/mitrahomedb?namaVenueReq=${namaVenueProps}&diterimaTglReq=${dateTime}`, fetcher, {refreshInterval: 1000})

    if (!data) {
        return <div className="spinner"></div>
    } else if (error) {
        return <div>Something went wrong</div>
    }

    let namaHasil = namaVenueProps.split(" ").join("");
    let venue = data['message']
    let total = 0
    for (let i = 0; i < venue.dashboard.length; i++) {
        total = total + venue.dashboard[i].harga
    }
    console.log(venue)


    return (
        <div className="container">
            <h2 className="fw-bold fst-italic">Beranda</h2>
            {venue.infoVenue[0].fotoVenue.length == 0 &&
                <>
                    <div className="mt-4 mb-4">
                        <h3>Harap melengkapi Informasi Lapangan</h3>
                        <Link href={{
                            pathname: '/mitra/lengkapi-profil',
                            query: {
                                namaVenue: venue.infoVenue[0].namaVenue,
                                namaVenueLama: venue.infoVenue[0].namaVenue,
                                namaPemilikVenue: venue.infoVenue[0].namaPemilikVenue,
                                alamat: venue.infoVenue[0].alamat,
                                noWa: venue.infoVenue[0].noWa,
                                instagram: venue.infoVenue[0].instagram,
                                kategori: venue.infoVenue[0].kategori,
                                hariOperasional: venue.infoVenue[0].hariOperasional,
                                jamOperasional: venue.infoVenue[0].jamOperasional,
                                fasilitas: venue.infoVenue[0].fasilitas,
                                opsiBayarStringify: JSON.stringify(venue.infoVenue[0].opsiBayar),
                                rekeningStringify: JSON.stringify(venue.infoVenue[0].rekening),
                                DP: venue.infoVenue[0].DP,
                                namaAdmin: venue.infoVenue[0].namaAdmin,
                                noWaAdmin: venue.infoVenue[0].noWaAdmin,
                                emailReq: venue.infoVenue[0].email,
                                fotoVenueStringify: JSON.stringify(venue.infoVenue[0].fotoVenue),
                                objectId: venue.infoVenue[0]._id
                            }

                        }}>
                            <button className="btn btn-fill text-white mt-3" >Lengkapi Data Sekarang..</button>
                        </Link>

                    </div>

                </>
            }
            {venue.infoVenue[0].fotoVenue != '' &&
                <div className="row mb-4">
                    <div className="col">
                        <div className=" shadow-sm" style={{ backgroundColor: 'white' }}>
                            <div className=" rounded ">
                                {/* ROW CONTENT */}
                                <div className="row p-4">
                                    <div className="col">
                                        {/* SLIDER */}
                                        <div id={`${namaHasil}`} className="carousel slide" data-bs-ride="carousel">
                                            <div className="carousel-indicators">
                                                {venue.infoVenue[0].fotoVenue.map((data, i) => (
                                                    <>
                                                        {i == 0 ?
                                                            (<button type="button" data-bs-target={`#${namaHasil}`} data-bs-slide-to={i} className="active" aria-current="true" aria-label={`Slide ${i}`} />) :
                                                            (<button type="button" data-bs-target={`#${namaHasil}`} data-bs-slide-to={i} aria-label={`Slide ${i}`} />)}

                                                    </>
                                                ))}
                                            </div>
                                            <div className="carousel-inner">
                                                {venue.infoVenue[0].fotoVenue.map((data, i) => (
                                                    <>
                                                        {i == 0 ?
                                                            (<div className="carousel-item active">
                                                                <img src={`${data}`} className="img-fluid" width={400} height={200} />
                                                            </div>) :
                                                            (<div className="carousel-item">
                                                                <img src={`${data}`} className="img-fluid" width={400} height={200} />
                                                            </div>)}
                                                    </>
                                                ))}

                                            </div>
                                            <button className="carousel-control-prev" type="button" data-bs-target={`#${namaHasil}`} data-bs-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true" />
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button className="carousel-control-next" type="button" data-bs-target={`#${namaHasil}`} data-bs-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true" />
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </div>

                                        {/* END SLIDER */}
                                    </div>
                                    <div className="col-md-8 text-start"><strong>
                                        <h5 className="card-title mt-3" style={{ color: "black" }}><strong>{venue.infoVenue[0].namaVenue}</strong></h5>
                                        <span className="card-text" style={{ color: "black" }}><icon className='fa fa-calendar'></icon> {venue.infoVenue[0].hariOperasional}</span><br></br>
                                        <span className="card-text" style={{ color: "black" }}><icon className='fa fa-clock'></icon> {venue.infoVenue[0].jamOperasional}</span><br></br>
                                        <span className="card-text" style={{ color: "black" }}><icon className='fa fa-compass'></icon> {venue.infoVenue[0].alamat}</span><br></br>
                                        <span className="card-text" style={{ color: "black" }}><icon className='fa fa-futbol'></icon> {venue.infoVenue[0].kategori}</span><br></br>
                                        <span className="card-text text-muted" style={{ color: "black" }}><strong>Harga mulai dari </strong><br></br><span style={{ color: "green" }}>{venue.infoLapangan.length === 0 ? ('Tidak ada data lapangan tersedia') : (` Rp ${venue.infoLapangan[0].hargaPagi.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}`)}</span></span>
                                    </strong></div>
                                    <div>
                                        <Link href={{
                                            pathname: '/mitra/edit-profil',
                                            query: {
                                                namaVenue: venue.infoVenue[0].namaVenue,
                                                namaVenueLama: venue.infoVenue[0].namaVenue,
                                                namaPemilikVenue: venue.infoVenue[0].namaPemilikVenue,
                                                alamat: venue.infoVenue[0].alamat,
                                                noWa: venue.infoVenue[0].noWa,
                                                instagram: venue.infoVenue[0].instagram,
                                                kategori: venue.infoVenue[0].kategori,
                                                hariOperasional: venue.infoVenue[0].hariOperasional,
                                                jamOperasional: venue.infoVenue[0].jamOperasional,
                                                fasilitas: venue.infoVenue[0].fasilitas,
                                                opsiBayarStringify: JSON.stringify(venue.infoVenue[0].opsiBayar),
                                                rekeningStringify: JSON.stringify(venue.infoVenue[0].rekening),
                                                DP: venue.infoVenue[0].DP,
                                                namaAdmin: venue.infoVenue[0].namaAdmin,
                                                noWaAdmin: venue.infoVenue[0].noWaAdmin,
                                                emailReq: venue.infoVenue[0].email,
                                                fotoVenueStringify: JSON.stringify(venue.infoVenue[0].fotoVenue),
                                                objectId: venue.infoVenue[0]._id
                                            }

                                        }}>
                                            <button className="btn btn-fill text-white">Edit Info Gedung Lapangan</button>
                                        </Link>

                                    </div>
                                </div>

                                {/* END ROW */}
                            </div>
                        </div>
                    </div>
                    <h5 className='text-start'><b> Fasilitas </b></h5>
                    <div>
                        <div className="d-flex justify-content-between">
                            <b> <span>{venue.infoVenue[0].fasilitas}</span></b>
                        </div>
                    </div>
                </div>

            }

            <div className='row mt-3'><strong>
               <h5 className='text-start'><b>Sosial Media</b></h5>
                <div>
                    <div className="d-flex justify-content-between">
                        <span className='mb-2'>
                            <a style={{ color: 'black' }} href={`https://instagram.com/${venue.infoVenue[0].instagram}`}>
                                <b><icon className='fa fa-instagram' /></b> @{venue.infoVenue[0].instagram}
                            </a>
                        </span>
                    </div>
                    <div className="d-flex justify-content-between ">
                        <span style={{ color: 'black' }} className='mb-2'><a style={{ color: 'black' }} href={`https://wa.me/62${venue.infoVenue[0].noWa}`}>
                            <b ><icon className='fa fa-whatsapp pr-1' /></b>0{venue.infoVenue[0].noWa}</a>
                        </span>
                    </div>
                </div></strong>
            </div>
            <div className='row mt-3'>
                <h5 className='text-start'><strong> Daftar Lapangan </strong></h5>
                <div className="d-flex justify-content-between" ><strong>
                    {venue.infoLapangan.length === 0 ? (
                        <h4>Tidak ada data Lapangan</h4>
                    ) : (
                        <>
                            {venue.infoLapangan.map((data, index) => (
                                <CardLapangan props={data} />
                            ))}
                        </>
                    )}
                </strong>
                </div>
            </div>
            <div className='row'>
                <a className='btn btn-fill text-white mt-3' href='/mitra/tambah-lapangan'>+ Tambah Lapangan</a>
            </div>
            <div>
                <h1>Laporan Bulan Ini</h1>
                <h1>Total Transaksi : {venue.dashboard.length}</h1>
                <h1>Pendapatan Bulan Ini : {total}</h1>
            </div>


        </div>

    )
}
