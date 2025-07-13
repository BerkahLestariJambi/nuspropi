import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('👀 Mengecek Pi SDK...');
  const navigate = useNavigate();

  useEffect(() => {
    const scopes = ['payments'];

    if (!window?.Pi || typeof window.Pi.authenticate !== 'function') {
      setStatus('⚠️ Pi SDK tidak tersedia. Silakan buka halaman ini via Pi Browser.');
      setLoading(false);
      return;
    }

    setStatus('🔐 Sedang autentikasi dengan Pi Network...');

    window.Pi.authenticate(scopes, function (incompletePayment) {
      console.log('⏳ Incomplete payment:', incompletePayment);
    })
      .then((auth) => {
        setStatus('✅ Login Pi SDK berhasil, verifikasi ke server...');
        return axios.post('http://localhost:8000/api/auth/sdk-login', {
          accessToken: auth.accessToken,
          user_uid: auth.user.uid,
          username: auth.user.username,
        });
      })
      .then((res) => {
        console.log('🧑‍💼 User session:', res.data);
        setStatus('🎉 Login sukses! Mengarahkan...');
        setTimeout(() => navigate('/'), 2000); // Redirect setelah login
      })
      .catch((err) => {
        console.error('❌ Login gagal:', err);
        setStatus('❌ Login gagal. Coba ulangi di Pi Browser.');
        setLoading(false);
      });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="max-w-md w-full text-center space-y-4">
        <h1 className="text-xl font-bold">🔐 Login via Pi Network</h1>
        <p className="text-sm text-white/80">{status}</p>
        {!loading && (
          <button
            onClick={() => window.location.reload()}
            className="mt-4 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded"
          >
            🔄 Coba Lagi
          </button>
        )}
      </div>
    </div>
  );
}
