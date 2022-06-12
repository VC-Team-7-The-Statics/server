function duplicateChatroomChecker(chatrooms, attendant) {
  for (const room of chatrooms) {
    if (room.attendants.includes(attendant)) {
      return true;
    }
  }

  return false;
}

module.exports = duplicateChatroomChecker;
