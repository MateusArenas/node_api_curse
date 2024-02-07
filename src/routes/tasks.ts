import express from 'express';

export const router = express.Router();

router.get('/tasks', function (req, res) {
  res.send('Get tasks');
});

router.get('/tasks/:id', function (req, res) {
  res.send('Get task: ' + req.params.id);
});

router.post('/tasks', function (req, res) {
  res.send('Create task: ' + JSON.stringify(req.body));
});

router.put('/tasks', function (req, res) {
  res.send('Update task: ' + JSON.stringify(req.body));
});

router.delete('/tasks/:id', function (req, res) {
  res.send('Delete task: ' + req.params.id);
});
