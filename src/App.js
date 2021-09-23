import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from 'react-bootstrap'
import Home from "./pages/Home";
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import ConfirmPage from './pages/ConfirmPage';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={Home} exact />
          <Route path="/cart/:id?" component={CartPage} exact />
          <Route path='/product/:id' component={ProductPage} />
          <Route path='/confirm' component={ConfirmPage} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
