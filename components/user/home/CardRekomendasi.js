import React from 'react'
import Link from 'next/link'

const CardRekomendasi = ({ props }) => {
    let namaHasil = props.namaVenue.split(" ").join("");
    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: 'currency',
            currency: 'IDR'
        }).format(number);
    }
    return (
        <>
            <Link href={{
                pathname: '/detail-venue',
                query: {
                    namaVenue: props.namaVenue
                },

            }}>
                <div className="col-md-4 mt-3 col-12 card shadow p-3">
                    <div className="card text-start">
                        <div id={`${namaHasil}`} className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                {props.fotoVenue.map((data, i) => (
                                    <>
                                        {i == 0 ?
                                            (<button type="button" data-bs-target={`#${namaHasil}`} data-bs-slide-to={i} className="active" aria-current="true" aria-label={`Slide ${i}`} />) :
                                            (<button type="button" data-bs-target={`#${namaHasil}`} data-bs-slide-to={i} aria-label={`Slide ${i}`} />)}

                                    </>
                                ))}
                            </div>
                            <div className="carousel-inner">
                                {props.fotoVenue.map((data, i) => (
                                    <>
                                        {i == 0 ?
                                            (<div className="carousel-item active">
                                                <img src={`${data}`} className="" width={400} height={200}/>
                                            </div>) :
                                            (<div className="carousel-item">
                                                <img src={`${data}`} className="" width={400} height={200}/>
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
                        <div className="card-body">
                            <h5 className="card-title" style={{ color: "black" }}><strong>{props.namaVenue }</strong></h5>
                            <span className="card-text text-left" style={{ color: "black" }}><icon className='fa fa-calendar'></icon>{` ${props.hariOperasional}` }</span><br></br>
                            <span className="card-text" style={{ color: "black" }}><icon className='fa fa-clock-o'></icon> {`${props.jamOperasional}`}</span><br></br>
                            <span className="card-text" style={{ color: "black" }}><icon className='fa fa-map-marker'></icon>{` ${props.kecamatan}`}</span><br></br>
                            <span className="card-text" style={{ color: "black" }}><icon className='fa fa-futbol'></icon>{` ${props.kategori}`}</span><br></br>
                            <span className="card-text text-muted" style={{ color: "black" }}><strong>Harga mulai dari </strong><br></br><span style={{ color: "green" }}>{props.lapanganVenue.length === 0 ? ('Tidak ada data lapangan tersedia') : (rupiah(props.lapanganVenue[0].hargaPagi))}</span></span>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}
export default CardRekomendasi
