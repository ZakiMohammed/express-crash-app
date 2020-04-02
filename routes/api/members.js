const express = require('express');
const members = require('../../members');
const uuid = require('uuid');
const router = express.Router();

// get member
router.get('/:id', (req, res) => {
    const found = members.find(i => i.id === req.params.id);
    if (found) {
        res.json(found);
    } else {
        res.status(404).json({ message: `Member not found for id ${req.params.id}` });
    }
});

// get all members
router.get('/', (req, res) => res.json(members));

// create member
router.post('/', (req, res) => {
    const member = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    };

    if (!member.name || !member.email) {
        res.status(400).json({ message: 'Required name and email' });
    }

    members.push(member);
    // res.json(members);
    res.redirect('/');
});

// update member
router.put('/:id', (req, res) => {
    const index = members.findIndex(i => i.id === req.params.id);
    if (index !== -1) {
        members[index].name = req.body.name || members[index].name;
        members[index].email = req.body.email || members[index].email;

        res.json({ 
            message: `Member updated`,
            member: members[index]
        });
    } else {
        res.status(404).json({ message: `Member not found for id ${req.params.id}` });
    }
});

// delete member
router.delete('/:id', (req, res) => {
    const index = members.findIndex(i => i.id === req.params.id);
    if (index !== -1) {
        const member = {...members[index]};
        members.splice(index, 1);
        res.json({ 
            message: `Member deleted`,
            member
        });
    } else {
        res.status(404).json({ message: `Member not found for id ${req.params.id}` });
    }
});

module.exports = router;
