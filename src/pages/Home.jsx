import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import ProductList from '../components/ProductList';
import axios from 'axios';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    getProducts();

    // Cek apakah Pi SDK tersedia
    if (window?.Pi && typeof window.Pi.authenticate === 'function') {
      setSdkReady(true);
    }
  }, []);

  const getProducts = (keyword = "") => {
    axios.get(`http://localhost:8000/api/produk-publik?search=${keyword}`)
      .then((res) => {
        const data = res.data?.data?.data || [];
        setProducts(data);
      })
      .catch((err) => console.error('❌ Gagal ambil produk:', err));
  };

  const loginPiSDK = () => {
    if (!window?.Pi || typeof window.Pi.authenticate !== 'function') {
      alert('⚠️ Silakan buka halaman ini via Pi Browser untuk login.');
      return;
    }

    window.Pi.authenticate(['payments'], function (incompletePayment) {
      console.log('🕓 Incomplete payment:', incompletePayment);
    })
    .then((auth) => {
      axios.post('http://localhost:8000/api/auth/sdk-login', {
        accessToken: auth.accessToken,
        user_uid: auth.user.uid,
        username: auth.user.username,
      }).then(res => {
        alert('✅ Login Pi SDK berhasil!');
        console.log('🧑‍💼 User session:', res.data);
      }).catch(err => {
        console.error('❌ Gagal kirim ke backend:', err);
      });
    })
    .catch((err) => {
      console.error('❌ Login Pi SDK gagal:', err);
    });
  };

  return (

    <Layout>
      <Header
        onSearch={getProducts}
        onLogin={loginPiSDK}
        sdkReady={sdkReady}
      />
<div className="mt-4">
  <ProductList products={products} />
</div>

      <BottomNav />
    </Layout>
  );
}
