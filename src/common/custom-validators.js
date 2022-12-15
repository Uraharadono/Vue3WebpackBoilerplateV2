/* Stolen from: https://stackoverflow.com/a/63727038/4267429 */
import { helpers as vuelidateHelpers } from '@vuelidate/validators'

export const oneUppercase = value => {
  if (!vuelidateHelpers.req(value)) {
    return true
  }
  const match = value.match(/[A-Z]/g) || []
  return match.length >= 1
}
export const oneLowercase = value => {
  if (!vuelidateHelpers.req(value)) {
    return true
  }
  const match = value.match(/[a-z]/g) || []
  return match.length >= 1
}
export const oneSpecial = value => {
  if (!vuelidateHelpers.req(value)) {
    return true
  }
  const match = value.match(/[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g) || []
  return match.length >= 1
}
export const oneNumber = value => {
  if (!vuelidateHelpers.req(value)) {
    return true
  }
  const match = value.match(/\d/g) || []
  return match.length >= 1
}
