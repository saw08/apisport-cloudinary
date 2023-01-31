import { useRouter } from 'next/router';
import useSWR from "swr";
import rupiah from '../../components/Rupiah';

export default function DetailNotifikasi() {
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const router = useRouter()
    const { idTransaksi } = router.query
    const { data: data, error } = useSWR(`/api/detailnotifikasidb?idTransaksiReq=${idTransaksi}`, fetcher)

    if (!data) {
        return <div className="spinner"></div>
    } else if (error) {
        return <div>Something went wrong</div>
    }


    let transaksi = data['message'][0]
    console.log(transaksi)

    let nama = transaksi.nama
    let email = transaksi.email
    let lapangan = transaksi.lapangan
    let namaVenue = transaksi.namaVenue
    let tglMain = transaksi.tglMain
    let diterima = transaksi.diterima
    let status = ''

    const SubmitTolak = async (e) => {
        e.preventDefault();
        // reset error and message
        // fields check
        // post structure
        status = 'ditolak'
        let transaksi = {
            nama,
            email,
            lapangan,
            namaVenue,
            tglMain,
            diterima,
            status
        };
        // console.log('Yang Mau di push:')
        // console.log(transaksi)
        // save the post
        let response = await fetch('/api/notifikasiuserdb', {
            method: 'POST',
            body: JSON.stringify(transaksi),
        });
        // get the data
        let data = await response.json();
        if (data.success) {
            // reset the fields
            tolakTransaksi()
            alert('Transaksi berhasil ditolak!')
            router.push('/mitra/transaksi-pending')
        }
        else {
            // set the error
            console.log(data.message);
        }
    }

    const SubmitNotifikasi = async (e) => {
        e.preventDefault();
        // reset error and message
        // fields check
        // post structure
        status = 'diterima'
        let transaksi = {
            nama,
            email,
            lapangan,
            namaVenue,
            tglMain,
            diterima,
            status
        };
        // console.log('Yang Mau di push:')
        // console.log(transaksi)
        // save the post
        let response = await fetch('/api/notifikasiuserdb', {
            method: 'POST',
            body: JSON.stringify(transaksi),
        });
        // get the data
        let data = await response.json();
        if (data.success) {
            // reset the fields
            alert('Transaksi diterima')
        }
        else {
            // set the error
            console.log(data.message);
        }
    }

    const SendNotification = async (status) => {
        const res = await fetch(`/api/notifikasiUser/${transaksi.email}/${status}?namaVenue=${transaksi.namaVenue}&tglMain=${transaksi.tglMain}`, {
          credentials: "omit",
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          mode: "cors",
        })
    
        if (res.status >= 200 && res.status < 300) {
          res.json().then((dt) => {
            console.log("sukses send notification : " + dt);
          })
            .catch((err) => {
              console.log("gagal");
    
            })
        }
        else {
          console.log("gagal Error");
        }
      }

    const SubmitTerima = async (e) => {
        e.preventDefault();
        SendNotification('diterima')
        let statusT = ''
        if (transaksi.opsiBayar == 'Full Bayar Transfer') {
            statusT='lunas'
        } else {
            statusT='diterima'
        }
        console.log(statusT)
        // SubmitNotifikasi(e)
        // fields check
        try {
            // Update post
            await fetch('/api/transaksipendingdb', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: statusT,
                    idTransaksi: transaksi._id
                }),
            });
            // reload the page
            router.push('/mitra/transaksi-pending');
        } catch (error) {
            // Stop publishing state
            console.log('Not Working')
        }
    }

    const tolakTransaksi = async (e) => {
        SendNotification('ditolak')
        try {
            // Delete post
            await fetch('/api/transaksidb', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    _id: transaksi._id
                }),
            });
            // reset the deleting state
            // reload the page
            router.push('/mitra/transaksi-pending')
        } catch (error) {
            // stop deleting state
        }
    }

    return (
        <div className="container">
            <h1 className="mb-3">Detail Transaksi</h1>
            <div className="">
                <div className="container card p-3 shadow-lg">
                    <div className="row">
                        <div className="px-md-5 p-3 col-md-12 align-items-start justify-content-center" >
                            <h1><b>{transaksi.namaVenue}</b></h1>
                            <h4 ><b>Lapangan:</b>&nbsp;{transaksi.lapangan}</h4>
                            <h4><b>Tgl Main:</b>&nbsp;{transaksi.tglMain}</h4><br></br>
                            <div className="row">
                                <h4><b>Jadwal Main:</b></h4>
                                {transaksi.jadwalMain.map((data, i) => (
                                    <>
                                        <div className='col-12 col-sm-4 mb-2'>
                                            <div className='card'>
                                                <div className='card-body'>
                                                    <h4>{data}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                            <h5>Pesanan dibuat pada: <b>{`${transaksi.diterimaTgl} ${transaksi.diterimaJam}`}</b></h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <div className="container">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Nama Pemesan : </label>
                            <input type="text" className="form-control" value={transaksi.nama} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Nama Tim : </label>
                            <input type="email" className="form-control" value={transaksi.tim} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">No. WhatsApp: </label>
                            <input type="email" className="form-control" value={transaksi.noWa} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Email: </label>
                            <input type="email" className="form-control" value={transaksi.email} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Total Bayar : </label>
                            <input type="email" className="form-control" value={rupiah(transaksi.harga)} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">No. Rekening Venue: </label>
                            <input type="email" className="form-control" value={transaksi.noRekening} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Opsi Bayar : </label>
                            <input type="email" className="form-control" value={transaksi.opsiBayar} readOnly />
                        </div>
                        {transaksi.opsiBayar === 'DP' &&
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Harga DP : </label>
                                <input type="email" className="form-control" value={rupiah (transaksi.hargaDP)} readOnly />
                            </div>
                        }
                        <div className="form-group">
                            <div className="mt-2 col-md-12"><label className="labels" htmlFor="formFile">Bukti Bayar</label>
                            </div>

                        </div>

                        <div className=" text-center">
                            <img className='img-fluid' src={`${transaksi.buktiBayar}`} />
                        </div>
                        <div className='row mt-3'>
                            <div className='col-6   d-grid col-lg-6 mb-4'>
                                <button type="button" className="btn btn-outline-secondary" onClick={SubmitTerima} style={{ backgroundColor: '#00cc36', color: 'rgb(255, 255, 255)', borderRadius: '5cm' }}>Terima</button>
                            </div>
                            <div className='col-6  d-grid col-lg-6 mb-4'>
                                <button class="btn btn-outline-warning p-3" type="button" onClick={SubmitTolak} style={{ backgroundColor: '#ed0010', color: 'rgb(255, 255, 255)', borderRadius: '5cm' }}>Tolak</button>
                            </div>                       
                        </div>

                    </form>
                </div>
            </div>
        </div>

    )
}