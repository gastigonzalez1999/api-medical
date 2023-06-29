import SymptomsResource from './symptoms.resource';

export default class SymptomsController {
  private symptomsResource: SymptomsResource;
  constructor() {
    this.symptomsResource = new SymptomsResource();
  }

  public getSymptoms = async () => {
    return this.symptomsResource.getSymptoms();
  };
}
