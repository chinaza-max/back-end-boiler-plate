import { Router } from 'express';
import adminController from '../controllers/admin/admin.controller.js';

class adminRoutes {
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
   
    
                
                // User routes 
 
                this.router.get('/', adminController.getAlluser);
                this.router.post('/', adminController.createuser);
                this.router.get('/:id', adminController.getByIduser);
                this.router.put('/:id', adminController.updateuser);
                this.router.delete('/:id', adminController.deleteuser);
                
                
                // Profile routes 
 
                this.router.get('/', adminController.getAllprofile);
                this.router.post('/', adminController.createprofile);
                this.router.get('/:id', adminController.getByIdprofile);
                this.router.put('/:id', adminController.updateprofile);
                this.router.delete('/:id', adminController.deleteprofile);
                
                
                // Task routes 
 
                this.router.get('/', adminController.getAlltask);
                this.router.post('/', adminController.createtask);
                this.router.get('/:id', adminController.getByIdtask);
                this.router.put('/:id', adminController.updatetask);
                this.router.delete('/:id', adminController.deletetask);
                
  }
}

export default new adminRoutes().router;