import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {} from "./App.css"
function Footer() {
  return (
    <div className='footer'>
        <Card className="text-center">
      <Card.Header>Featured</Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="dark">Go somewhere</Button>
      </Card.Body>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
    </div>
  );
}

export default Footer;