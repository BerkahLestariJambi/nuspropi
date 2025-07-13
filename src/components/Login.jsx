export default function PiLoginButton({ onLoginSuccess }) {
  const handleLogin = () => {
    if (!window.Pi) return alert('Pi SDK belum dimuat');
    window.Pi.authenticate(['payments'], (payment) => {
      console.log('Found incomplete payment:', payment);
    })
      .then((auth) => {
        const payload = {
          uid: auth.user.uid,
          username: auth.user.username,
          accessToken: auth.accessToken,
        };

        fetch('http://localhost:8000/api/pi-auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              localStorage.setItem('token', data.token);
              onLoginSuccess(data.user);
            }
          });
      })
      .catch(console.error);
  };

  return (
    <button onClick={handleLogin} style={{ margin: '1rem', padding: '0.5rem 1rem' }}>
      Login via Pi Network
    </button>
  );
}
 
