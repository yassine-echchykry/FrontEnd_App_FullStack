import './App.css';
import { Bienvenue } from './components/Bienvenue';
import { Footer } from './components/Footer';
import { NavigationBar } from './components/NavigationBar';
import { Col, Container, Row } from 'react-bootstrap';
import { Voiture } from './components/Voiture';
import { VoitureListe } from './components/VoitureListe';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const marginTop = { marginTop: "20px" }
  return (
    <div className='App bg-secondary'>
      <Router>
        <NavigationBar />
        <Container >
          <Row>
            <Col lg={12} style={marginTop} >
              <Routes>
                <Route path="/" exact element={<Bienvenue />} />
                <Route path="/add" exact element={<Voiture />} />
                <Route path="/edit/:id" exact element={<Voiture />}/>
                <Route path="/list" exact element={<VoitureListe />} />
              </Routes>
            </Col>
          </Row>
        </Container>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
