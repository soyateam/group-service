import { KartoffelService } from '../kartoffel/kartoffel.service';
import { IOrganization } from '../kartoffel/organization.interface';
export class HierarchyManager {
  static getOrganizationById = async (id: string) => {
    // TODO: get token from spike service
    const response = await KartoffelService.GetOrgByID(id);
    console.log(response);
    const orgs: IOrganization = response.data;

    return orgs;
  };
}
