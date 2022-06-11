class CoffeeFormService {
  constructor(coffeeFormModel) {
    this.coffeeFormModel = coffeeFormModel;
  }

  RegisterCoffeeForm = async (query) =>
    await this.coffeeFormModel.create(query);
}

module.exports = CoffeeFormService;
