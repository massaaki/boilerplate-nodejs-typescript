/*
 * Implements all interfaces of presentation layer
 * Name: HTTP
 */

export interface HttpResponse {
  statusCode: number
  body: any
}

export interface HttpRequest {
  body?: any
}
