enum SocketEvents {
  CONNECT = "connect",
  DISCONNECT = "disconnect",

  SOCKET_CONNECTED = "socketConnected",

  SEND_MESSAGE = "sendMessage",
  NEW_MESSAGE = "newMessage",

  SEND_FRIEND_REQUEST = "sendFriendRequest",
  NEW_FRIEND_REQUEST = "newFriendRequest",

  ACCEPT_FRIEND_REQUEST = "acceptFriendRequest",
  FRIEND_REQUEST_ACCEPTED = "friendRequestAccepted",

  UNSEND_FRIEND_REQUEST = "unsendFriendRequest",
  FRIEND_REQUEST_UNSENT = "friendRequestUnsent",

  REMOVE_FRIEND = "friendRemoved",
  FRIEND_REMOVED = "friendRemoved",
}

export default SocketEvents;
