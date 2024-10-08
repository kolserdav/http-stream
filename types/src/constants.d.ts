export namespace METHOD {
    export let get: string;
    export let post: string;
    let _delete: string;
    export { _delete as delete };
    export let put: string;
    export let options: string;
}
export namespace HEADER {
    let contentType: string;
    let accept: string;
    let authorization: string;
    let userAgent: string;
    let cacheControl: string;
    let acceptEncoding: string;
    let acceptLanguage: string;
    let host: string;
    let connection: string;
    let contentLength: string;
    let cookie: string;
    let origin: string;
    let referer: string;
    let transferEncoding: string;
    let accessControlAllowOrigin: string;
    let accessControlAllowMethods: string;
    let accessControlAllowHeaders: string;
}
export namespace MIME_TYPE {
    let textPlain: string;
    let textHTML: string;
    let applicationJSON: string;
    let applicationXML: string;
    let applicationFormUrlEncoded: string;
    let multipartFormData: string;
    let imageJPEG: string;
    let imagePNG: string;
    let imageGIF: string;
    let audioMPEG: string;
    let audioWAV: string;
    let videoMP4: string;
    let videoAVI: string;
    let applicationOctetStream: string;
    let applicationPDF: string;
    let applicationZip: string;
    let textMarkdown: string;
}
export namespace STATUS {
    let _continue: number;
    export { _continue as continue };
    export let switchingProtocols: number;
    export let ok: number;
    export let created: number;
    export let accepted: number;
    export let nonAuthoritativeInformation: number;
    export let noContent: number;
    export let resetContent: number;
    export let partialContent: number;
    export let multipleChoices: number;
    export let movedPermanently: number;
    export let found: number;
    export let seeOther: number;
    export let notModified: number;
    export let useProxy: number;
    export let temporaryRedirect: number;
    export let permanentRedirect: number;
    export let badRequest: number;
    export let unauthorized: number;
    export let paymentRequired: number;
    export let forbidden: number;
    export let notFound: number;
    export let methodNotAllowed: number;
    export let notAcceptable: number;
    export let proxyAuthenticationRequired: number;
    export let requestTimeout: number;
    export let conflict: number;
    export let gone: number;
    export let lengthRequired: number;
    export let preconditionFailed: number;
    export let payloadTooLarge: number;
    export let uriTooLong: number;
    export let unsupportedMediaType: number;
    export let rangeNotSatisfiable: number;
    export let expectationFailed: number;
    export let imATeapot: number;
    export let misdirectedRequest: number;
    export let unprocessableEntity: number;
    export let locked: number;
    export let failedDependency: number;
    export let upgradeRequired: number;
    export let preconditionRequired: number;
    export let tooManyRequests: number;
    export let requestHeaderFieldsTooLarge: number;
    export let unavailableForLegalReasons: number;
    export let internalServerError: number;
    export let notImplemented: number;
    export let badGateway: number;
    export let serviceUnavailable: number;
    export let gatewayTimeout: number;
    export let httpVersionNotSupported: number;
    export let variantAlsoNegotiates: number;
    export let insufficientStorage: number;
    export let loopDetected: number;
    export let notExtended: number;
    export let networkAuthenticationRequired: number;
}
export const URL_DEFAULT: "/";
