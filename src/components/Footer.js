import React from 'react'
import { Col, Container, Navbar } from 'react-bootstrap'

export const Footer = () => {
    let fullYear = new Date().getFullYear();
    return (
        <Navbar fixed="bottom" bg="dark" variant="dark">
            <Container>
                <Col lg={12} className="text-center text-white">
                    <div>
                        {fullYear}-{fullYear + 1}, All Rights Reserved by Master MIOLA
                    </div>
                </Col>
            </Container>
        </Navbar>
    )
}
