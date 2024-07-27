const fs = require('fs')
const path = require('path')
let moduleName = process.argv[2]
if (!moduleName) {
  console.error('Por favor, proporciona un nombre de módulo.')
  process.exit(1)
}

const formatear = (string) => {
  if (typeof string !== 'string' || string.length === 0) {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

moduleName = formatear(moduleName)

const importLine = `const ${moduleName.toLowerCase()}Router = require('./${moduleName.toLowerCase()}')`
const useLine = `router.use('/${moduleName.toLowerCase()}s', ${moduleName.toLowerCase()}Router)`
const baseDir = path.join(__dirname, '../src')
const pathRoute = path.join(__dirname, '../src/routes', 'index.js')

// Contenido de archivos
// Controller: moduloController.js
const moduloController = `const ${moduleName.toLowerCase()}Model = require('../models/${moduleName.toLowerCase()}')

const ${moduleName.toLowerCase()}Controller = {
  obtener${moduleName}s: async (req, res) => {
    try {
      const ${moduleName.toLowerCase()}s = await ${moduleName.toLowerCase()}Model.obtener${moduleName}s()
      res.json(${moduleName.toLowerCase()}s)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  obtener${moduleName}: async (req, res) => {
    try {
      const { id } = req.params
      const ${moduleName.toLowerCase()} = await ${moduleName.toLowerCase()}Model.obtener${moduleName}(id)
      if (!${moduleName.toLowerCase()}) res.status(400).json({ message: '${moduleName} no encontrado' })
      res.status(200).json(${moduleName.toLowerCase()})
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  crear${moduleName}: async (req, res) => {
    try {
      const nuevo${moduleName} = req.body
      const ${moduleName.toLowerCase()} = await ${moduleName.toLowerCase()}Model.crear${moduleName}(nuevo${moduleName})
      res.status(201).json(${moduleName.toLowerCase()})
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  actualizar${moduleName}: async (req, res) => {
    try {
      const { id } = req.params
      const nuevo${moduleName} = req.body
      const ${moduleName.toLowerCase()} = await ${moduleName.toLowerCase()}Model.actualizar${moduleName}(nuevo${moduleName}, id)
      if (!${moduleName.toLowerCase()}) res.status(404).json({ message: '${moduleName} no encontrado' })
      res.json({ message: '${moduleName} actualizado', ${moduleName.toLowerCase()} })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  eliminar${moduleName}: async (req, res) => {
    try {
      const { id } = req.params
      const ${moduleName.toLowerCase()} = await ${moduleName.toLowerCase()}Model.eliminar${moduleName}(id)
      if (!${moduleName.toLowerCase()}) res.status(404).json({ message: '${moduleName} no encontrado' })
      res.json({ message: '${moduleName} eliminado' })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
}

module.exports = ${moduleName.toLowerCase()}Controller`

// Model: modulo.js
const modulo = `const pool = require('../config/database')

const ${moduleName.toLowerCase()} = {
  obtener${moduleName}s: async () => {
    return await pool.query('select * from ${moduleName.toLowerCase()}')
  },
  obtener${moduleName}: async (id) => {
    return await pool.query('select * from ${moduleName.toLowerCase()} where id = ?', [id])
  },
  crear${moduleName}: async (${moduleName.toLowerCase()}) => {
    return await pool.query('insert into ${moduleName.toLowerCase()} set ?', [${moduleName.toLowerCase()}])
  },
  actualizar${moduleName}: async (${moduleName.toLowerCase()}, id) => {
    return await pool.query('update ${moduleName.toLowerCase()} set ? where id = ?', [${moduleName.toLowerCase()}, id])
  },
  eliminar${moduleName}: async (id) => {
    return await pool.query('delete from ${moduleName.toLowerCase()} where id = ?', [id])
  },
}

module.exports = ${moduleName.toLowerCase()}`

// Route: modulo.js
const moduloRoute = `const express = require('express')
const ${moduleName.toLowerCase()}Controller = require('../controllers/${moduleName.toLowerCase()}Controller')

const router = express.Router()

router.get('/', ${moduleName.toLowerCase()}Controller.obtener${moduleName}s)
router.get('/:id', ${moduleName.toLowerCase()}Controller.obtener${moduleName})
router.post('/', ${moduleName.toLowerCase()}Controller.crear${moduleName})
router.put('/:id', ${moduleName.toLowerCase()}Controller.actualizar${moduleName})
router.delete('/:id', ${moduleName.toLowerCase()}Controller.eliminar${moduleName})

module.exports = router
`

// Crear los archivos con su contenido
fs.writeFileSync(
  path.join(baseDir, `controllers/${moduleName.toLowerCase()}Controller.js`),
  moduloController
)
fs.writeFileSync(
  path.join(baseDir, `routes/${moduleName.toLowerCase()}.js`),
  moduloRoute
)
fs.writeFileSync(
  path.join(baseDir, `models/${moduleName.toLowerCase()}.js`),
  modulo
)

// Actualizar archivo de rutas index.js
fs.readFile(pathRoute, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading index.js:', err)
    return
  }

  // Verificar si el módulo ya está importado
  if (data.includes(importLine)) {
    console.log(`${moduleName}Router is already imported.`)
    return
  }

  // Verificar si el router.use ya está definido
  if (data.includes(useLine)) {
    console.log(`Route for /${moduleName}s is already defined.`)
    return
  }

  // Insertar la línea de importación al inicio del archivo
  const updatedData = data.replace(
    'const router = express.Router()',
    `${importLine}\n\nconst router = express.Router()`
  )

  const finalData = updatedData.replace(
    'module.exports = router',
    `${useLine}\n\nmodule.exports = router`
  )

  // Escribir los cambios en el archivo index.js
  fs.writeFile(pathRoute, finalData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to index.js:', err)
      return
    }
  })
})

console.log(`Módulo ${moduleName} creado con éxito.`)
