const express = require('express')
const router = express.Router()
const HomeController = require('../controller/HomeController')
const EmployeController = require('../controller/EmployeController')

router.get('/', HomeController.home)
  
router.get('/contact', HomeController.contact)
router.post('/contact', HomeController.sendContact)
  
router.get('/about', HomeController.about)

router.post('/employes', EmployeController.storeEmployes)
router.get('/employes', EmployeController.showEmployes)
router.delete('/employes/:id', EmployeController.deleteEmployes)
router.get('/employes/:id', EmployeController.getEmployes)
router.put('/employes/:id', EmployeController.updateEmployes)
  
router.get('/produit/:id', HomeController.getproduct)

module.exports = router