var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");


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
        field: 'phone'
    }
}, {
    freezeTableName: false,
    timestamps: false
});

var Service = sequelize.define('services', {
    name: {
        type: Sequelize.STRING,
        field: 'name'
    },
    price: {
        type: Sequelize.INTEGER,
        field: 'price'
    }
}, {
    freezeTableName: false,
    timestamps: false
});


//define entity
var Appointment = sequelize.define('appointments', {
    name_forename: {
        type: Sequelize.STRING,
        field: 'name_forename'
    },
    email: {
        type: Sequelize.STRING,
        field: 'email'
    },
    phone: {
        type: Sequelize.STRING,
        field: 'phone'
    },
    doctor_name: {
        type: Sequelize.STRING,
        field: 'doctor_name'
    },
    investigation: {
        type: Sequelize.STRING,
        field: 'investigation'
    },
    observations: {
        type: Sequelize.STRING,
        field: 'observations'
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

//create new resource 
app.post('/services', function(request, response) {
    Service.create(request.body).then(function(service) {
        Service.findById(service.id).then(function(service) {
            response.status(201).send(service);
        });
    });
});

//read all
app.get('/services', function(request, response) {
    Service.findAll().then(function(services) {
        response.status(200).send(services);
    });
});

//read one by id
app.get('/services/:id', function(request, response) {
    Service.findById(request.params.id).then(function(service) {
        if (service) {
            response.status(200).send(service);
        }
        else {
            response.status(404).send();
        }
    });

});

//update one by id
app.put('/services/:id', function(request, response) {
    Service
        .findById(request.params.id)
        .then(function(service) {
            if (service) {
                service
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
app.delete('/services/:id', function(request, response) {
    Service
        .findById(request.params.id)
        .then(function(service) {
            if (service) {
                service
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

//create new resource 
app.post('/appointments', function(request, response) {
    Appointment.create(request.body).then(function(appointment) {
        Appointment.findById(appointment.id).then(function(appointment) {
            response.status(201).send(appointment);
        });
    });
});

//read all
app.get('/appointmentS', function(request, response) {
    Appointment.findAll().then(function(appointments) {
        response.status(200).send(appointments);
    });
});

//read one by id
app.get('/appointmentS/:id', function(request, response) {
    Appointment.findById(request.params.id).then(function(appointment) {
        if (appointment) {
            response.status(200).send(appointment);
        }
        else {
            response.status(404).send();
        }
    });

});

//update one by id
app.put('/appointments/:id', function(request, response) {
    Appointment
        .findById(request.params.id)
        .then(function(appointment) {
            if (appointment) {
                appointment
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
app.delete('/appointments/:id', function(request, response) {
    Appointment
        .findById(request.params.id)
        .then(function(appointment) {
            if (appointment) {
                appointment
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
