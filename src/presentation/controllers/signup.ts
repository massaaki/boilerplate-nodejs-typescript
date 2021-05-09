import { HttpRequest, HttpResponse } from '../protocols/http'

import { MissingParamError } from '../errors/missing-param-error'
import { InvalidParamError } from '../errors/invalid-param-error'

import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { EmailValiddator } from '../protocols/email-validator'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValiddator

  constructor (emailValiator: EmailValiddator) {
    this.emailValidator = emailValiator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const isValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValid) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}
