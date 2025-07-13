import { useEffect } from 'react';

function LoginPI() {
  useEffect(() => {
    const scopes = ['payments'];

    const onIncompletePaymentFound = (payment) => {
      console.log('Incomplete payment:', payment);
    };

    if (window.Pi) {
      window.Pi.authenticate(scopes, onIncompletePaymentFound)
        .then(auth => {
          console.log('✅ Auth success:', auth);
          // Kirim auth.payload ke backend Laravel untuk verifikasi dan generate token login lokal
        })
        .catch(error => {
          console.error('❌ Auth failed:', error);
        });
    }
  }, []);

  return (
    <div>
      <h2>Login via Pi Network</h2>
    </div>
  );
}

export default LoginPI;
 
