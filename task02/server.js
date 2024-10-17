const express = require('express');
const app = express();
const PORT = process.env.PORT || 300;


// sample data

const userDB = {
    "shubham_more": {
        "username": "shubham_more",
        "name": "Shubham More",
        "email": "user1@gmail.com",
        "age": "21",
        "location": "pune",
        "active_status": true

    },

    "dude": {
        "username": "dude",
        "name": "Dude",
        "email": "dude@gmail.com",
        "age": "22",
        "location": "mumbai",
        "active_status": true
    }
};

app.get('/api/users/:username', (req, res) => {
    const { username } = req.params;
    const { fields, expand } = req.query;

    // Fetching the user from the database
    const user = userDB[username];
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    let responseUser = { ...user };

    // Filtering fields if specified
    if (fields) {
        const fieldsArray = fields.split(',');
        responseUser = fieldsArray.reduce((acc, field) => {
            if (user[field] !== undefined) acc[field] = user[field];
            return acc;
        }, { username: user.username });
    }

    if (expand) {
        const expandArray = expand.split(',');
        const additionalFields = expandArray.reduce((acc, field) => {
            if (user[field] !== undefined) acc[field] = user[field];
            return acc;
        }, {});
        responseUser.additionalFields = additionalFields;
    }

    res.json(responseUser);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

});

