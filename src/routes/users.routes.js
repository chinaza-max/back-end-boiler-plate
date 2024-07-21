import { Router } from 'express';
import usersController from '../controllers/users/users.controller.js';

class usersRoutes {
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
   
    
                
                // User routes 
 
                this.router.get('/', usersController.getAlluser);
                this.router.post('/', usersController.createuser);
                this.router.get('/:id', usersController.getByIduser);
                this.router.put('/:id', usersController.updateuser);
                this.router.delete('/:id', usersController.deleteuser);
                
                
                // Profile routes 
 
                this.router.get('/', usersController.getAllprofile);
                this.router.post('/', usersController.createprofile);
                this.router.get('/:id', usersController.getByIdprofile);
                this.router.put('/:id', usersController.updateprofile);
                this.router.delete('/:id', usersController.deleteprofile);
                
                
                // Task routes 
 
                this.router.get('/', usersController.getAlltask);
                this.router.post('/', usersController.createtask);
                this.router.get('/:id', usersController.getByIdtask);
                this.router.put('/:id', usersController.updatetask);
                this.router.delete('/:id', usersController.deletetask);
                
  }
}

export default new usersRoutes().router;