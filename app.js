const fs = require('fs');
const path = require('path');



class BoilerplateEngine{


  constructor(absolutePath , defaultFolders, routeNames){
    this.absolutePath=absolutePath
    this.defaultFolder=defaultFolders
    this.routeNames=routeNames
    this.createDefaultFolder();

    this.createDefaultFolder=this.createDefaultFolder.bind(this)
    this.createFolders=this.createFolders.bind(this)
    this.validateTables=this.validateTables.bind(this)


    
  }
  
  createFolders(basePath, folders) {
    folders.forEach(folder => {
      const folderPath = path.join(basePath, folder);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        //console.log(`Created folder: ${folderPath}`);
      }
    });
  }
 getTableFormatExample() {
  return `
  const tables = [
    {
      name: 'User', // Table name
      columns: [
        { name: 'id', type: 'INTEGER', primaryKey: true, autoIncrement: true }, // Column definition with type and options
        { name: 'firstName', type: 'STRING', allowNull: false }, // Column definition
        { name: 'lastName', type: 'STRING', allowNull: true }, // Column definition
      ],
      relationships: [
        { target: 'Profile', type: 'one-to-one', foreignKey: 'profileId', as: 'profile' } // Relationship definition
      ]
    },
    {
      name: 'Profile', // Table name
      columns: [
        { name: 'id', type: 'INTEGER', primaryKey: true, autoIncrement: true }, // Column definition with type and options
        { name: 'bio', type: 'STRING', allowNull: true } // Column definition
      ]
    }
  ];
  
  Accepted relationship types:
  - one-to-one
  - one-to-many
  - many-to-one
  - many-to-many
  
  Each table object should have the following structure:
  {
    name: 'TableName', // Name of the table
    columns: [
      { name: 'columnName', type: 'DataType', [primaryKey: true|false], [autoIncrement: true|false], [allowNull: true|false] }, // Define each column with its properties
      // Add more columns as needed
    ],
    relationships: [
      { target: 'TargetTableName', type: 'RelationshipType', foreignKey: 'ForeignKeyName', as: 'AliasName' }, // Define relationships if any
      // Add more relationships as needed
    ]
  }
    `;
  }
  getAcceptedRelationships() {
    return [
      { type: 'one-to-one', description: 'One-to-One relationship' },
      { type: 'one-to-many', description: 'One-to-Many relationship' },
      { type: 'many-to-one', description: 'Many-to-One relationship' },
      { type: 'many-to-many', description: 'Many-to-Many relationship' }
    ];
  }

  createDefaultFolder(){

    if(this.defaultFolder.includes("db")){
      this.createFolders(this.absolutePath+"/src", this.defaultFolder)

    }
  }

  validateTables(tables) {

    const tableNames = tables.map(table => table.name);
    for (const table of tables) {
      if (table.relationships) {
        for (const rel of table.relationships) {
          if (!tableNames.includes(rel.target)) {
            console.error(`Error: Relationship target table '${rel.target}' for table '${table.name}' does not exist in the table to be created or they are of different case.`);
            return false;
          }
        }
      }
    }
    return true;

  }
  createTables(tables) {

    if (!this.validateTables(tables)) {
      return;
    }


    const modelFolderPath = path.join(this.absolutePath, 'src/db/models');
    if (!fs.existsSync(modelFolderPath)) {
      fs.mkdirSync(modelFolderPath, { recursive: true });
      console.log(`Created folder: ${modelFolderPath}`);
    }

    tables.forEach(table => {
      const tableFilePath = path.join(modelFolderPath, `${table.name}.js`);
      const columns = table.columns || [
        { name: 'id', type: 'INTEGER', primaryKey: true, autoIncrement: true },
        { name: 'createdAt', type: 'DATE' },
        { name: 'updatedAt', type: 'DATE' },
        { name: 'deletedAt', type: 'DATE' },
        { name: 'name', type: 'STRING' },
      ];


      if (table.relationships) {
        table.relationships.forEach(rel => {
          if (!columns.find(col => col.name === rel.foreignKey)) {
            columns.push({ name: rel.foreignKey || `${rel.target}Id`, type: rel.dataType || 'STRING' });
          }
        });
      }

      const columnDefinitions = columns.map(col => {
        const options = [];
        if (col.primaryKey) options.push('primaryKey: true');
        if (col.autoIncrement) options.push('autoIncrement: true');
        if (col.allowNull === false) options.push('allowNull: false');
        if (col.defaultValue !== undefined) options.push(`defaultValue: ${JSON.stringify(col.defaultValue)}`);
        col.allowNull === true? options.push('allowNull: true'): options.push('allowNull: false');
        return `${col.name}: { type: DataTypes.${col.type}, ${options.join(', ')} }`;

      }).join(',\n');

      const content = `
import { Model, DataTypes } from "sequelize";
import serverConfig from "../../config/server.js";

class ${table.name} extends Model {}

export function init(connection) {
  ${table.name}.init({
    ${columnDefinitions}
  }, {
    tableName: '${table.name}',
    sequelize: connection,
    timestamps: true,
    underscored: false
  });
}

export default ${table.name};
      `;

      fs.writeFileSync(tableFilePath, content.trim());
      console.log(`Created table model: ${tableFilePath}`);
    });

    this.createIndexFile(tables);
  }

  createIndexFile(tables) {
    const modelFolderPath = path.join(this.absolutePath, 'src/db/models');
    const indexPath = path.join(modelFolderPath, 'index.js');

    const imports = tables.map(table => {
      return `import ${table.name}, { init as init${table.name} } from "./${table.name.toLowerCase()}.js";`;
    }).join('\n');

    const inits = tables.map(table => {
      return `init${table.name}(connection);`;
    }).join('\n');

    const associations = tables.flatMap(table => {
      if (!table.relationships) return [];
      return table.relationships.map(rel => {
        const type = rel.type === 'many-to-many' ? 'belongsToMany' :
                     rel.type === 'one-to-many' ? 'hasMany' : 
                     rel.type === 'one-to-one' ? 'hasOne' : 'belongsTo';
        const reverseType = rel.type === 'many-to-many' ? 'belongsToMany' :
                            rel.type === 'one-to-many' ? 'belongsTo' : 
                            rel.type === 'one-to-one' ? 'belongsTo' : 'hasMany';
        const reverseKey = rel.foreignKey || `${rel.target}Id`;

        return `
${table.name}.${type}(${rel.target}, {
  foreignKey: '${reverseKey}',
  as: '${rel.as || rel.target}s'
});

${rel.target}.${reverseType}(${table.name}, {
  foreignKey: '${reverseKey}'
});
        `;
      });
    }).join('\n');

    const content = `
import { Sequelize } from "sequelize";
${imports}

function associate() {
  ${associations}
}

async function authenticateConnection(connection) {
  try {
    await connection.authenticate();
    console.log('Connection to database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export {
  ${tables.map(table => table.name).join(',\n  ')}
}

export function init(connection) {
  ${inits}
  associate();
  authenticateConnection(connection);
}
    `;

    fs.writeFileSync(indexPath, content.trim());
    console.log(`Created index file with relationships: ${indexPath}`);
  }

  createRoutes(table) {

    const routesFolderPath = path.join(this.absolutePath, 'src/routes');
    if (!fs.existsSync(routesFolderPath)) {
      fs.mkdirSync(routesFolderPath, { recursive: true });
      console.log(`Created folder: ${routesFolderPath}`);
    }

    const indexPath = path.join(routesFolderPath, 'index.js');
    const indexContent = `
import express from 'express';
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({
    status: 200,
    message: "Welcome to the API",
    data: {
      service: "API Service",
      version: "1.0.0",
    },
  });
});

${this.routeNames.map(route => `import ${route}Routes from './${route}.routes.js';\nrouter.use('/${route}', ${route}Routes);`).join('')}

export default router;
    `;
    fs.writeFileSync(indexPath, indexContent.trim());
    console.log(`Created routes index file: ${indexPath}`);

    this.routeNames.forEach(route => {
      const routeFilePath = path.join(routesFolderPath, `${route}.routes.js`);


      let  routeAction="";

      for (let index = 0; index < table.length; index++) {
        const element = table[index].name;
        routeAction+=`
                
                // ${element} routes 
 
                this.router.get('/', ${route}Controller.getAll${element.toLowerCase()});
                this.router.post('/', ${route}Controller.create${element.toLowerCase()});
                this.router.get('/:id', ${route}Controller.getById${element.toLowerCase()});
                this.router.put('/:id', ${route}Controller.update${element.toLowerCase()});
                this.router.delete('/:id', ${route}Controller.delete${element.toLowerCase()});
                `
      }


      const routeContent = `
import { Router } from 'express';
import ${route}Controller from '../controllers/${route}/${route}.controller.js';

class ${route}Routes {
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
   
    ${routeAction}
  }
}

export default new ${route}Routes().router;
      `;
      fs.writeFileSync(routeFilePath, routeContent.trim());
      console.log(`Created route file: ${routeFilePath}`);
    });
  }

  createControllers(tables) {
    this.createRoutes(tables);


    this.routeNames.forEach(routeName => {
      const controllerFolderPath = path.join(this.absolutePath, `src/controllers/${routeName.toLowerCase()}`);
      if (!fs.existsSync(controllerFolderPath)) {
        fs.mkdirSync(controllerFolderPath, { recursive: true });
      }

      let controllers=''
      for (let index = 0; index < tables.length; index++) {
        const element = tables[index].name;

        controllers+=` async getAll${element.toLowerCase()}(req, res, next) {
                try {
                  const response = await ${routeName}Service.handleGetAll${element.toLowerCase()}();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }


          async create${element.toLowerCase()}(req, res, next) {
                try {
                  const response = await ${routeName}Service.handleCreate${element.toLowerCase()}();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async getById${element.toLowerCase()}(req, res, next) {
                try {
                  const response = await ${routeName}Service.handleGetById${element.toLowerCase()}();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async update${element.toLowerCase()}(req, res, next) {
                try {
                  const response = await ${routeName}Service.handleUpdate${element.toLowerCase()}();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }

          async delete${element.toLowerCase()}(req, res, next) {
                try {
                  const response = await ${routeName}Service.handleDelete${element.toLowerCase()}();
                  return res.status(200).json({ status: 200, data: response });
                } catch (error) {
                  return next(error);
                }
          }
    `
      }

      const controllerFilePath = path.join(controllerFolderPath, `${routeName.toLowerCase()}.controller.js`);

      const controllerContent = `

        import ${routeName}Service from '../../service/${routeName.toLowerCase()}.service.js';

        class ${routeName}Controller {
          ${controllers}
        }
        
        export default new ${routeName}Controller();

      `
      fs.writeFileSync(controllerFilePath, controllerContent.trim());
      console.log(`Created controller file: ${controllerFilePath}`);
  
    });




  }

  createServices(tables) {
    const serviceFolderPath = path.join(this.absolutePath, 'src/services');
    if (!fs.existsSync(serviceFolderPath)) {
      fs.mkdirSync(serviceFolderPath, { recursive: true });
      console.log(`Created folder: ${serviceFolderPath}`);
    }

    this.routeNames.forEach(routeName => {
      const serviceFolderPath = path.join(this.absolutePath, `src/services/${routeName.toLowerCase()}`);
      if (!fs.existsSync(serviceFolderPath)) {
        fs.mkdirSync(serviceFolderPath, { recursive: true });
      }

      let services=''
      const serviceFilePath = path.join(serviceFolderPath, `${routeName.toLowerCase()}.service.js`);

      for (let index = 0; index < tables.length; index++) {
        const element = tables[index].name;

        services+=` async handleGetAll${element.toLowerCase()}() {
                try {
                  return await ${element}Model.findAll();
                } catch (error) {
                new ServerError(error.name,error.parent );
                }
          }
          async handleCreate${element.toLowerCase()}(data) {
                try {
                      return await ${element}Model.create(data);
                } catch (error) {
                  new ServerError(error.name,error.parent );
                }
          }

          async handleGetById${element.toLowerCase()}(data) {
                try {
                    return await ${element}Model.findByPk(id);
                } catch (error) {
                  new ServerError(error.name,error.parent );
                }
          }

          async handleUpdate${element.toLowerCase()}(data) {
                try {
                      const record = await ${element}Model.findByPk(id);
                } catch (error) {
                  new ServerError(error.name,error.parent );
                }
          }

          async handleDelete${element.toLowerCase()}(data) {
                try {
                  const record = await ${element}Model.findByPk(id);
                } catch (error) {
                  new ServerError(error.name,error.parent );
                }
          }
    `
      }

      let database=''
      let databaseModel=''

      for (let index = 0; index < tables.length; index++) {
        const element = tables[index].name;
        database+=`${element},`
        databaseModel+=`${element}Model = ${element};`
      }

      const serviceContent = `
          import { ${database} } from '../../db/models';

        class ${routeName}Service {
          ${databaseModel}

          ${services}
        }

       
      export default new ${routeName}Service();

      `

      fs.writeFileSync(serviceFilePath, serviceContent.trim());
      console.log(`Created service file: ${serviceFilePath}`);
  
    })

    /*
    tables.forEach(table => {
      const serviceFilePath = path.join(serviceFolderPath, `${table.name.toLowerCase()}.service.js`);
      const serviceContent = `
import { ${table.name} } from '../db/models';

class ${table.name}Service {
  async getAll() {
    return await ${table.name}.findAll();
  }

  async create(data) {
    return await ${table.name}.create(data);
  }

  async getById(id) {
    return await ${table.name}.findByPk(id);
  }

  async update(id, data) {
    const record = await ${table.name}.findByPk(id);
    if (record) {
      return await record.update(data);
    }
    return null;
  }

  async delete(id) {
    const record = await ${table.name}.findByPk(id);
    if (record) {
      return await record.destroy();
    }
    return null;
  }
}

export default new ${table.name}Service();
      `;
      fs.writeFileSync(serviceFilePath, serviceContent.trim());
      console.log(`Created service file: ${serviceFilePath}`);
    });
*/


  }

  createUtils(tables) {
    const utilsFolderPath = path.join(this.absolutePath, 'src/utils');
    if (!fs.existsSync(utilsFolderPath)) {
      fs.mkdirSync(utilsFolderPath, { recursive: true });
      console.log(`Created folder: ${utilsFolderPath}`);
    }

    tables.forEach(table => {
      const utilFilePath = path.join(utilsFolderPath, `${table.name.toLowerCase()}.util.js`);
      const validationFields = table.columns.map(col => {
        let type;
        switch (col.type) {
          case 'STRING':
            type = 'Joi.string()';
            break;
          case 'INTEGER':
            type = 'Joi.number().integer()';
            break;
          case 'DATE':
            type = 'Joi.date()';
            break;
          default:
            type = 'Joi.any()';
        }
        if (!col.allowNull) type += '.required()';
        return `${col.name}: ${type}`;
      }).join(',\n    ');

      const utilContent = `
import Joi from 'joi';

class ${table.name}Util {
  validateCreate = Joi.object({
    ${validationFields}
  });

  validateUpdate = Joi.object({
    ${validationFields}
  });
}

export default new ${table.name}Util();
      `;
      fs.writeFileSync(utilFilePath, utilContent.trim());
      console.log(`Created util file: ${utilFilePath}`);
    });
  }
  
