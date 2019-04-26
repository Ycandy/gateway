export default class Validator {
  validate (validations) {
    for (let validation of validations) {
      let func = Reflect.get(this, validation.type)
      if (func && typeof funcion === 'function') {
        throw new Error(`${validation.type} is not a valid function`)
      }
      if (func(...validation.value)) {
        return validation.message
      }
    }
    return null
  }
  required (value) {
    return !value
  }
  equal (str1, str2) {
    return str1 === str2
  }
  greaterThan (str1, str2) {
    return str1 > str2
  }
  email (email) {
    return !email || /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]*\.)+[A-Za-z]{2,14}$/.test(email)
  }
  phone (phone) {
    return !phone || /^1(3|4|5|7|8)\d{9}$/.test(phone)
  }
}
