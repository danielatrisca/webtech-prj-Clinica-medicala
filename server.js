var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors")

var app = express();
app.use(bodyParser.json());
app.use(cors());
var Sequelize = require("sequelize");

//init sequelize connection
var sequelize = new Sequelize('clinic', 'danielatrisca', '', {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306
});

//define entity
var Doctor = sequelize.define('doctors', {
    name: {
        type: Sequelize.STRING,
        field: 'name'
    },
    forename: {
        type: Sequelize.STRING,
        field: 'forename'
    },
    specialty: {
        type: Sequelize.STRING,
        field: 'specialty'
    },
    department: {
        type: Sequelize.STRING,
        field: 'department'
    },
    email: {
        type: Sequelize.STRING,
        field: 'email'
    },
    phone: {
        type: Sequelize.STRING,
        field: 'department'
    }
}, {
    freezeTableName: false,
    timestamps: false
});

var nodeadmin = require('nodeadmin');
app.use(nodeadmin(app));

var data = [{
    id: 1
}, {
    id: 2
}, {
    id: 3
}];


//create new resource 
app.post('/doctors', function(request, response) {
    Doctor.create(request.body).then(function(doctor) {
        Doctor.findById(doctor.id).then(function(doctor) {
            response.status(201).send(doctor);
        });
    });
});

//read all
app.get('/doctors', function(request, response) {
    Doctor.findAll().then(function(doctors) {
        response.status(200).send(doctors);
    });
});

//read one by id
app.get('/doctors/:id', function(request, response) {
    Doctor.findById(request.params.id).then(function(doctor) {
        if (doctor) {
            response.status(200).send(doctor);
        }
        else {
            response.status(404).send();
        }
    });

});

//update one by id
app.put('/doctors/:id', function(request, response) {
    Doctor
        .findById(request.params.id)
        .then(function(doctor) {
            if (doctor) {
                doctor
                    .updateAttributes(request.body)
                    .then(function() {
                        response.status(200).send('updated');
                    })
                    .catch(function(error) {
                        console.warn(error);
                        response.status(500).send('server error');
                    });
            }
            else {
                response.status(404).send();
            }
        });
});

//delete one by id
app.delete('/doctors/:id', function(request, response) {
    Doctor
        .findById(request.params.id)
        .then(function(doctor) {
            if (doctor) {
                doctor
                    .destroy()
                    .then(function() {
                        response.status(204).send();
                    })
                    .catch(function(error) {
                        console.warn(error);
                        response.status(500).send('server error');
                    });
            }
            else {
                response.status(404).send();
            }
        });
});

//include static files in the admin folder
app.use('/admin',express.static('admin'));

app.listen(process.env.PORT);
