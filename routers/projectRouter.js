const express = require('express');

const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
  // get all projects
  Projects.get().then(projects => {
    return res.status(200).json(projects);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ errorMessage: "The projects information could not be retrieved" })
  });
})


router.get('/:id/actions', validateProjectId, (req, res) => {
  // get all actions for a project
  Projects.getProjectActions(req.params.id).then((actions) => {
    return res.status(200).json(actions);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ errorMessage: "The actions for the project could not be retrieved" })
  });
});


router.post('/', validateProject, (req, res) => {
  // create a project
  Projects.insert(req.body).then(projects => {
    return res.status(201).json(projects);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ errorMessage: "There was an error while creating the project" })
  });
});


router.post('/:id/actions', validateProjectId, validateAction, (req, res) => {
  // create an action for a project
  Actions.insert({ project_id: req.params.id, description: req.body.description, notes: req.body.notes }).then(action => {
    return res.status(200).json(action)
  }).catch(error => {
    console.log(error);
    res.status(500).json({ errorMessage: "There was an error while saving the action to the database" })
  });
});


router.delete('/:id', validateProjectId, (req, res) => {
  // delete a project
  const projectId = req.params.id;
  Projects.remove(projectId).then(removed => {
    return res.status(200).json(removed);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ errorMessage: "The project could not be removed" })
  });
});


router.put('/:id', validateProjectId, (req, res) => {
  // update a project
  const projectId = req.params.id;
  const { name, description } = req.body;
  if (name && description) {
    Projects.update(projectId, { name, description }).then(updated => {
      return res.status(200).json(updated);
    }).catch(error => {
      res.status(500).json({ errorMessage: "The project information could not be modified." })
    })
  } else {
    res.status(400).json({ errorMessage: "Please provide name and description for the project." })
  }
})

//custom middleware

function validateProjectId(req, res, next) {
  const projectId = req.params.id;
  Projects.get(projectId).then((projects) => {
    if (projects) {
      req.project = projects;
      next()
    } else {
      res.status(404).json({ errorMessage: "invalid project id" });
    };
  }).catch(error => {
    console.log(error)
  })
}

function validateProject(req, res, next) {
  if (req.body.name && req.body.description) {
    next();
  } else {
    res.status(400).json({ message: "missing required name and description fields" })
  }
}

function validateAction(req, res, next) {
  if (req.body) {
    if (req.body.description && req.body.notes) {
      if (req.body.description.length < 129) {
        next();
      } else {
        res.status(400).json({ message: "missing action data and or description is too long - 128 characters or less" })
      }
    } else {
      res.status(400).json({ message: "missing required description or notes fields" })
    }
  } else {
    res.status(400).json({ message: "action could not be posted" })
  }
}

module.exports = router;