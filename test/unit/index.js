const supertest = require("supertest");
const chai = require("chai");
const app = require("../../index");
const request = supertest(app);
const httpStatus = require("http-status");
const { assert } = chai;

app.db.defaults({ users: [] }).write();

const usersStore = app.db.get("users");

describe("Authentication API Routes", function(){

    before(function(done){

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
        request.get("/api/logout")
            .expect(200)
            .end(function(err){
                done(err)
            })
    });

    after(function(){

        usersStore.remove({guid: "eab0324c-75ef-49a1-9c49-be2d68f50b96"}).write();

    });

    describe("[ POST ] /api/login", function(){

        it("rejects requests from users using invalid passwords", function(done){

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

        it("rejects requests from users using invalid emails", function(done){

            request.post("/api/login")
                .send({
                    email: "potato@geeknet.net",
                    password: "23derd*334"
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

describe("Users API Routes", function(){

    before(function(done){

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

    after(function(done){

        usersStore.remove({guid: "eab0324c-75ef-49a1-9c49-be2d68f50b96"}).write();

        request.get("/api/logout")
            .expect(200)
            .end(function(err){
                done(err)
            })

    });

    describe("[ GET ] /api/user", function(){

        it("should return the currently logged in user", function(done){

            request.get("/api/user")
                .expect(200)
                .end(function(err, res){

                    if(err){
                        return done(err)
                    }

                    assert(res.user, "User returned");

                    done();

                })

        });

        it("should not return protected properties, like password", function(done){

            request.get("/api/user")
                .expect(200)
                .end(function(err, res){

                    if(err){
                        return done(err)
                    }

                    assert(res.user, "User returned");
                    assert(res.user.password === null, "User's password is not shown");
                    assert(res.user._id === null, "User's _id is not shown");
                    assert(res.user.guid === null, "User's guid is not shown");
                    assert(res.user.isActive === null, "User status is not shown");

                    done();

                })
        });

        it("should return public properties, like balance", function(done){

            request.get("/api/user")
                .expect(200)
                .end(function(err, res){

                    if(err){
                        return done(err)
                    }

                    assert(res.user, "User returned");
                    assert(res.user.balance !== null, "User's balance is shown");
                    assert(res.user.name.first !== null, "User's first name is shown");
                    assert(res.user.name.last !== null, "User's last name is shown");

                    done();
                })
        })

    });

    describe("[ PUT ] /api/user", function(){

        it("should update the currently logged in user", function(done){

            request.put("/api/user")
                .send({
                    phone: "+1 (555) 555-5555",
                    address: "123 Sesame Street",
                    age: "159",
                    company: "Colt Builders",
                    email: "henderson@coltbuilders.com"
                })
                .expect(httpStatus.ACCEPTED)
                .end(function(err, res){
                    if(err){
                        return done(err)
                    }

                    assert(res.user, "User returned");
                    assert(res.user.phone === "+1 (555) 555-5555", "User's phone was updated");
                    assert(res.user.address === "123 Sesame Street", "User's address was updated");
                    assert(res.user.age === "159", "User's age was updated");
                    assert(res.user.company === "Colt Builders", "User's company was updated");
                    assert(res.user.email === "henderson@coltbuilders.com", "User's email was updated");

                    done();
                })

        });

        it("should not allow the user to update protected properties, like balance", function(done){

            request.put("/api/user")
                .send({
                    balance: "$1,000,000,000.00"
                })
                .expect(httpStatus.NOT_ACCEPTABLE)
                .end(function(err, res){
                    done(err)
                })

        })

    })



});