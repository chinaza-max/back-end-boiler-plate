import { Router } from 'express';
import authController from '../controllers/auth/auth.controller.js';

class authRoutes {
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
   
    
                
                // User routes 
 
                this.router.get('/', authController.getAlluser);
                this.router.post('/', authController.createuser);
                this.router.get('/:id', authController.getByIduser);
                this.router.put('/:id', authController.updateuser);
                this.router.delete('/:id', authController.deleteuser);
                
                
                // Profile routes 
 
                this.router.get('/', authController.getAllprofile);
                this.router.post('/', authController.createprofile);
                this.router.get('/:id', authController.getByIdprofile);
                this.router.put('/:id', authController.updateprofile);
                this.router.delete('/:id', authController.deleteprofile);
                
                
                // Task routes 
 
                this.router.get('/', authController.getAlltask);
                this.router.post('/', authController.createtask);
                this.router.get('/:id', authController.getByIdtask);
                this.router.put('/:id', authController.updatetask);
                this.router.delete('/:id', authController.deletetask);
                
  }
}

export default new authRoutes().router;