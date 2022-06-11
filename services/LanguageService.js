class LanguageService {
  constructor(languageModel) {
    this.languageModel = languageModel;
  }

  GetLanguages = async () => await this.languageModel.find().lean();
}

module.exports = LanguageService;
