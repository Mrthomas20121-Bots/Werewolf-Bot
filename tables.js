const fs = require('fs')

/**
 * 
 * @param {String} tablename 
 * @param {Object[]} values 
 */
function createTable(tablename, values) {
 return {
   'table-name': tablename,
   'values': values
 }
}

var roles_rows = [
  {
    name: 'werewolf',
    description: 'Every night they pick one person to kill.\nIf they cannot decide in time they will not kill anyone.'
  },
  {
    name: 'hunter',
    description: 'he can kill someone upon dying'
  },
  {
    name: 'witch',
    description: 'she may kill or heal someone once, she knows who was killed by the werewolf'
  },
  {
    name: 'oracle',
    description: 'each night he can see someone role'
  },
]

console.log(createTable('roles', roles_rows))