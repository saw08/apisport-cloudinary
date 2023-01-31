import CardLapangan from "../components/user/detail-venue/CardLapangan";
import useSWR from "swr";
import { useRouter } from 'next/router';
import rupiah from "../components/Rupiah";
import capital from "../components/Capitalize";

export default function Detailvenue() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const router = useRouter()
  const { namaVenue } = router.query
  const { data: data, error } = useSWR(`/api/detailvenuedb?namaVenueReq=${namaVenue}`, fetcher)
  let namaHasil = ''
  if (namaVenue) {
    namaHasil = namaVenue.split(" ").join("");
  }


  if (!data) {
    return <div className="spinner"></div>
  } else if (error) {
    return <div>Something went wrong</div>
  }


  let venue = data['message']
  console.log(venue)

  return (
    <div className="container">

      <h1 className="fw-bold fst-italic">{venue.infoVenue[0].namaVenue}</h1>
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
                <div className="col-md-8 text-start">
                  <h5 className="card-title mt-3" style={{ color: "black" }}><strong>{venue.infoVenue[0].namaVenue}</strong></h5>
                  <span className="card-text" style={{ color: "black" }}><icon className='fa fa-calendar'></icon><b> {venue.infoVenue[0].hariOperasional}</b></span><br></br>
                  <span className="card-text" style={{ color: "black" }}><icon className='fa fa-clock-o'></icon> <b>{venue.infoVenue[0].jamOperasional}</b></span><br></br>
                  <span className="card-text" style={{ color: "black" }}><icon className='fa fa-map-marker'></icon> <b>{venue.infoVenue[0].kabupaten},{venue.infoVenue[0].kecamatan},{venue.infoVenue[0].alamat}</b></span><br></br>
                  <span className="card-text" style={{ color: "black" }}><icon className='fa fa-futbol'></icon><b> {venue.infoVenue[0].kategori}</b></span><br></br>
                  <span className="card-text text-muted" style={{ color: "black" }}><strong>Harga mulai dari </strong><br></br><span style={{ color: "green" }}><b>{venue.infoLapangan.length === 0 ? ('Tidak ada data lapangan tersedia') : (rupiah(venue.infoLapangan[0].hargaPagi))}</b></span></span>
                </div>
              </div>
              {/* END ROW */}
            </div>
          </div>
        </div>
      </div>
      <div>
        <a style={{ color: "black" }}>
          <h5 className='d-flex justify-content-between'><b> Deskripsi</b>
          </h5>
        </a>
        <div className="text-start">
          <b>
            Lapangan {venue.infoVenue[0].namaVenue} merupakan lapangan olahraga {venue.infoVenue[0].kategori} yang berlokasi di
            &nbsp;{capital(venue.infoVenue[0].kabupaten)}, {capital(venue.infoVenue[0].kecamatan)}, {venue.infoVenue[0].alamat}. Gedung lapangan {venue.infoVenue[0].namaVenue}
            &nbsp;mempunyai {venue.infoLapangan.length} lapangan dan
            &nbsp;fasilitas yang memadai seperti: {venue.infoVenue[0].fasilitas}
            &nbsp;{venue.infoVenue[0].namaVenue} juga mempunyai sosial media @{venue.infoVenue[0].instagram} dan juga Nomor WhatsApp {venue.infoVenue[0].noWa}
            &nbsp;Untuk harga sewa lapangan mulai {venue.infoLapangan[0].hargaPagi} hingga {venue.infoLapangan[0].hargaMalam}. Gedung lapangan
            &nbsp;{venue.infoVenue[0].namaVenue} ini operasional mulai hari {venue.infoVenue[0].hariOperasional} dari jam {venue.infoVenue[0].jamOperasional}.
          </b>
        </div>

      </div>
      <div className='row'>
        <a style={{ color: "black" }}>
          <h5 className='d-flex justify-content-between'><b> Fasilitas</b>
          </h5>
        </a>
        <div>
          <div className='d-flex justify-content-between'  >
            <span><b>{venue.infoVenue[0].fasilitas}</b></span>
          </div>
        </div>
      </div>
      <div className='row mt-3' style={{ color: "black" }}><b>

        <h5 className='d-flex justify-content-between'><b>Sosial Media</b></h5>
        <div>
          <div className="d-flex justify-content-between" >
            <a className="btn instagram text-white" style={{ color: 'black' }} href={`https://www.instagram.com/${venue.infoVenue[0].instagram}`}>
              <span className='mb-2' style={{ fontSize: '20px' }}><b><icon className='fa fa-instagram' /></b> {venue.infoVenue[0].instagram}</span>
            </a>
          </div>
          <div className="d-flex justify-content-between mt-3" >
            <a className='btn text-white' href={`https://wa.me/62${venue.infoVenue[0].noWa}`}>
              <span className='mb-2' style={{ fontSize: '20px', color: "black" }}><b><icon className='fa fa-whatsapp' /></b> {venue.infoVenue[0].noWa}</span>
            </a>
          </div>
        </div></b>
      </div>
      <div className='row mt-3 d-flex justify-content-center' style={{ color: "black" }}>
        <h5 className='d-flex justify-content-between'><b>Daftar Lapangan</b></h5>
        <div className='row flex-row col-12 col-md-12'>
          {venue.infoLapangan.length === 0 ? (
            <h4>Tidak ada data Lapangan</h4>
          ) : (
            <>
              {venue.infoLapangan.map((data, index) => (
                <CardLapangan props={data} />
              ))}
            </>
          )}
        </div>
      </div>
      {venue.infoVenue[0].srcMap &&
        <div className='row mt-3 d-flex justify-content-center' style={{ color: "black" }}>
          <h5 className='d-flex justify-content-between'><b>Lokasi</b></h5>
          <div className='row flex-row col-12 col-md-12'>
            <iframe src={venue.infoVenue[0].srcMap} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      }




    </div>

  )
}
