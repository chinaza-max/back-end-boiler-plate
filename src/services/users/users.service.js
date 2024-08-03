import { User,Profile,Task, } from '../../db/models';

        class usersService {
          UserModel = User;ProfileModel = Profile;TaskModel = Task;

           async handleGetAlluser() {
                try {
                  return await UserModel.findAll();
                } catch (error) {
                new ServerError(error.name,error.parent );
                }
          }
          async handleCreateuser(data) {
                try {
                      return await UserModel.create(data);
                } catch (error) {
                  new ServerError(error.name,error.parent );
                }
          }

          async handleGetByIduser(data) {
                try {
                    return await UserModel.findByPk(id);
                } catch (error) {
                  new ServerError(error.name,error.parent );
                }
          }

          async handleUpdateuser(data) {
                try {
                      const record = await UserModel.findByPk(id);
                } catch (error) {
                  new ServerError(error.name,error.parent );
                }
          }

          async handleDeleteuser(data) {
                try {
                  const record = await UserModel.findByPk(id);
                } catch (error) {
                  new ServerError(error.name,error.parent );
                }
          }
     async handleGetAllprofile() {
                try {
                  return await ProfileModel.findAll();
                } catch (error) {
                new ServerError(error.name,error.parent );
                }
          }
          async handleCreateprofile(data) {
                try {
                      return await ProfileModel.create(data);
                } catch (error) {
                  new ServerError(error.name,error.parent );
                }
          }

          async handleGetByIdprofile(data) {
                try {
                    return await ProfileModel.findByPk(id);
                } catch (error) {
                  new ServerError(error.name,error.parent );
                }
          }

          async handleUpdateprofile(data) {
                try {
                      const record = await ProfileModel.findByPk(id);
                } catch (error) {
                  new ServerError(error.name,error.parent );
                }
          }

          async handleDeleteprofile(data) {
                try {
                  const record = await ProfileModel.findByPk(id);
                } catch (error) {
                  new ServerError(error.name,error.parent );
                }
          }
     async handleGetAlltask() {
                try {
                  return await TaskModel.findAll();
                } catch (error) {
                new ServerError(error.name,error.parent );
                }
          }
          async handleCreatetask(data) {
                try {
                      return await TaskModel.create(data);
                } catch (error) {
                  new ServerError(error.name,error.parent );
                }
          }

          async handleGetByIdtask(data) {
                try {
                    return await TaskModel.findByPk(id);
                } catch (error) {
                  new ServerError(error.name,error.parent );
                }
          }

          async handleUpdatetask(data) {
                try {
                      const record = await TaskModel.findByPk(id);
                } catch (error) {
                  new ServerError(error.name,error.parent );
                }
          }

          async handleDeletetask(data) {
                try {
                  const record = await TaskModel.findByPk(id);
                } catch (error) {
                  new ServerError(error.name,error.parent );
                }
          }
    
        }

       
      export default new usersService();