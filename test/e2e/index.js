module.exports = {

    //TODO: need to make it test updates, but out of time :(

    // Currently requires production env to run.

    Test(browser){
        browser
            .url("http://localhost:3005")
            .waitForElementPresent("#app", 10000)
            .waitForElementVisible("#login")
            .setValue("#username", "not-a-real-username")
            .setValue("#password", "not-a-real-password")
            .click("#authenticate")
            .assert.visible("#login-error")
            .setValue("#username", "\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b") // Clear value... for some reason .clearValue doesn't work
            .setValue("#password", "\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b")
            .perform(function(done){
                return setTimeout(done, 1000)
            })
            .setValue("#username", "henderson.briggs@geeknet.net")
            .setValue("#password", "23derd*334")
            .click("#authenticate")
            .waitForElementPresent("#account", 10000)
            .click("#show-balance")
            .assert.visible("#balance")
            .click("#close-balance")
            .click("#show-edit")
            .assert.visible("#edit")
            .click("#close-edit")
            .end()
    }
}