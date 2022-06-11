class MatchService {
  constructor(matchModel) {
    this.matchModel = matchModel;
  }

  CreateMatch = async (myId, yourId) =>
    await this.matchModel.create({
      couple: [myId, yourId],
    });
}

module.exports = MatchService;
