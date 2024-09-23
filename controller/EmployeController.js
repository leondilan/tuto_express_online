const EmployeModel = require('../model/Employe')
const fs=require('fs');

async function showEmployes(req, res) {
    
    await EmployeModel.find({}).sort({_id: -1})
        .then(employes => {
            res.render('pages/showEmployes', {employes: employes})
        })
        .catch(err => {
            console.log(err)
        })
}

function storeEmployes(req, res) {

    let sampleFile = req.files.image;
    let fileName = Date.now() + '-' + sampleFile.name;
    let uploadPath = './public/images/employes/'+fileName;

    sampleFile.mv(uploadPath, function(err) {
        if (err){
            return res.status(500).send(err);
        }else{
            let newEmploye = new EmployeModel({
                name: req.body.nom,
                email: req.body.email,
                tel: req.body.tel,
                adress: req.body.adress,
                nomimage: fileName
            })
            newEmploye.save()
            req.flash('success', "Employe créé avec succès")
            return res.redirect('/employes')
        }
    });
}

function deleteEmployes(req, res) {

    EmployeModel.findById(req.params.id)
    .then(employe => {
        
        fs.unlink('./public/images/employes/'+employe.nomimage, (err) => {
            if (err) throw err;
            console.log('File successfully deleted');
        });

        EmployeModel.findByIdAndDelete(req.params.id)
        .then(employe => {
            res.redirect('/employes')
        })
        .catch(err => {
            console.log(err)
        })

    })
    .catch(err => {
        console.log(err)
    })
}

function getEmployes(req, res) {
    EmployeModel.findById(req.params.id)
    .then(employe => {
        res.render('pages/showEmployesSingle', {employe: employe})
    })
    .catch(err => {
        console.log(err)
    })
}

function updateEmployes(req, res) {
    EmployeModel.findByIdAndUpdate(req.params.id, req.body)
    .then(employe => {
        res.redirect('/employes')
    })
    .catch(err => {
        console.log(err)
    })
}


module.exports = {
    showEmployes,
    storeEmployes,
    deleteEmployes,
    getEmployes,
    updateEmployes
}