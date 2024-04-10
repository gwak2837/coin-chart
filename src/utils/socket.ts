// https://www.rfc-editor.org/rfc/rfc6455#section-7.4.1
export function getSocketErrorReason(errorCode: number, reason: string) {
  if (errorCode === 1000) {
    return 'Normal closure, meaning that the purpose for which the connection was established has been fulfilled.'
  } else if (errorCode === 1001) {
    return 'An endpoint is "going away", such as a server going down or a browser having navigated away from a page.'
  } else if (errorCode === 1002) {
    return 'An endpoint is terminating the connection due to a protocol error'
  } else if (errorCode === 1003) {
    return 'An endpoint is terminating the connection because it has received a type of data it cannot accept (e.g., an endpoint that understands only text data MAY send this if it receives a binary message).'
  } else if (errorCode === 1004) {
    return 'Reserved. The specific meaning might be defined in the future.'
  } else if (errorCode === 1005) {
    return 'No status code was actually present.'
  } else if (errorCode === 1006) {
    return 'The connection was closed abnormally, e.g., without sending or receiving a Close control frame'
  } else if (errorCode === 1007) {
    return 'An endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [https://www.rfc-editor.org/rfc/rfc3629] data within a text message).'
  } else if (errorCode === 1008) {
    return 'An endpoint is terminating the connection because it has received a message that "violates its policy". This reason is given either if there is no other sutible reason, or if there is a need to hide specific details about the policy.'
  } else if (errorCode === 1009) {
    return 'An endpoint is terminating the connection because it has received a message that is too big for it to process.'
  } else if (errorCode === 1010) {
    return (
      "An endpoint (client) is terminating the connection because it has expected the server to negotiate one or more extension, but the server didn't return them in the response message of the WebSocket handshake. Specifically, the extensions that are needed are: " +
      reason
    )
  } else if (errorCode === 1011) {
    return 'A server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.'
  } else if (errorCode === 1015) {
    return "The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified)."
  } else {
    return 'Unknown reason'
  }
}
