const mimeDb = require('mime-db')
const fs = require('fs')

/**
 * Guardamos archivos multimedia que nuestro cliente nos envie!
 * @param {*} media 
 */


const saveMedia = async (media, path) => {
    await fs.writeFileSync(`${path}`, media.data, { encoding: 'base64' });
    return
}

module.exports = {saveMedia}