const router = require("express").Router();
const Celebrity = require("../models/Celebrity");


router.get('/celebrity/new', (req, res, next) => {
	res.render('celebrities/new')
});



router.get('/celebrity', (req, res, next) => {
	// get all the books from the db
	Celebrity.find()
		.then(celebrityFromDB => {
			//console.log(celebrityFromDB)
			res.render('celebrities/index', { celebrity: celebrityFromDB })
		})
		.catch(err => {
			next(err)
		})
})

router.get('/celebrity/:id/edit', (req, res, next) => {
	// get this book from the db
	const id = req.params.id
	Celebrity.findById(id)
		.then(celebrityFromDB => {
			res.render('celebrities/edit', { celebrity: celebrityFromDB })
		})
		.catch(err => {
			next(err)
		})
});

router.post('/celebrity/:id/edit', (req, res, next) => {
	const { name, occupation, catchPhrase} = req.body
	const id = req.params.id
	// update this celeb in the db
	// if this should return the updated celeb -> add {new: true} 
	Celebrity.findByIdAndUpdate(id, {
		name: name,
        occupation: occupation,
        catchPhrase: catchPhrase,

	}, { new: true })
		.then(updatedCelebrity => {
			console.log(updatedCelebrity)
			// redirect to the detail page of the updated celeb	
			res.redirect(`/celebrity/${updatedCelebrity._id}`)
		})
		.catch(err => {
			next(err)
		})
});




router.get('/celebrity/:id', (req, res, next) => {
	//console.log('celebrity id')
	const id = req.params.id
	//console.log(id)
	Celebrity.findById(id)
		.then(celebrityFromDB => {
			console.log(celebrityFromDB)
			res.render('celebrities/show', { celebrity: celebrityFromDB })
		})
		.catch(err => {
			next(err)
		})
});

router.post('/celebrity', (req, res, next) => {
	// create the book in the db
	const { name, occupation, catchPhrase} = req.body
	console.log(name, occupation, catchPhrase)

	var cel = new Celebrity(req.body)

	cel.save({
        name: name,
        occupation: occupation,
        catchPhrase: catchPhrase,	
	})
		.then(createdCel => {
			
			res.redirect(`/celebrity/${createdCel.id}`)
			
		})
		.catch(err => {
			next(err)
			res.redirect(`/celebrity/new`)
		})
});

router.get('/celebrity/:id/delete/', (req, res, next) => {
	const id = req.params.id

	Celebrity.findByIdAndDelete(id)
		.then(() => {
		
			res.redirect('/celebrity')
		})
		.catch(err => {
			next(err)
		})
});








module.exports = router;