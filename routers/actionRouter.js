const express = require('express');

const Actions = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    // get all actions
    Actions.get().then(actions => {
        return res.status(200).json(actions);
    }).catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: "The actions information could not be retrieved" })
    });
});


router.delete('/:id', validateActionId, (req, res) => {
    // delete an action
    const actionId = req.params.id;
    Actions.remove(actionId).then(removed => {
        return res.status(200).json(removed);
    }).catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: "The action could not be removed" })
    });
});


router.put('/:id', validateActionId, (req, res) => {
    // update an action
    const actionId = req.params.id;
    const { description, notes } = req.body;
    Actions.update(actionId, { description, notes }).then(updated => {
        return res.status(200).json(updated);
    }).catch(error => {
        res.status(500).json({ errorMessage: "The action information could not be modified." })
    })
});


// custom middleware

function validateActionId(req, res, next) {
    const actionId = req.params.id;
    Actions.get(actionId).then((actions) => {
        if (actions) {
            req.action = actions;
            next();
        } else {
            res.status(404).json({ errorMessage: "invalid action id." });
        };
    }).catch(error => {
        console.log(error);
    })
}

module.exports = router;