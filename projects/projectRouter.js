const express = require('express');
const projectDb = require('./projectModel');

const router = express.Router();


router.get('/', (req, res, next) => {
    projectDb.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(next)
})

router.get('/:id/actions', validateProjectId, (req, res, next) => {
    const { id } = req.params;

    projectDb.getProjectActions(id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(next)
})

router.post('/', validateProjectInfo, (req, res, next) => {
    projectDb.insert(req.body)
        .then(projects => {
            res.status(201).json(projects)
        })
        .catch(next)
})

router.put('/:id', validateProjectInfo, (req, res, next) => {
    const { id } = req.params;

    projectDb.update(id, req.body)
        .then(project => {
            if(project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({ message: "The project with the specified ID does not exist." });
            }
        })
        .catch(next);
})

router.delete('/:id', (req, res, next) => {
    const { id } = req.params;

    projectDb.remove(id)
        .then((num) => {
            if(num === 0) {
                res.status(404).json({ message: "The project with the specified ID does not exist." });
            } else {
                res.status(200).json({ message: `You've deleted project with id ${id}, successfully` }); 
            }
        })
        .catch(next)
})

function validateProjectId(req, res, next) {
    const { id } = req.params;

    projectDb.get(id)
        .then((project) => {
            if(project) {
                next();
            } else {
                res.status(404).json({ message: "The project with the specified ID does not exist." });
            }
        })
        .catch(next)
}

function validateProjectInfo(req, res, next) {
    if (Object.keys(req.body).length) {
        const { name, description } = req.body;
        
        if (name && description) {
            next();
        } else {
            res.status(400).json({ message: "Project name and description required" });
        }
    } else {
        res.status(400).json({ message: "Missing project request body" });
    }
}

router.use((error, req, res) => {
    res.status(500).json({
        file: 'projectRouter',
        method: req.method,
        url: req.url,
        message: error.message
    })
})

module.exports = router;