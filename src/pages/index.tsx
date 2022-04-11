import { useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'

import { Navigation, Pagination as SwiperPagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay"

import MainLayout from '../components/MainLayout'
import Pagination from '../components/Pagination';

import styles from '../styles/Home.module.scss'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getProducts, selectBrandNew, selectHotPrices, selectPhonesCount, selectTabletsCount } from '../features/products/productsSlice';
import { Product } from '../types/product';

type Props = {
  hotPricesProducts: Product[],
  brandNewProducts: Product[],
  phonesCount: number,
  tabletsCount: number
}

const IndexPage: NextPage<Props> = ({ hotPricesProducts, brandNewProducts, phonesCount, tabletsCount }) => {
  const [hotPricesPage, setHotPricesPage] = useState(1);

  return (
    <div className={styles.container}>
      <Head>
        <title>Phone Catalog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation
          autoplay={true}
          modules={[SwiperPagination, Navigation, Autoplay]}
          className={styles.swiper}
        >
          <SwiperSlide className={styles.swiper__slide} />
          <SwiperSlide className={styles.swiper__slide} />
          <SwiperSlide className={styles.swiper__slide} />
        </Swiper>
        <section className={styles.hot_prices}>
          <div className={styles.hot_prices__header}>
            <h1 className={styles.hot_prices__header_title}>
              Hot prices
            </h1>
            <Pagination />
          </div>
          <p>{hotPricesProducts}</p>
          {/* // <ProductsList /> */}
        </section>
      </MainLayout>
    </div>
  )
}

export default IndexPage

export async function getServerSideProps() {
  const dispatch = useAppDispatch();
  await dispatch(getProducts());

  const hotPricesProducts = useAppSelector(selectHotPrices);
  const brandNewProducts = useAppSelector(selectBrandNew);
  const phonesCount = useAppSelector(selectPhonesCount);
  const tabletsCount = useAppSelector(selectTabletsCount);

  return {
    props: {
      hotPricesProducts,
      brandNewProducts,
      phonesCount,
      tabletsCount
    }, // will be passed to the page component as props
  }
}
