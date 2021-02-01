
module.exports = {
    /**
     * translate a string
     * @param {string} entry 
     * @param {any} param1
     * @param {any} param2
     * @return {string}
     */
    convert:(entry) => {
        return getTranslation(entry)
    },
    /**
     * translate a string
     * @param {string} entry 
     * @param {any[]} params
     * @returns {string} translation
     */
    convert_string:(entry, ...params) => {
        let converted_string = getTranslation(entry)
        if(params.length==1) return converted_string.replace('%s', params[0])
        else if(params.length>1) {
            for(let param of params) {
                converted_string = converted_string.replace('%s', param)
            }
        }
        else {
            return converted_string
        }
    }
}

/**
 * @return { {} } Translations
 */
function getTranslations() {
    return require('../lang/translation.js')
}

function getTranslation(entry) {
    let json = getTranslations()
    return json[entry]
}