import usersService from '../../service/users.service.js';

        class usersController {
           async getAlluser(req, res, next) {
                try {
                  const response = await usersService.handleGetAlluser();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }


          async createuser(req, res, next) {
                try {
                  const response = await usersService.handleCreateuser();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async getByIduser(req, res, next) {
                try {
                  const response = await usersService.handleGetByIduser();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async updateuser(req, res, next) {
                try {
                  const response = await usersService.handleUpdateuser();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async deleteuser(req, res, next) {
                try {
                  const response = await usersService.handleDeleteuser();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }
     async getAllprofile(req, res, next) {
                try {
                  const response = await usersService.handleGetAllprofile();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }


          async createprofile(req, res, next) {
                try {
                  const response = await usersService.handleCreateprofile();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async getByIdprofile(req, res, next) {
                try {
                  const response = await usersService.handleGetByIdprofile();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async updateprofile(req, res, next) {
                try {
                  const response = await usersService.handleUpdateprofile();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async deleteprofile(req, res, next) {
                try {
                  const response = await usersService.handleDeleteprofile();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }
     async getAlltask(req, res, next) {
                try {
                  const response = await usersService.handleGetAlltask();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }


          async createtask(req, res, next) {
                try {
                  const response = await usersService.handleCreatetask();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async getByIdtask(req, res, next) {
                try {
                  const response = await usersService.handleGetByIdtask();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async updatetask(req, res, next) {
                try {
                  const response = await usersService.handleUpdatetask();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async deletetask(req, res, next) {
                try {
                  const response = await usersService.handleDeletetask();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }
    
        }
        
        export default new usersController();