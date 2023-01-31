import Router from 'next/router'
import CardRekomendasi from '../components/user/lapangan/CardRekomendasi'
import CardKategori from '../components/user/lapangan/CardKategori'
import Pagination from '../components/Pagination'
import Carilokasi from "../components/provinsi";
import { useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
// import Carilokasi from '../components/user/cari-lokasi'



export default function Lapangan() {
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(6)
    const [filterSearch, setFilterSearch] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data: data, error } = useSWR('/api/lapanganuserdb', fetcher)

    if (!data) {
        return <div className="spinner"></div>
    } else if (error) {
        return <div>Something went wrong</div>
    }

    let lapangan = data['message']
    console.log('Agregate:')
    console.log(lapangan)

    //Tambahan Pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    //Fixed Pagintion CurrentPosts hapus filter di bawah
    let currentPosts = lapangan.lapangan.slice(indexOfFirstPost, indexOfLastPost)
    //Fixed Pagination CurrentPosts
    const howManyPages = Math.ceil(lapangan.lapangan.length / postsPerPage)
    //Tambahan Pagination Current Post Map

    let provinsi = ''
    let kabupaten = ''
    let kecamatan = ''
    let kategori = ''

    const CariLokasi = (e) => {
        e.preventDefault();
        provinsi = document.getElementById('inProvinsi').value
        kabupaten = document.getElementById('inKabupaten').value
        kecamatan = document.getElementById('inKecamatan').value
        kategori = document.getElementById('inKategori').value
        Router.push({
            pathname: '/cari-lokasi-lapangan',
            query: {
                provinsi: provinsi, kabupaten: kabupaten, kecamatan: kecamatan, kategori: kategori
            }

        }, '/cari-lokasi-lapangan')


    }
    return (
        <>
            <div className='container my-4'>
                <h1>Daftar Lapangan</h1>
            </div>
            <div>

                <div className="container my-4">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="btn-group col-md-12">
                            <input type="text" className="form-control col-10 mt-2 col-md-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Cari Lapangan Disini" />
                            <Link href={`/cari-lapangan?search=${searchTerm}`} ><button className="form-control col-2 mt-2 col-sm-2 btn shadow-sm" style={{ backgroundColor: '#ffbe2e' }}><i className="fa fa-search text-white"></i></button></Link>
                        </div>
                    </div>
                </div>
                <div className='row mb-4 container'>
                    <a className='btn btn-fill text-white' data-bs-toggle="collapse" href="#deskripsiCollapse" style={{ color: "white", backgroundColor: '#ffbe2e', borderRadius: "15px" }}>
                        <span className='text-start'><icon className='fa fa-search'></icon> Cari Berdasarkan Lokasi</span>
                    </a>
                    
                    <div>
                        <div className="row collapse multi-collapse text-start mt-4" id="deskripsiCollapse">
                            <div className="col-md-12">
                                <Carilokasi />
                                <div className='col-md-12'>
                                    <label className="labels">Kategori</label>
                                    <select className='form-control form-select' id='inKategori'>
                                        <option value=''>--- Pilih Kategori ---</option>
                                        <option value='Futsal'>Futsal</option>
                                        <option value='Bulu Tangkis'>Bulu Tangkis</option>
                                        <option value='Tenis'>Tenis</option>
                                        <option value='Basket'>Basket</option>
                                    </select>
                                </div>
                                <div className='d-flex flex-row justify-content-center '>
                                    <a href='/lapangan' className='btn btn-fill text-white mt-4' onClick={CariLokasi}
                                        style={{ color: "white", backgroundColor: '#ffbe2e', borderRadius: "15px" }}>
                                        Cari</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container my-4 text-black-50" >
                    <h4 style={{ color: 'black' }}>Rekomendasi Lapangan</h4>
                    <hr></hr>
                    <div className="row p-2 mt-3">
                        {lapangan.favorit.length === 0 ? (
                            <></>
                        ) : (
                            <>

                                {lapangan.favorit.map((data, i) => (
                                    <CardRekomendasi props={data} />
                                ))}
                            </>
                        )}
                    </div>
                </div>

                <div className='container my-4 text-black-50'>
                    <h4 style={{ color: 'black' }}>Daftar Lapangan</h4>
                    <select className='form-control form-select mt-4'>
                        <option>Futsal</option>
                        <option>Bulutangkis</option>
                        <option>Tenis</option>
                        <option>Basket</option>
                    </select>
                </div>
                <div className='container mt-4 text-black-50'>

                </div>
                <div className='container mt-4 text-black-50 mt-5'>


                    {currentPosts.length === 0 ? (
                        <></>
                    ) : (
                        <>
                            <div className="row p-2 row-cols-1 row-cols-md-4 g-4">
                                {currentPosts.map((data, i) => (
                                    <CardKategori props={data} />
                                ))}
                            </div>
                            <div className='container d-flex mt-4 text-center justify-content-center mt-3'>
                                <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
                            </div>
                        </>
                    )}


                </div>


            </div>




        </>
    )
}
