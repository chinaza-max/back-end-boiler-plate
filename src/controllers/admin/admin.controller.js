import adminService from '../../service/admin.service.js';

        class adminController {
           async getAlluser(req, res, next) {
                try {
                  const response = await adminService.getAll();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }


          async createuser(req, res, next) {
                try {
                  const response = await adminService.getAll();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async getByIduser(req, res, next) {
                try {
                  const response = await adminService.getAll();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async updateuser(req, res, next) {
                try {
                  const response = await adminService.getAll();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async deleteuser(req, res, next) {
                try {
                  const response = await adminService.getAll();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }
     async getAllprofile(req, res, next) {
                try {
                  const response = await adminService.getAll();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }


          async createprofile(req, res, next) {
                try {
                  const response = await adminService.getAll();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async getByIdprofile(req, res, next) {
                try {
                  const response = await adminService.getAll();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async updateprofile(req, res, next) {
                try {
                  const response = await adminService.getAll();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async deleteprofile(req, res, next) {
                try {
                  const response = await adminService.getAll();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }
     async getAlltask(req, res, next) {
                try {
                  const response = await adminService.getAll();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }


          async createtask(req, res, next) {
                try {
                  const response = await adminService.getAll();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async getByIdtask(req, res, next) {
                try {
                  const response = await adminService.getAll();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async updatetask(req, res, next) {
                try {
                  const response = await adminService.getAll();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async deletetask(req, res, next) {
                try {
                  const response = await adminService.getAll();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }
    
        }
        
        export default new adminController();