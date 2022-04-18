

const mongoose = require('mongoose')
const Celebrity = require('./models/Celebrity')
mongoose.connect('mongodb://localhost/boilerplate')

const celebrities = [
    {
        name: "Hannah Montana",
        occupation: "Singer/Actress",
        catchPhrase: "Best of Both Worlds",
    },
    {
        name: "Britney Spears",
        occupation: "Singer",
        catchPhrase: "Its Britney, bitch",
    },
    {
        name: "Drake",
        occupation: "Rapper/Producer",
        catchPhrase: "YOLO",
    },

]

Celebrity.insertMany(celebrities)
	.then(celebrities => {
		console.log(`Success - added ${celebrities.length} to the db`)
		mongoose.connection.close()
	})
	.catch(err => {
		console.log(err)
	})