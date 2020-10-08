const supertest = require("supertest");
const chai = require("chai");
const app = require("../../index");
const request = supertest(app);
const httpStatus = require("http-status");

describe("Authentication Routes", function(){

    beforeEach(function(done){

        app.db.defaults({ users: [] });

        const usersStore = app.db.get("users");

        usersStore.push([{
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
        }, {
            "_id": "5410953eee9a5b30c3eea476",
            "guid": "b26ea5d1-d8db-4106-91a2-57f42a5c7e9e",
            "isActive": false,
            "balance": "$3,230.56",
            "picture": "http://placehold.it/32x32",
            "age": 30,
            "eyeColor": "brown",
            "name": {
                "first": "Boyd",
                "last": "Small"
            },
            "company": "ENDIPINE",
            "email": "boyd.small@endipine.biz",
            "password": "_4rhododfj",
            "phone": "+1 (814) 437-3837",
            "address": "261 Willow Street, Whipholt, Louisiana, 2879"
        }]).write();

        done();

    });

    afterEach(function(done){

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