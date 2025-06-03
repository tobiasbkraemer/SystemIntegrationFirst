import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_...'); // Publishable key

function App() {
  const handleClick = async () => {
    const stripe = await stripePromise;
    window.location.href = 'https://buy.stripe.com/test_cNi28r7NU65L6OQ79K8Ra00'; // Stripe payment link
  };

  return (
    <div>
      <h1>Stripe Payment Demo</h1>
      <button onClick={handleClick}>Køb produkt</button>
    </div>
  );
}

export default App;
