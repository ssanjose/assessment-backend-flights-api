import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../../src/index.js';

const should = chai.should();
chai.use(chaiHttp);

describe('Flight Test', () => {
    describe('Get all flights from 2021-11-01 till 2021-11-03', () => {
        // Test to get all flights successfully
        it('should return 200 when succesful', (done) => {
            let request = chai.request(server).keepOpen();

            Promise.all([
                request.post('/api/tickets').send({
                    "event": {
                        "ticketId": 10,
                        "flightDate": "2021-11-01",
                        "flightNumber": "AB1",
                        "seatNumber": "1A",
                        "ticketCost": 100000
                    }
                }),
                request.post('/api/tickets').send({
                    "event": {
                        "ticketId": 11,
                        "flightDate": "2021-11-02",
                        "flightNumber": "AB1",
                        "seatNumber": "2A",
                        "ticketCost": 100000
                    }
                }),
            ]).then(() => {
                request.get('/api/flights?startDate=2021-11-01&endDate=2021-11-03')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        let date = res.body.dates.find(el => el.date === "2021-11-02");

                        // check revenue
                        let flightAB1 = date.flights.find(el => el.flightNumber === "AB1");
                        expect(flightAB1.revenue).to.equal(200000);

                        // check if seats are correct
                        let seatsAreCorrect = flightAB1.occupiedSeats.every(el => ["1A", "2A"].includes(el));
                        expect(seatsAreCorrect).to.equal(true);

                        request.close();
                        done();
                    })
            });
        });

        // Test to get all flights with invalid startDate
        it('should return 400 when invalid startDate', (done) => {
            chai.request(server)
                .get('/api/flights?startDate=2021-11-0&endDate=2021-11-06')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('failed');
                    res.body.should.have.property('reason').eql('startDate format is invalid');
                    done();
                });
        });

        // Test to get all flights with invalid endDate
        it('should return 400 when invalid endDate', (done) => {
            chai.request(server)
                .get('/api/flights?startDate=2021-11-01&endDate=2021-11-0')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('failed');
                    res.body.should.have.property('reason').eql('endDate format is invalid');
                    done();
                });
        });

        // Test to get all flights with empty startDate
        it('should return 400 when empty startDate', (done) => {
            chai.request(server)
                .get('/api/flights?startDate=&endDate=2021-11-06')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('failed');
                    res.body.should.have.property('reason').eql('startDate is empty');
                    done();
                });
        });

        // Test to get all flights with empty endDate
        it('should return 400 when empty endDate', (done) => {
            chai.request(server)
                .get('/api/flights?startDate=2021-11-01&endDate=')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('failed');
                    res.body.should.have.property('reason').eql('endDate is empty');
                    done();
                });
        });

        // Test to get all flights with endDate is before startDate
        it('should return 400 when endDate is before startDate', (done) => {
            chai.request(server)
                .get('/api/flights?startDate=2021-11-06&endDate=2021-11-01')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('failed');
                    res.body.should.have.property('reason').eql('endDate cannot be before startDate');
                    done();
                });
        });

    });
});