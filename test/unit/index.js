const supertest = require("supertest");
const chai = require("chai");
const app = require("../../index");
const request = supertest(app);
const httpStatus = require("http-status");

app.db.defaults({ users: [] }).write();

const usersStore = app.db.get("users");

describe("Authentication Routes", function(){

    beforeEach(function(done){

        usersStore.push({
            "_id": "5410953eb0e0c0ae25608277",
            "guid": "eab0324c-75ef-49a1-9c49-be2d68f50b96",
            "isActive": true,
            "balance": "$3,585.69",
            "picture": "http://placehold.it/32x32",
            "age": 30,
            "eyeColor": "blue",
            "name": {
                "first": "Henderson",
                "last": "Briggs"
            },
            "company": "GEEKNET",
            "email": "henderson.briggs@geeknet.net",
            "password": "23derd*334",
            "phone": "+1 (936) 451-3590",
            "address": "121 National Drive, Cotopaxi, Michigan, 8240"
        }).write();

        done();

    });

    afterEach(function(done){


        usersStore.remove({guid: "eab0324c-75ef-49a1-9c49-be2d68f50b96"}).write();

        request.get("/api/logout")
            .expect(200)
            .end(function(err){
                done(err)
            })

    });

    describe("[ POST ] /login", function(){

        it("rejects requests from users using invalid credentials", function(done){

            request.post("/api/login")
                .send({
                    email: "henderson.briggs@geeknet.net",
                    password: "potato"
                })
                .expect(httpStatus.UNAUTHORIZED)
                .end(function(err, res){
                    done(err)
                })


        });

        it("authenticates a user using valid credentials", function(done){

            request.post("/api/login")
                .send({
                    email: "henderson.briggs@geeknet.net",
                    password: "23derd*334"
                })
                .expect(httpStatus.ACCEPTED)
                .end(function(err, res){
                    done(err)
                })

        });

    });

});