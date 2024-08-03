import authService from '../../service/auth.service.js';

        class authController {
           async getAlluser(req, res, next) {
                try {
                  const response = await authService.handleGetAlluser();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }


          async createuser(req, res, next) {
                try {
                  const response = await authService.handleCreateuser();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async getByIduser(req, res, next) {
                try {
                  const response = await authService.handleGetByIduser();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async updateuser(req, res, next) {
                try {
                  const response = await authService.handleUpdateuser();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async deleteuser(req, res, next) {
                try {
                  const response = await authService.handleDeleteuser();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }
     async getAllprofile(req, res, next) {
                try {
                  const response = await authService.handleGetAllprofile();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }


          async createprofile(req, res, next) {
                try {
                  const response = await authService.handleCreateprofile();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async getByIdprofile(req, res, next) {
                try {
                  const response = await authService.handleGetByIdprofile();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async updateprofile(req, res, next) {
                try {
                  const response = await authService.handleUpdateprofile();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async deleteprofile(req, res, next) {
                try {
                  const response = await authService.handleDeleteprofile();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }
     async getAlltask(req, res, next) {
                try {
                  const response = await authService.handleGetAlltask();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }


          async createtask(req, res, next) {
                try {
                  const response = await authService.handleCreatetask();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async getByIdtask(req, res, next) {
                try {
                  const response = await authService.handleGetByIdtask();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async updatetask(req, res, next) {
                try {
                  const response = await authService.handleUpdatetask();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async deletetask(req, res, next) {
                try {
                  const response = await authService.handleDeletetask();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }
    
        }
        
        export default new authController();