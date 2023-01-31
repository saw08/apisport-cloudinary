import '../styles/globals.css'
import "../styles/bootstrap/css/bootstrap.min.css"
import '../styles/fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import '../styles/fonts/iconic/css/material-design-iconic-font.min.css'
import '../styles/vendor/select2/select2.min.css'
import '../styles/vendor/daterangepicker/daterangepicker.css'
import '../styles/css/util.css'
import '../styles/css/main.css'
import '../styles/theme.css'
import '../styles/userNavbar.css'
import '../styles/userFooter.css'
import "../styles/pagination.css"
import "../styles/userTestimonial.css"
import "../styles/user.css"
import { useRouter } from 'next/router'
import LayoutUser from '../layout/user/LayoutUser'
import LayoutMitra from '../layout/admin/LayoutAdmin'
import LayoutDev from '../layout/dev/LayoutDev'
import LayoutRegister from '../layout/register/LayoutRegister'
import { SessionProvider } from "next-auth/react"
import moment from 'moment'
import useSWR from 'swr'
import { DefaultSeo } from 'next-seo';

function MyApp({ Component, pageProps }) {
  var currentdate = new Date();
  var dateDate = currentdate.getDate() + "/"
    + (currentdate.getMonth() + 1) + "/"
    + currentdate.getFullYear()

  //Suwir
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  let url = ''
  url = `/api/cekjamdb?tglCekReq=${dateDate}`
  const { data: data, error } = useSWR(url, fetcher)

  if (!data) {
    return <div>Loading...</div>
  } else if (error) {
    return <div>Something went wrong</div>
  }

  //Deklarasi Array JSON SWR
  let transaksiCek = data['message']


  var a = moment("10:00:00", "HH:mm:ss");
  var b = moment("15:30:00", "HH:mm:ss");


  const checkTransaksi = () => {
    //Date Declaration
    var currentdate1 = new Date();
    var dateHours = + currentdate1.getHours() + ":"
      + currentdate1.getMinutes() + ":"
      + currentdate1.getSeconds();
    let dateHoursMoment = moment(dateHours, "HH:mm:ss");
    for (let i = 0; i < transaksiCek.length; i++) {
      let jam = moment(`${transaksiCek[i].diterimaJam}`, 'HH:mm:ss')
      let diff = dateHoursMoment.diff(jam, 'minutes')
      if (diff >= 60) {
        console.log(`Jam Diff adalah ${diff}`)
        console.log(`Object Id: ${transaksiCek[i]._id}`)
        console.log(`delete : ${true}`)
        deleteTransaksi(transaksiCek[i]._id)
      }
      else {
        console.log(`Jam Diff adalah ${diff}`)
        console.log(`Object Id: ${transaksiCek[i]._id}`)
        console.log(`delete : ${false}`)
      }
    }
    // console.log('difference:')
    // console.log(b.diff(a, 'minutes'))
    // console.log('adding:')
    // console.log(a.add(1, 'hours').format("HH:mm:ss"))
    // console.log('Transaksi Cek:')
    // console.log(transaksiCek)

  }

  const deleteTransaksi = async (idParam) => {
    try {
      console.log('Try')
      // Delete post
      await fetch('/api/transaksidb', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: idParam
        }),
      });
      // reset the deleting state
      // reload the page
    } catch (error) {
      // stop deleting state
    }
  };

  setInterval(checkTransaksi, 300000)
  const router = useRouter()
  if (router.pathname.startsWith('/mitra/')) {
    return (
      <section
        style={{
          fontWeight: 500,
        }}
      >
        <SessionProvider session={pageProps.session}>
          <div style={{
            fontWeight: 500,
          }}>
            <LayoutMitra>
            <Component {...pageProps} />
            </LayoutMitra>
          </div>
        </SessionProvider >
      </section>
    )
  }
  if (router.pathname.startsWith('/register/')) {
    return (
      <section
        style={{
          fontWeight: 500,
        }}
      >
        <SessionProvider session={pageProps.session}>
          <LayoutRegister>
            <DefaultSeo
              openGraph={{
                type: 'website',
                locale: 'en_IE',
                url: 'https://www.infolapangan,com/',
                siteName: 'apisport-infolapanan',
              }}
            />
            <Component {...pageProps} />
          </LayoutRegister>
        </SessionProvider >
      </section>
    )
  }
  else if (router.pathname.startsWith('/dev/')) {
    return (
      <LayoutDev>
        <Component {...pageProps} />
      </LayoutDev>
    )

  }
  else if (router.pathname.startsWith('/')) {
    return (
      <section
        style={{
          fontWeight: 500,
        }}
      >
        <SessionProvider session={pageProps.session}>
          <LayoutUser>
            <DefaultSeo
              openGraph={{
                type: 'website',
                locale: 'en_IE',
                url: 'https://www.infolapangan,com/',
                siteName: 'apisport-infolapanan',
              }}
            />
            <Component {...pageProps} />
          </LayoutUser>
        </SessionProvider>
      </section>
    )
  }
  else {
    return <RecoilRoot> <Component {...pageProps} /> </RecoilRoot>

  }
}

export default MyApp