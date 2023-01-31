
import Head from 'next/head'
import Image from 'next/image'
import Helmet from 'react-helmet'
import Carousel from 'react-bootstrap/Carousel'
import CardRekomendasi from '../components/user/home/CardRekomendasi'
import CardTestimonial from '../components/user/home/CardTestimonial'
import CardKomentar from '../components/user/home/CardKomentar'
import Youtube from '../components/user/home/youtube'
import useSWR from 'swr'
import Link from 'next/link'
import { useState } from 'react'
import { useSession, } from 'next-auth/react'
import { NextSeo } from 'next-seo';



export default function Home() {
  const [search, setSearch] = useState('')
  const { data: session, status } = useSession()

  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data: data, error } = useSWR('/api/homefavoritdb', fetcher, {refreshInterval: 1000})

  if (!data) {
    return<div className="spinner"></div>
  } else if (error) {
    return <div>Something went wrong</div>
  }


  let rekomendasi = data['message']
  console.log('Agregate:')
  console.log(rekomendasi)
  return (
    <>
        <NextSeo
        title="SEWA LAPANGAN OLAHRAGA Infolapangan – API SPORT"
        description="Pesan lapangan olahraga futsal, bulutangkis, basket lebih mudah dengan aplikasi kami. pesan lapangan yang anda inginkan dengan lokasi yang dekat dari rumah anda, dengan harga yang terjangkau"
        canonical="https://infolapangan.site/"
          openGraph={{
            url: 'https://infolapangan.site/artikel/',
            title: 'SEWA LAPANGAN OLAHRAGA – API SPORT',
            description: 'Pesan lapangan olahraga futsal, bulutangkis, basket lebih mudah dengan aplikasi kami. pesan lapangan yang anda inginkan dengan lokasi yang dekat dari rumah anda, dengan harga yang terjangkau',
            tags: ['Sewa lapangan online', 'boking lapangan', 'lihat jawal lapangan','boking lapangan di banyuwangi' ,],
            images: [
              {
                url: 'https://www.infolapangan.com/infolapangan.png',
                width: 800,
                height: 600,
                alt: 'Og Image Alt',
                type: 'image/jpeg',
              },
              { url: 'https://www.infolapangan.com/images/sewa-lapangan-olahraga.png' },
              { url: 'https://www.infolapangan.com/images/infolapangan.jpg' },
            ],
            siteName: 'info lapangan -api sport',
          }}
        />
      <Head>
        <meta name="google-site-verification" content="DsqtojQvQGXlFJPmasKfDt5kY3Yo2_yZ2fxtJLuW-Ac" />
      </Head>

      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="images/sewa-lapangan-olahraga.png" className="d-block img-fluid w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="images/api-sport.png" className="d-block img-fluid w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="images/infolapangan.jpg" className="d-block img-fluid w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className='container my-4 text-bold'>
        <h4 className='fw-bold fst-italic' style={{ color: '#EE8F00' }}>KATEGORI OLAHRAGA</h4>
        <div className="row row-cols-4 row-cols-md-4 g-4 mt-3">
          <div className="col-3 col-lg-3">
            <Link href={{
              pathname: '/kategori-lapangan',
              query: {
                kategori: 'Futsal'
              }

            }}>
              <div>
                <img src='icons/futsal.png' style={{ backgroundColor: '#432C0B', color: 'black' }} className="bd-placeholder-img img-fluid rounded-circle" width={120} height={120} role="img" aria-label="Placeholder: 140x140" />
                <p className="mt-2 p-1" style={{ color: "white", backgroundColor: '#432C0B', borderRadius: "5px" }}>Futsal</p>
              </div>

            </Link>
          </div>
          <div className="col-3 col-lg-3">
            <Link href={{
              pathname: '/kategori-lapangan',
              query: {
                kategori: 'Tenis'
              }

            }}>
              <div>
                <img src='icons/tenis.png' className="bd-placeholder-img img-fluid rounded-circle" style={{ backgroundColor: '#432C0B' }} width={120} height={120} role="img" aria-label="Placeholder: 140x140" />
                <p className="mt-2 p-1" style={{ color: "white", backgroundColor: '#432C0B', borderRadius: "5px" }}>Tenis</p>
              </div>
            </Link>
          </div>
          <div className="col-3 col-lg-3">
            <Link href={{
              pathname: '/kategori-lapangan',
              query: {
                kategori: 'Bulu Tangkis'
              }

            }}>
              <div>
                <img src='icons/bulutangkis.png' style={{ backgroundColor: '#432C0B' }} className="bd-placeholder-img img-fluid rounded-circle" width={120} height={120} role="img" aria-label="Placeholder: 140x140" />
                <p className="mt-2 p-lg-2" style={{ color: "white", backgroundColor: '#432C0B', borderRadius: "5px", fontSize: '12px' }}>Bulu Tangkis</p>
              </div>

            </Link>
          </div>
          <div className="col-3 col-lg-3">
            <Link href={{
              pathname: '/kategori-lapangan',
              query: {
                kategori: 'Basket'
              }

            }}>
              <div>
                <img src='icons/basket.png' style={{ backgroundColor: '#432C0B' }} className="bd-placeholder-img img-fluid rounded-circle" width={120} height={120} role="img" aria-label="Placeholder: 140x140" />
                <p className="mt-2 p-1" style={{ color: "white", backgroundColor: '#432C0B', borderRadius: "5px" }}>Basket</p>
              </div>

            </Link>
          </div>
        </div>
      </div>

      <div className="container my-4">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="btn-group col-md-12 col-12">
            <input type="text"
              className="form-control col-10 mt-2 col-md-10"
              placeholder="Cari Lapangan Disini"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className='col-2 mt-2 col-sm-2'>
              <Link href={`/cari-lapangan?search=${search}`} ><button className=" btn shadow-sm" style={{ backgroundColor: '#EE8F00' }}><i className="fa fa-search text-white"></i></button></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <a href='/lapangan' className='btn' style={{ color: "white", backgroundColor: '#ffbe2e', borderRadius: "15px" }}>Cari berdasarkan Lokasi</a>
      </div>


      <div>
        <div className="container my-4 text-black-50" >
          <h4 style={{ color: '#EE8F00' }} className='fw-bold fst-italic'>REKOMENDASI LAPANGAN</h4>
          <div className="row g-2 mt-3 p-2">
            {rekomendasi.length === 0 ? (
              <></>
            ) : (
              <>

                {rekomendasi.map((data, i) => (
                  <CardRekomendasi props={data} />
                ))}
              </>
            )}

          </div>
        </div>
        {/* <div className='container '>
          <Youtube />
        </div> */}
        <div className='container mt-4 my-4'>
          <h4 style={{ color: '#EE8F00' }} className='mb-5 py-3 header-custom'>TESTIMONI</h4>
          <CardTestimonial />
        </div>
        <div className='container '>
          <CardKomentar />
        </div>
        <div className='container mt-4 my-4 text-black-50'>
          <h4 style={{ color: '#EE8F00' }} className='mb-5 header-custom'>infolapangan</h4>
          <h5>Pesan lapangan olahraga futsal, bulutangkis, basket lebih mudah dengan aplikasi kami.
            pesan lapangan yang anda inginkan dengan lokasi yang dekat dari rumah anda, dengan harga yang terjangkau.
          </h5>
        </div>

        <div className='container mt-4 my-4 text-black-50'>
          <h4 style={{ color: '#EE8F00' }} className='mb-5 header-custom'>ALUR BOOKING</h4>
          <img src='/alur.png' className='d-block img-fluid' />
        </div>

      </div>




    </>
  )
}
