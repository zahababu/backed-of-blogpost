const express = require('express')
const bodyparser = require("body-parser")
const ejs = require("ejs")
const app = express()
const port = 3000
app.set("view engine", "ejs")
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.static("public"))
const startingContent = "My name is Yoshikage Kira. I’m 33 years old. My house is in the northeast section of Morioh, where all the villas are, and I am not married. I work as an employee for the Kame Yu department stores, and I get home every day by 8 PM at the latest. I don’t smoke, but I occasionally drink. I’m in bed by 11 PM, and make sure I get eight hours of sleep, no matter what. After having a glass of warm milk and doing about twenty minutes of stretches before going to bed, I usually have no problems sleeping until morning. Just like a baby, I wake up without any fatigue or stress in the morning."
const moreContent = "I was told there were no issues at my last check-up. I’m trying to explain that I’m a person who wishes to live a very quiet life. I take care not to trouble myself with any enemies, like winning and losing, that would cause me to lose sleep at night. That is how I deal with society, and I know that is what brings me happiness. Although, if I were to fight I wouldn’t lose to anyone."
const contactInfo = "You can call me Yoshikage Kira. I’m currently 33 years old. Not that you’d care, but I reside in northeast Morioh’s villa district. Also, I’ve yet to marry. In order to make a living, I work for Kame Yu department stores. After a long day’s work, I return home no later than 8 PM. I don’t like smoking, but do enjoy the occasional drink. I’m always in bed by 11 PM, and I make it a point to get no less than 8 hours of sleep each night. Before bed, I drink a warm glass of milk. It’s always coupled with 20 minutes of stretching to decompress from the long workday. Sweet dreams are the usual result of this."
let post = []
let bsadd = ""
const _ = require("lodash")
app.get('/', (req, res) => {
    res.render("home", { content: startingContent, post: post })
        // console.log(post)
})
app.get("/post/:postId", (req, res) => {
    let requested = _.lowerCase(req.params.postId)
    post.forEach((posts) => {
        let storeTitle = _.lowerCase(posts.pub)
        if (storeTitle === requested) {
            res.render("post", {
                title: posts.pub,
                content: posts.balls
            })
        } else { console.log("match not found") }
    })
})
app.get("/about", (req, res) => {
    res.render("about", { about: moreContent })

})
app.get("/contact", (req, res) => {
    res.render("contact", { contact: contactInfo })
})
app.get("/compose", (req, res) => {
    res.render("compose", { addbs: bsadd })
})
app.post("/compose", (req, res) => {
    let store = {
        balls: req.body.text,
        pub: req.body.title
    }
    post.push(store)
    res.redirect("/")
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})