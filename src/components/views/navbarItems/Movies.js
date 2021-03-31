import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Carousel from '../../shared/LandCarousel'
import LowerNav from '../../shared/navbar/LowerNav'
import './Items.css'

function Movies() {
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Carousel />
                    </Col>
                </Row>
            </Container>
            <LowerNav />
        </div>
    )
}

export default Movies;