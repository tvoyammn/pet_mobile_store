import type { NextPage } from 'next'
import Head from 'next/head'
import MainLayout from '../../components/MainLayout'

import Counter from '../../features/counter/Counter'
import styles from '../../styles/Home.module.scss'

const IndexPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Phone Catalog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        Tablets
      </MainLayout>
    </div>
  )
}

export default IndexPage