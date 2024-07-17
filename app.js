const fs = require('fs');
const path = require('path');



class BoilerplateEngine{


  constructor(absolutePath , defaultFolders){
    this.absolutePath=absolutePath
    this.defaultFolder=defaultFolders
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

const requiredFolders = ['routes', 'controllers', 'service', 'middleware', 'db', 'utils'];
const boilerplate = new BoilerplateEngine(path.join(__dirname) , requiredFolders)

boilerplate.createTables(tables);

