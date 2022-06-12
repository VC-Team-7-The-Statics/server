exports.filterOutUserFromAttendants = (chatroom, userId) => {
  return chatroom.map(({ attendants, _id }) => {
    const friend = attendants.filter(
      (user) => user._id.toString() !== userId.toString()
    )[0];

    return {
      name: friend.name,
      id: friend._id,
      image: friend.image,
      roomId: _id,
    };
  });
};

exports.duplicateChatroomChecker = (chatrooms, attendant) => {
  for (const room of chatrooms) {
    if (room.attendants.includes(attendant)) {
      return true;
    }
  }

  return false;
};
