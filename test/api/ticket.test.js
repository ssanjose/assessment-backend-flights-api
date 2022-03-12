import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../../src/index.js';

const should = chai.should();
chai.use(chaiHttp);

describe('Ticket Test', () => {
    describe('Post a ticket', () => {
        // Test to post a ticket successfully
        it('should return 200 when succesful', (done) => {
            chai.request(server)
                .post('/api/tickets')
                .send({
                    "event": {
                        "ticketId": 1,
                        "flightDate": "2021-11-01",
                        "flightNumber": "AC1",
                        "seatNumber": "1A",
                        "ticketCost": 100000
                    }
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    done();
                });
        });

        // Test to post a ticket with duplicate ticketId
        it('should return 400 when duplicate ticketId', (done) => {
            chai.request(server)
                .post('/api/tickets')
                .send({
                    "event": {
                        "ticketId": 1,
                        "flightDate": "2021-11-01",
                        "flightNumber": "AC1",
                        "seatNumber": "1A",
                        "ticketCost": 100000
                    }
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('failed');
                    res.body.should.have.property('reason').eql('ticketId already exists');
                    done();
                });
        });

        // Test to post a ticket with taken seatNumber in same flight
        it('should return 400 when taken seatNumber in same flight', (done) => {
            chai.request(server)
                .post('/api/tickets')
                .send({
                    "event": {
                        "ticketId": 2,
                        "flightDate": "2021-11-01",
                        "flightNumber": "AC1",
                        "seatNumber": "1A",
                        "ticketCost": 100000
                    }
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('failed');
                    res.body.should.have.property('reason').eql('seatNumber already taken');
                    done();
                });
        });

        // Test to post a ticket with different seatNumber in same flight
        it('should return 200 when different seatNumber in same flight', (done) => {
            chai.request(server)
                .post('/api/tickets')
                .send({
                    "event": {
                        "ticketId": 2,
                        "flightDate": "2021-11-02",
                        "flightNumber": "AC1",
                        "seatNumber": "1B",
                        "ticketCost": 100000
                    }
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    done();
                });
        });

        // Test to post a ticket with different seatNumber in same flight and diffrerent flightDate
        it('should return 200 when different seatNumber in same flight and diffrerent flightDate', (done) => {
            chai.request(server)
                .post('/api/tickets')
                .send({
                    "event": {
                        "ticketId": 3,
                        "flightDate": "2021-11-03",
                        "flightNumber": "AC1",
                        "seatNumber": "1C",
                        "ticketCost": 100000
                    }
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    done();
                });
        });

        // Test to post a ticket with same seatNumber in different flight
        it('should return 200 when same seatNumber in different flight', (done) => {
            chai.request(server)
                .post('/api/tickets')
                .send({
                    "event": {
                        "ticketId": 4,
                        "flightDate": "2021-11-04",
                        "flightNumber": "AC2",
                        "seatNumber": "1A",
                        "ticketCost": 100000
                    }
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    done();
                });
        });
    });
});