/*
  async run() {
    const tables = [
      { name: 'Users', columns: [ { name: 'email', type: 'STRING', allowNull: false } ], relationships: [] },
      { name: 'Posts', columns: [ { name: 'title', type: 'STRING', allowNull: false }, { name: 'content', type: 'TEXT', allowNull: false } ], relationships: [] },
      { name: 'Comments', columns: [ { name: 'content', type: 'TEXT', allowNull: false }, { name: 'postId', type: 'INTEGER', allowNull: false } ], relationships: [ { type: 'belongs-to', target: 'Posts', foreignKey: 'postId', dataType: 'INTEGER' } ] }
    ];

    //await this.createTables(tables);
    this.createRoutes();
    this.createControllers(tables);
  }*/


}


const tables = [
  {
    name: 'User',
    columns: [
      { name: 'id', type: 'INTEGER', primaryKey: true, autoIncrement: true },
      { name: 'firstName', type: 'STRING', allowNull: false },
      { name: 'lastName', type: 'STRING', allowNull: true },
    ],
    relationships: [
      { target: 'Profile', type: 'one-to-one', foreignKey: 'profileId', as: 'profile' }
    ]
  },
  {
    name: 'Profile',
    columns: [
      { name: 'id', type: 'INTEGER', primaryKey: true, autoIncrement: true },
      { name: 'bio', type: 'STRING', allowNull: true }
    ]
  }
  ,
  {
    name: 'Task',
    columns: [
      { name: 'id', type: 'INTEGER', primaryKey: true, autoIncrement: true },
      { name: 'bio', type: 'STRING', allowNull: true }
    ]
  }
];

const requiredFolders = ['routes', 'controllers', 'services', 'middleware', 'db', 'utils'];
const routeNames= ["users", "auth", "admin"];

const boilerplate = new BoilerplateEngine(path.join(__dirname) , requiredFolders, routeNames)


boilerplate.createTables(tables);

boilerplate.createControllers(tables);

boilerplate.createServices(tables);
boilerplate.createUtils(tables);



