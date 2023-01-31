//@ts-check
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react'
import useSWR from "swr";
import rupiah from '../components/Rupiah';

export default function Pembayaran() {

  var currentdate = new Date();
  var dateTime = currentdate.getDate() + "/"
    + (currentdate.getMonth() + 1) + "/"
    + currentdate.getFullYear() + " | "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":"
    + currentdate.getSeconds();

  let nama = ''
  let lapangan = ''
  let noWa = ''
  let email = ''
  const [tim, setTim] = useState('');
  const [noRekening, setNoRekening] = useState('');
  const [opsiBayar, setOpsiBayar] = useState('');
  const [buktiBayar, setBuktiBayar] = useState('');
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  let namaVenue = ''
  let tglMain = ''
  let jadwalMain = []
  let harga = 0
  const [hargaDP, setHargaDP] = useState('-');
  const [opsiBayarDP, setOpsiBayarDP] = useState(false);
  const [diterima, setDiterima] = useState(dateTime);
  const [status, setStatus] = useState('pending');
  const [error1, setError1] = useState('')
  const [stateDummy, setStateDummy] = useState('')
  const [uploading, setUploading] = useState(false)


  // Backup State
  // const [nama, setNama] = useState('Yosi');
  // const [noWa, setNoWa] = useState('081');
  // const [tim, setTim] = useState('Ambyar FC');
  // const [namaVenue, setNamaVenue] = useState('Scuttod');
  // const [tglBooking, setTglBooking] = useState('20-03-2022');
  // const [tglMain, setTglMain] = useState('2022-06-09');
  // const [jadwalMain, setJadwalMain] = useState([]);
  // const [lapangan, setLapangan] = useState('Lapangan 2');
  // const [harga, setHarga] = useState(50);
  // const [status, setStatus] = useState('pending');
  // const [noRekening, setNoRekening] = useState('2342543 - Bank BCA');
  // const [opsiBayar, setOpsiBayar] = useState('DP');
  // const [diterima, setDiterima] = useState(dateTime);
  // const [buktiBayar, setBuktiBayar] = useState('');
  // const [createObjectURL, setCreateObjectURL] = useState(null);
  // const [message, setMessage] = useState('');

  //Variabel Biasa


  const { data: session } = useSession()

  //Router
  let router = useRouter()
  const { jadwalPesanReq,
    totalHargaReq,
    namaVenueReq,
    namaLapanganReq,
    tglMainReq,
    diterimaTglReq,
    diterimaJamReq,
    idTransaksiReq
  } = router.query


  // console.log('idTransaksi:')
  // console.log(idTransaksiReq)


  //Suwir
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  let url = ''
  if (session) {
    url = `/api/pembayarandb?emailReq=${session.user.email}&namaVenueReq=${namaVenueReq}`
  }
  const { data: data, error } = useSWR(url, fetcher)

  if (!data) {
    return <div>Access denied</div>
  } else if (error) {
    return <div>Something went wrong</div>
  }

  //Deklarasi Array JSON SWR
  let profil = data['message']
  console.log(profil)

  //Pemanggilan Function
  const setValue = () => {
    jadwalMain = JSON.parse(jadwalPesanReq)
    harga = totalHargaReq
    namaVenue = namaVenueReq
    lapangan = namaLapanganReq
    tglMain = tglMainReq
    nama = profil.profil[0].nama
    noWa = profil.profil[0].noWa
    email = profil.profil[0].email
    diterima = dateTime

  }
  setValue()

  

  const aturOpsiBayar = (data) => {
    setOpsiBayar(data)
    if (data == 'DP') {
      hitungHargaDP()
      setOpsiBayarDP(true)
    } else {
      setOpsiBayarDP(false)
      setHargaDP('-')
    }
    // console.log(opsiBayarDP)

  }

  const hitungHargaDP = () => {
    let DPhitung = parseInt(profil.infoVenue[0].DP)
    let hargaDPHitung = harga - (((DPhitung / 100) * harga))
    let hargaDPhitungString = hargaDPHitung.toString()
    setHargaDP(hargaDPhitungString)
    // console.log(hargaDP)
  }

  const SendNotification = async () => {
    let response1 = await fetch(`/api/notifikasiMitra/getemaildb?namaVenueReq=${namaVenueReq}`, {
      method: 'GET'
    });
    let data1 = await response1.json();
    let email = data1['message'][0].email
    const res = await fetch(`/api/notifikasiMitra/${email}/${idTransaksiReq}`, {
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
        console.log("suksek send notification : " + dt);
      })
        .catch((err) => {
          console.log("gagal");

        })
    }
    else {
      console.log("gagal Error");
    }
  }

  const handlePost = async (e) => {
    e.preventDefault();
    SendNotification()
    //Cloudinary Single
    let imageUrl = ''
    //Uploading
    setUploading(true)
    //Uploading
    const body = new FormData();
    //console.log("file", image)
    body.append("file", image);
    body.append('upload_preset', 'my-uploads');
    const response = await fetch('https://api.cloudinary.com/v1_1/api-sport/image/upload', {
      method: 'POST',
      body
    }).then(r => r.json());
    imageUrl = response.secure_url
    //Uploading
    //Uploading

    //Cloudinary End
    console.log(buktiBayar)

    // reset error and message
    setMessage('');
    // fields check
    if (!nama || !email || !noWa || !opsiBayar || !buktiBayar || !namaVenue || !tglMain || !jadwalMain || !harga || !status || !hargaDP || !diterima) {
      alert('Tolong isi semua kolom')
      return setError1('All fields are required');
    }

    // get the data
    let jamTerisi = []
    let url = ''
    if (session) {
      url = `/api/pembayarandb?emailReq=${session.user.email}&namaVenueReq=${namaVenueReq}&tglMainReq=${tglMainReq}&jadwalPesanReq=${jadwalPesanReq}&lapanganReq=${namaLapanganReq}&idTransaksiReq=${idTransaksiReq}`
    }
    let response1 = await fetch(url, {
      method: 'GET'
    });
    let data1 = await response1.json();
    let transaksiCheck = data1['message'].transaksi
    console.log(transaksiCheck)
    for (let i = 0; i < transaksiCheck.length; i++) {
      for (let j = 0; j < transaksiCheck[i].jadwalMain.length; j++) {
        jamTerisi.push(transaksiCheck[i].jadwalMain[j])
      }
    }

    console.log(`Jam Pesan:`)
    console.log(jadwalMain)

    console.log(`Jam Terisi:`)
    console.log(jamTerisi)

    // let jamFilter = jamTerisi.filter(val => !jadwalMain.includes(val));
    const jamFilter = jadwalMain.filter(value => jamTerisi.includes(value));
    console.log(`Jam Filter:`)
    console.log(jamFilter)

    if (jamFilter.length == 0) {
      e.preventDefault();
      // reset error and message
      setMessage('');
      // fields check
      try {
        // Update post
        let email = await fetch(`/api/notifikasi/transaksipending?userReq=${nama}&tglMainReq=${tglMain}&lapanganReq=${lapangan}&namaVenueReq=${namaVenueReq}&emailReq=${profil.infoVenue[0].email}`)
        let update = await fetch('/api/transaksidb', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tim: tim,
            noRekening: noRekening,
            opsiBayar: opsiBayar,
            buktiBayar: imageUrl,
            hargaDP: hargaDP,
            objectId: idTransaksiReq
          }),
        });
        let data1 = await update.json();
        // reload the page
        // console.log('Updated')
        // console.log(data1.message)
        router.push('/')
        return alert(`Pembayaran sukses, Mohon tunggu persetujuan dari pihak ${namaVenueReq}`)
      } catch (error) {
        // Stop publishing state
        console.log('Not Working')
        return console.log('Not Working')
      }
    } else {
      alert('Mohon Maaf, timeslot telah dipesan, mohon untuk memilih jadwal kembali')
      router.back()
    }
    // post structure

  };

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setBuktiBayar(i.name)
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };



  return (
    <div className="container-xxl p-3">
      <div className="d-flex flex-row justify-content-center">
        <h1 className="mb-3">Form Pembayaran</h1>
      </div>

      <div className="p-3">
        <div className="container-xxl card p-3 shadow-lg">
          <div className="row">
            <div className="px-md-5 p-3 col-md-12 align-items-start justify-content-center" >
              <h1><b>{namaVenue}</b></h1>
              <h3 ><b>Lapangan:</b>&nbsp;{lapangan}</h3>
              <h4><b>Tgl Main:</b>&nbsp;{tglMain}</h4><br></br>
              <div className="row">
                <h3><b>Jadwal Main:</b></h3>
                {jadwalMain.map((data, i) => (
                  <>
                    <div className='col-12 col-sm-4 mb-2'>
                      <div className='card'>
                        <div className='card-body'>
                          <h3>{data}</h3>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <h5>Pesanan dibuat pada: <b>{`${diterimaTglReq} | ${diterimaJamReq}`}</b></h5>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="container-login100">
          <form onSubmit={handlePost}>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Nama Pemesan : </label>
              <input value={nama} type="text" className="form-control" readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">E-mail : </label>
              <input value={email} type="text" className="form-control" readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">No. WA Pemesan: </label>
              <input type="number" className="form-control" value={noWa} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Total Bayar : </label>
              <input type="text" className="form-control" value={rupiah(harga)} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Nama Tim</label>
              <select className="form-control form-select" id="exampleFormControlSelect1" onChange={(e) => setTim(e.target.value)}>
                <option>--Pilih Tim--</option>
                {profil.profil[0].tim.map((data, i) => (
                  <option value={data}>{data}</option>
                ))}
              </select>
            </div>
            {opsiBayarDP &&
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Persen DP: </label>
                <input type="text" className="form-control" value={`${profil.infoVenue[0].DP}%`} readOnly />
              </div>
            }
            {opsiBayarDP &&
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Total Bayar (DP): </label>
                <input type="text" className="form-control" value={rupiah(hargaDP)} readOnly />
              </div>
            }
            <div className="form-group">
              <label>Opsi Bayar</label>
              <select className=" form-select" onChange={(e) => aturOpsiBayar(e.target.value)}>
                <option>--Pilih Opsi Bayar--</option>
                {profil.infoVenue[0].opsiBayar.map((data, i) => (
                  <option value={data}>{data}</option>
                ))}
              </select>
            </div>
            {opsiBayar != 'Bayar di Tempat' &&
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">No. Rekening</label>
                <select className="form-control form-select" id="exampleFormControlSelect1" onChange={(e) => setNoRekening(e.target.value)}>
                  <option>--Pilih No. Rekening--</option>
                  {profil.infoVenue[0].rekening.map((data, i) => (
                    <option value={data}>{data}</option>
                  ))}
                </select>
              </div>
            }
            <div className="form-group">
              <div className="mt-2 col-md-12"><label className="labels" htmlFor="formFile">Bukti Bayar</label>
                <input type="file"
                  id="validatedCustomFile"
                  className="form-control form-file"
                  name="myImage" onChange={uploadToClient}
                  required
                />
              </div>
            </div>

            <div className="mt-4 text-center">
              <img src={createObjectURL} className="img-fluid" />
            </div>
            {/* <div className="d-flex flex-row mt-3">
              <span className='font-weight-normal' style={{ color: 'red' }}><b>*Mohon untuk mengupload bukti pembayaran hingga 13:30 WIB atau pembayaran akan di cancel</b></span>
            </div> */}
            <div className="d-grid gap-2 py-4 ">
              <button className="btn btn-primary p-3 fw-bold" type="submit" style={{ backgroundColor: '#006E61' }} disabled={uploading === false ? (false) : (true)} >Kirim</button>
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
          </form>
        </div>
      </div>
    </div>

  )
}